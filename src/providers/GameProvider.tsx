import { FC, createContext, useCallback, useContext, useEffect, useState } from "react";

type GameState = 'playing' | 'win' | 'lose' | 'idle';

interface GameContextData{
    state: GameState;
    winnigs: number;
    size: number;
    setSize: (size: number) => void;
    bet: number;
    minesCount: number;
    setMinesCount: (count: number) => void;
    setBet: (bet: number) => void;
    mines: number[];
    revealedFields: number[];
    controls: {
        play: () => void;
        checkout: () => void;
        pick: (index: number) => void;
        pickRandom: () => void;
        ok: () => void;
    }
}

interface Props{
    children: React.ReactNode;
}

const useGame = () => useContext(GameContext);

const GameContext = createContext({} as GameContextData);

const GameProvider: FC<Props> = ({children}) => {
    const [size, setSize] = useState<number>(5);
    const [state, setState] = useState<GameState>('idle');
    const [winnigs, setWinnigs] = useState<number>(0);
    const [bet, _setBet] = useState<number>(0);
    const [minesCount, _setMinesCount] = useState<number>(1);
    const [mines, setMines] = useState<number[]>([]);
    const [revealedFields, setRevealedFields] = useState<number[]>([]);
    const setMinesCount = (count: number) => {
        if(count < 1 || count > size*size-1) return;
        _setMinesCount(count);
    };
    const round = useCallback((n:number) => {
        const [fixed,decimal] = n.toString().split('.');
        if(decimal){
            return Number(`${fixed}.${decimal.slice(0,2)}`);
        }
        return n;

    },[]);
    const getArrayOfIndexesWithoutMines = () => {
        const arr = [];
        for(let i = 0; i < size*size; i++){
            if(!mines.includes(i)){
                arr.push(i);
            }
        }
        return arr;
    };
    const getArrayOfUnrevealedFields = () => {
        const arr = [];
        for(let i = 0; i < size*size; i++){
            if(!revealedFields.includes(i)){
                arr.push(i);
            }
        }
        return arr;
    };
    const generateMines = (count: number) => {
        if(count < 1 || count > size*size-1) return;
        const mines = [];
        let freeFields = getArrayOfIndexesWithoutMines();
        for(let i = 0; i < count; i++){
            const randomIndex = Math.floor(Math.random() * freeFields.length);
            mines.push(freeFields[randomIndex]);
            freeFields = freeFields.filter((_,index) => index !== randomIndex);
        }
        setMines(mines);
    };
    const play = () => {
        if(state === 'idle' && bet > 0){
            generateMines(minesCount);
            setState('playing');
        }
    };
    const setBet = (bet: number) => {
        if(bet > 0 && state === 'idle'){
            _setBet(bet);
        }
    };
    const checkout = () => {
        if(state === 'win' || state === 'playing'){
            resetGame();
        }
    };
    const pick = (index: number) => {
        if(state === 'playing'){
            // check if index is already revealed
            if(revealedFields.includes(index)) return;
            // check if user found all non mine fields
            if(revealedFields.length === size*size - minesCount - 1){
                setState('win');
            }
            setRevealedFields((fields) => [...fields, index]);
            if(mines.includes(index)){
                setState('lose');
                setRevealedFields([...Array(size*size).keys()])
            }
        }
    };
    const pickRandom = () => {
        if(state === 'playing'){
            const unrevealedFields = getArrayOfUnrevealedFields();
            const index = Math.floor(Math.random() * unrevealedFields.length);
            pick(unrevealedFields[index]);
        }
    }
    const resetGame = () => {
        // reset game
        setRevealedFields([]);
        setMines([]);
        _setBet(0);
        setWinnigs(0);
        setState('idle');
    }
    const ok = () => {
        if(state === 'lose' || state === 'win'){
            resetGame();
        }
    }
    useEffect(() => {
        // calc winnings
        if(state === 'idle') return;
        if(state === 'win' || state === 'playing'){
            const calc = 
                // Bet
                bet *
                // Constant
                0.025 *  (
                // revealed fields
                revealedFields.length * 
                // mines
                (minesCount * 1.001) * 
                // remaining fields calc
                (   
                    // remaining fields
                    (size*size + revealedFields.length - minesCount) * 
                    // Constant
                    0.05
                )
                );
            setWinnigs(round(bet + calc));
        }else{
            setWinnigs(0);
        }
            
    },[revealedFields,mines,state,bet,minesCount,round,size])
    return (
        <GameContext.Provider value={
            {
                winnigs,
                size,
                setSize,
                state,
                bet,
                setBet,
                minesCount,
                setMinesCount,
                mines,
                revealedFields,
                controls: {
                    play,
                    checkout,
                    pick,
                    pickRandom,
                    ok
                }
            }
        }>
            {children}
        </GameContext.Provider>
    )
};

export {
    useGame,
    GameProvider
};