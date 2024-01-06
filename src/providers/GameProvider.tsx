"use client";
import { createClient } from "@/services/supabase/client";
import {Tables} from "@/services/supabase/database.types";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import { useAuth } from "./Auth/AuthProvider";
import { toast } from "sonner";

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


const GameProvider:FC<PropsWithChildren> = ({children}) => {
    const [game, setGame] = useState<IJoinedGame | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const supabaseClient = createClient();
    const {session} = useAuth();
    const router = useRouter();



    const fetchGame = useCallback(async (id:string) => {
        const {data,error} = await supabaseClient.from("games").select("*, mine_indexes ( * )").eq("id",id).single();
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
    },[supabaseClient,game]);



    const pick = useCallback(async (index:number) => {
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
    },[supabaseClient,game,session]);
    const pickRandom = useCallback(async () => {
        if(!game) return;

    },[supabaseClient,game]);
    const createGame = useCallback(async () => {

    },[supabaseClient]);

    const checkout = useCallback(async () => {
        if(!game) return;
        let { error } = await supabaseClient
        .rpc('checkout', {
            game_id: game!.id, 
            token: session!.access_token
        })
        if (error) {
            toast.error(error.message);
        }
    },[supabaseClient,game,session]);


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