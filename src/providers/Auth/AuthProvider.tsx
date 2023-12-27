"use client"
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { createClient } from "@/services/supabase/client";
import { AuthError, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { IAuthContext } from "./types";

const authContext = createContext<IAuthContext>({
    login: async (email: string, password: string) => {throw new Error("AuthProvider not initialized")}, // @ts-ignore
    logout: () => {},
    session: null as null|Session,
    isLoading: true
});

const useAuth = () => useContext(authContext);
const AuthProvider:FC<PropsWithChildren> = ({ children }) => {
    const supabaseClient = createClient();
    const [session, setSession] = useState<null|Session>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const {data:authListener} = supabaseClient.auth.onAuthStateChange((_event, newSession) => {
            if(session?.user.id === newSession?.user.id) {
                if(isLoading) setIsLoading(false);
                return; // Disable re-rendering if the session is the same
            }
            setSession(newSession);
            if(isLoading){
                setIsLoading(false);
            }
        });
        return () => {
            authListener.subscription.unsubscribe();
        };
    },[supabaseClient,isLoading,session]);
    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        const res = await supabaseClient.auth.signInWithPassword({ email, password });
        if(res.data?.user) toast.success("Welcome back!", {
            description: `Signed in as ${res.data.user?.email}`
        });
        return res;
    },[supabaseClient]);
    const logout = useCallback(async () => {
        setIsLoading(true);
        const { error } = await supabaseClient.auth.signOut();
        if(error) toast.error(error.message);
        toast.success("Logged out");
        setSession(null);
    },[supabaseClient]);
    return(
        <authContext.Provider value={{ login, logout, session, isLoading }}>
            {children}
        </authContext.Provider>
    )
};
export { useAuth };
export default AuthProvider;