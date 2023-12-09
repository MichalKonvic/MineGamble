import { useGame } from "../providers/GameProvider";
import Button from "./ui/Button";
import NumberInput from "./ui/NumberInput";

const Controls = () => {
    const {controls: {play,checkout,ok,pickRandom},setBet,bet,minesCount,setMinesCount,state,winnigs,size,setSize} = useGame();
  return (
    <div className="flex flex-col gap-2">
       {state === "idle" && 
        <>
            <NumberInput value={size} onChange={({target:{value}}) => !isNaN(Number(value)) && setSize(Number(value))} type="text" placeholder="Size"/>
            <NumberInput value={bet} onChange={({target:{value}}) => !isNaN(Number(value)) && setBet(Number(value))} type="text" placeholder="Bet"/>
            <NumberInput value={minesCount} onChange={({target:{value}}) => !isNaN(Number(value)) && setMinesCount(Number(value))} type="text" placeholder="Mines"/>
            <Button onClick={play}>Play</Button>
        </>}
        {state === "playing" && <>
            <Button className="bg-green-400 text-gray-800 hover:bg-green-500" onClick={checkout}>Checkout</Button>
            <Button  onClick={pickRandom}>Pick random</Button>
        </>}
        {state !== "idle" && <p className="text-2xl text-slate-100 font-bold w-full">Winnings: {winnigs}</p>}
        {(state === "win" || state === "lose") && <>
            <p className={`text-2xl font-bold ${state === "win" ? "text-green-500" : "text-red-500"}`}>{state === "win" ? "You won!" : "You lost!"}</p>
            <Button onClick={ok}>OK</Button>
        </>}
    </div>
  )
}

export default Controls