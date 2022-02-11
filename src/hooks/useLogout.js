import { useState, useEffect } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
export const useLogout =  ()=>{
    const [isPending, setIsPending] = useState(false)
    const [error, setError]= useState(null)
    const [isCancelled, setIsCancelled]= useState(false)
    const { dispatch, user} = useAuthContext()

    const logout= async ()=>{
        setIsPending(true)
        setError(null)

        try{
            await projectFirestore.collection('users').doc(user.uid).update({online:false})

            await projectAuth.signOut()

            dispatch({type:'LOGOUT'})
            
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

        }
        catch(err){
            if(!isCancelled){
                setIsPending(false)
                setError(err.message)
            }
        }
    }
    
    useEffect(()=>{
        return ()=> setIsCancelled(true)
    }, [])

    return { logout, isPending, error}
}