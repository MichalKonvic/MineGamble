"use client";
import { createClient } from "@/services/supabase/client";
import {Tables} from "@/services/supabase/database.types";
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./Auth/AuthProvider";
import { toast } from "sonner";
import { useProfile } from "./ProfileProvider";
import { useRouter } from "next/navigation";

interface IJoinedGame extends Tables<"games"> {
    mine_indexes: Tables<"mine_indexes"> | null;
    pick: (index:number) => Promise<void>;
    pickRandom: () => Promise<void>;
    checkout: () => Promise<void>;
};

interface IGameContext {
    isLoading: boolean;
    game: IJoinedGame | null;
    createGame: (bet:number, mines_count:number, size:number,redirect:boolean) => Promise<void>;
    setGameId: (gameId:number) => void;
}

const GameContext = createContext<IGameContext>({
    isLoading: false,
    game: null,
    createGame: async () => {},
    setGameId: () => {},
});

const useGame = (gameId?:number) => {
    const game = useContext(GameContext);
    if(gameId) {
        game.setGameId(gameId);
    }
    return game;
};


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
    const router = useRouter();









    const createGame = useCallback(async (bet:number,mines_count:number, size:number,redirect:boolean) => {
        if(isProfileLoading) return;
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
        setGameId(data.id);
        if(redirect) {
            router.push(`/game/${data.id}`);
        }
    },[supabaseClient,isProfileLoading,profile,router]);


    useEffect(() => {
        if(!gameId) return;
        if(!session?.access_token) return;
        const fetchGame = async () => {
            if(!gameId) return;
            setIsLoading(true);
            const {data,error} = await supabaseClient.from("games").select("*, mine_indexes ( * )").eq("id",gameId).single();
            if(error || !data) {
                if(error) {
                    toast.error(error.message);

                }else {
                    toast.error("Game not found");

                }
                 setIsLoading(false);
                return;
            }
            const pickRandom = async () => {
                    let { error } = await supabaseClient
                    .rpc('pick_random', {
                        game_id: data.id, 
                        token: session!.access_token
                    })
                    if (error) {
                        toast.error(error.message);
                    }
            }
            const pick = async (index:number) => {
                    let { error } = await supabaseClient
                    .rpc('pick', {
                        game_id: data.id, 
                        index, 
                        token: session!.access_token
                    })
                    if (error) {
                        toast.error(error.message);
                    }
            }
            const checkout = async () => {
                    let { error } = await supabaseClient
                    .rpc('checkout', {
                        game_id: data.id, 
                        token: session!.access_token
                    })
                    if (error) {
                        toast.error(error.message);
                    }
                    fetchGame();
            }
            const gameData = {
                ...data,
                pick: pick,
                pickRandom: pickRandom,
                checkout: checkout,
            };
            setGame(gameData);
            setIsLoading(false);
        }
        fetchGame();
        const realtime = supabaseClient.channel("games")
        .on("postgres_changes",{event:"*", schema:"public", table: "games"},fetchGame).subscribe();
        return () => {
            realtime.unsubscribe();
        }
    },[gameId,supabaseClient,session]);
   


    return (
        <GameContext.Provider value={{
            isLoading,
            game,
            createGame,
            setGameId
        }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;
export {useGame};