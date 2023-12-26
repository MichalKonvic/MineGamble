"use client";

import { createClient } from "@/services/supabase/client";
import { Database } from "@/services/supabase/database.types";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { useState, useCallback, useEffect, useContext, createContext, FC, PropsWithChildren } from "react";
import { toast } from "sonner";
import { useAuth } from "./Auth/AuthProvider";

interface IProfileContext {
    profile: TProfile|null;
    isLoading: boolean;
}

const ProfileContext = createContext<IProfileContext>({
    profile: null,
    isLoading: true,
});

const useProfile = () => useContext(ProfileContext);

type TProfile = Database["public"]["Tables"]["profiles"]["Row"];

const ProfileProvider:FC<PropsWithChildren> = ({children}) => {
    const {session,isLoading:isAuthLoading} = useAuth();
    const [isLoading,setLoading] = useState(true);
    const [profile,setProfile] = useState<null|TProfile>(null);
    const supabaseClient = createClient();
    const handleProfileUpdate = useCallback((payload: RealtimePostgresUpdatePayload<TProfile>) => {
        setProfile(payload.new);
    },[]);
    useEffect(() => {
        if(isAuthLoading) return;
        if(!session) {
            setLoading(true);
            setProfile(null);
            return;
        }
        (async () => {
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
        })();
        const realtime = supabaseClient
        .channel("profiles")
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles"}, handleProfileUpdate)
        .subscribe();
        return () => {
            realtime.unsubscribe();
        }
    },[supabaseClient,handleProfileUpdate,isAuthLoading,session]);
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