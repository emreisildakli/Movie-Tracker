import { useEffect, useReducer, useState } from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error:null,
    success:null
}

const firestoreReducer = (state, action) =>{
    switch(action.type){
        case 'IS_PENDING':
            return {document:null, isPending:true, error:null, success:null}
        case 'ADDED_DOCUMENT':
            return {document: action.payload, isPending:false, error:null, success:true}
        case 'DELETED_DOCUMENT':
            return {document:null, isPending:false, error:null, success:true}
        case 'ERROR':
            return {document:null, isPending:false, error:action.payload, success:false}
        default:
            return state
    }
}

export const useFirestore = (collection)=>{
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const [isCancelled, setIsCancelled]= useState(false)
    const dispatchIfNotCancelled = (action)=>{
        if(!isCancelled){
            dispatch(action)
        }
    }


    const ref = projectFirestore.collection(collection)

    const addDocument= async (document)=>{
        dispatch({type:'IS_PENDING'})

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...document, createdAt})

            dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})

        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }

    }

    const deleteDocument= async (id)=>{

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})

        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }
    }

    const updateDocument = async (id, updates)=>{
        dispatch({type:'IS_PENDING'})

        try {
            const updatedDocument= await ref.doc(id).update(updates)
            dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})

        } catch(err){
            dispatchIfNotCancelled({type:'ERROR', payload: err.message})
        }

    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    }, [])


    return {addDocument, deleteDocument, updateDocument, response}
}