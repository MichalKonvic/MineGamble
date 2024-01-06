export type CellType =  keyof typeof CellTypes | null;
export enum CellTypes{
    mine = "mine",
    nonMineCell = "nonMineCell",
    hidden = "hidden",
}