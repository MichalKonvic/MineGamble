import { useGame } from "../providers/GameProvider"
import MineButton from "./MineButton";

const GameField = () => {
    const {size} = useGame();
  return (
    <table className="text-white border-gray-50 border h-fit text-2xl">
        <tbody>
            <>
            {
                [...Array(size)].map((_, i) => () => {
                    return (
                        <tr key={i}>
                            {
                                [...Array(size)].map((_, j) => {
                                    const index = i*size + j;
                                    return (
                                        <td key={j}>
                                            <MineButton key={index} index={index}/>
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                }).map((fn) => fn())
            }
            </>
        </tbody>  
    </table>
  )
}

export default GameField