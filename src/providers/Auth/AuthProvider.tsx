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
        const {data:authListener} = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if(isLoading)
                setIsLoading(false);
        });
        return () => {
            authListener.subscription.unsubscribe();
        };
    },[supabaseClient,isLoading]);
    const login = useCallback(async (email: string, password: string) => {
        const res = await supabaseClient.auth.signInWithPassword({ email, password });
        return res;
    },[supabaseClient]);
    const logout = useCallback(async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
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