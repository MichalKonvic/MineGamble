"use client";

import { createClient } from "@/services/supabase/client";
import { Database } from "@/services/supabase/database.types";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { useState, useCallback, useEffect, useContext, createContext, FC, PropsWithChildren } from "react";
import { toast } from "sonner";
import { useAuth } from "./Auth/AuthProvider";
import { Tables } from "@/services/supabase/database.types";

interface IProfileContext {
    profile: TProfile|null;
    isLoading: boolean;
}

const ProfileContext = createContext<IProfileContext>({
    profile: null,
    isLoading: true,
});

const useProfile = () => useContext(ProfileContext);

type TProfile = Tables<"profiles">;

const ProfileProvider:FC<PropsWithChildren> = ({children}) => {
    const {session,isLoading:isAuthLoading} = useAuth();
    const [isLoading,setLoading] = useState(true);
    const [profile,setProfile] = useState<null|TProfile>(null);
    const supabaseClient = createClient();
    const fetchProfile = useCallback(async () => {
        setLoading(true);
        const {data,error} = await supabaseClient
        .from("profiles")
        .select("*")
        .single();
        if(error) {
            toast.error(error.message);
        }
        if(data) {
            setProfile(data);
        }
        setLoading(false);
    },[supabaseClient]);
    const handleProfileChange = useCallback((payload: RealtimePostgresUpdatePayload<TProfile>) => {
        fetchProfile();
    },[fetchProfile]);
    useEffect(() => {
        if(isAuthLoading) return;
        if(!session) {
            setLoading(true);
            setProfile(null);
            return;
        }
        fetchProfile()
        const realtime = supabaseClient
        .channel("profiles")
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles"}, handleProfileChange)
        .subscribe();
        return () => {
            realtime.unsubscribe();
        }
    },[supabaseClient,handleProfileChange,isAuthLoading,session,fetchProfile]);
    return (
        <ProfileContext.Provider value={
            {
                profile,
                isLoading,
            }
        }>
            {children}
        </ProfileContext.Provider>
    );
};
export { useProfile };
export default ProfileProvider;