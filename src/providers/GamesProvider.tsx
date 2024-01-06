"use client";

import { createClient } from "@/services/supabase/client";
import { Database, Tables } from "@/services/supabase/database.types";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { useState, useCallback, useEffect, useContext, createContext, FC, PropsWithChildren } from "react";
import { toast } from "sonner";
import { useAuth } from "./Auth/AuthProvider";

interface IProfileContext {
    games: TGames|null;
    isLoading: boolean;
}

const GamesContext = createContext<IProfileContext>({
    games: null,
    isLoading: true,
});

const useGames = () => useContext(GamesContext);

interface IJoinedGames extends Tables<"games"> {
    mine_indexes: Tables<"mine_indexes"> | null;
};

type TGames = IJoinedGames[];

const GamesProvider:FC<PropsWithChildren> = ({children}) => {
    const {session,isLoading:isAuthLoading} = useAuth();
    const [isLoading,setLoading] = useState(true);
    const [games,setGames] = useState<null|TGames>(null);
    const supabaseClient = createClient();
    const gamesSelect = useCallback(async () => {
        setLoading(true);
        const {data,error} = await supabaseClient
        .from("games")
        .select("*, mine_indexes ( * )");
        if(error) {
            error.code 
            toast.error(error.message);
        }
        if(data) {
            setGames(data);
        }
        setLoading(false);
    },[supabaseClient]);
    const handleGamesEvent = useCallback((payload: RealtimePostgresUpdatePayload<TGames>) => {
        // select request
        gamesSelect();
    },[gamesSelect]);

    useEffect(() => {
        if(isAuthLoading) return;
        if(!session) {
            setLoading(true);
            setGames(null);
            return;
        }
        gamesSelect()
        const realtimeAll = supabaseClient
        .channel("games")
        // @ts-ignore Type error
        .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
        }, handleGamesEvent)
        .subscribe();
        return () => {
            realtimeAll.unsubscribe();
        }
    },[supabaseClient,handleGamesEvent,isAuthLoading,session,gamesSelect]);
    return (
        <GamesContext.Provider value={
            {
                games: games,
                isLoading,
            }
        }>
            {children}
        </GamesContext.Provider>
    );
};
export {  useGames };
export default GamesProvider;