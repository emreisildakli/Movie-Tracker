import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"
import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup= ()=>{
    const [isPending, setIsPending] = useState(false)
    const [error, setError]= useState(null)
    const [isCancelled, setIsCancelled]= useState(false)
    const {dispatch} = useAuthContext()


    const signup = async (email, password, displayName, thumbnail) =>{
        setError(null)
        setIsPending(true)

        try {

            const res=  await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res){
                throw new Error('Could not complete sign up')
            }
            // upload thumbnail to storage
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const image = await projectStorage.ref(uploadPath).put(thumbnail)
            const imageURL= await image.ref.getDownloadURL()

            await res.user.updateProfile({displayName, photoURL:imageURL})

            await projectFirestore.collection('users').doc(res.user.uid).set({
                online : true,
                displayName,
                photoURL: imageURL
            })


            // dispatch action here
            dispatch({type:'LOGIN', payload: res.user})
            

            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }
        }
        catch(err){
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(()=>{
        return ()=> setIsCancelled(true)
    }, [])

    return { signup, isPending, error}
}