"use client";
import { createClient } from "@/services/supabase/client";
import {Tables} from "@/services/supabase/database.types";
import { useParams, useRouter } from "next/navigation";
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./Auth/AuthProvider";
import { toast } from "sonner";
import { useProfile } from "./ProfileProvider";

interface IJoinedGame extends Tables<"games"> {
    mine_indexes: Tables<"mine_indexes"> | null;
    pick: (index:number) => Promise<void>;
    pickRandom: () => Promise<void>;
    checkout: () => Promise<void>;
};

interface IGameContext {
    isLoading: boolean;
    game: IJoinedGame | null;
    createGame: (bet:number, mines_count:number, size:number) => Promise<void>;
}

const GameContext = createContext<IGameContext>({
    isLoading: false,
    game: null,
    createGame: async () => {},
});

const useGame = () => useContext(GameContext);


interface Props {
    initialGameId?: number;
}

const GameProvider:FC<PropsWithChildren<Props>> = ({children,initialGameId=null}) => {
    const [gameId,setGameId] = useState<number | null>(initialGameId);
    const [game, setGame] = useState<IJoinedGame | null>(null);
    const {profile,isLoading:isProfileLoading} = useProfile();
    const [isLoading, setIsLoading] = useState(false);
    const supabaseClient = createClient();
    const {session} = useAuth();





    const {fetchGame} = useMemo(() => {
        const pick = async (index:number) => {
            if(!game) return;
            let { error } = await supabaseClient
            .rpc('pick', {
                game_id: game!.id, 
                index, 
                token: session!.access_token
            })
            if (error) {
                toast.error(error.message);
            }
        }
        const pickRandom = async () => {
            if(!game) return;
            let { error } = await supabaseClient
            .rpc('pick_random', {
                game_id: game!.id, 
                token: session!.access_token
            })
            if (error) {
                toast.error(error.message);
            }
            fetchGame();
        }
        const checkout = async () => {
            if(!game) return;
            let { error } = await supabaseClient
            .rpc('checkout', {
                game_id: game!.id, 
                token: session!.access_token
            })
            if (error) {
                toast.error(error.message);
            }
        }
        const fetchGame = async () => {
            const {data,error} = await supabaseClient.from("games").select("*, mine_indexes ( * )").eq("id",gameId).single();
            if(error) {
                toast.error(error.message);
                return;
            }
            if(!data) {
                toast.error("Game not found");
                return;
            }
            setGame({
                ...data,
                pick: pick,
                pickRandom: pickRandom,
                checkout: checkout,
            });
        }
        return {
            fetchGame,
        }
    },[game, gameId, session, supabaseClient])




    const createGame = useCallback(async (bet:number,mines_count:number, size:number) => {
        if(isProfileLoading) return;
        setIsLoading(true);
        const {data,error} = await supabaseClient.from("games").insert({
            player_id: profile!.id,
            bet,
            mines_count,
            size,
            mines_id: -1,

        }).select("id").maybeSingle();
        if(error) {
            toast.error(error.message);
            return;
        }
        if(!data) return;
        setGameId(data?.id);
        setIsLoading(false);
    },[supabaseClient,isProfileLoading,profile]);

    useEffect(() => {
        if(!gameId) return;
        fetchGame();
        const realtime = supabaseClient.channel("games")
        .on("postgres_changes",{event:"*", schema:"public", table: "games",filter: `id=eq.${gameId}`},fetchGame);
        return () => {
            realtime.unsubscribe();
        }
    },[fetchGame,gameId,supabaseClient]);
   


    return (
        <GameContext.Provider value={{
            isLoading: false,
            game: null,
            createGame,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;
export {useGame};