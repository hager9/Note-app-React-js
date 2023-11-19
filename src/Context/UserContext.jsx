import axios from "axios";
import { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    
    async function signUp(values) {
        const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values);
        return data
    }

    async function signIn(values) {
        const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values);
        return data
    }

    async function logOut() {
        localStorage.removeItem("token");
        setToken(null);
    }
    return <>
        <userContext.Provider value={{ signUp , signIn , token , setToken , logOut}}>
            {children}
    </userContext.Provider>
    </>
}