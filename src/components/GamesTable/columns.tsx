"use client"

import { cn, formatTimeElapsed } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Check, ChevronDown, ChevronUp, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button";
import { Select, SelectTrigger } from "../ui/select";
import { DropdownMenu ,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu";

export enum StateToStatus {
    "win" = "Win",
    "lose" = "Lose",
    "not_evaluated" = "Not evaluated",
    "cancelled" = "Cancelled",
    "checkout" = "Checkout",
}
export enum StatusToStyleCell {
    "Win" = "text-purple-500 group-hover:scale-150 group-hover:rotate-[760deg] duration-500",
    "Lose" = "text-red-500",
    "Not evaluated" = "text-white",
    "Cancelled" = "text-muted-foreground",
    "Checkout" = "text-green-500",
}
type ValuesType<T> = T[keyof T];
export type StateToStatusValues = ValuesType<typeof StateToStatus>;
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TGame = {
    status: StateToStatusValues;
    bet: number;
    won: number;
    date: Date;
};

export const columns: ColumnDef<TGame>[] = [
  {
    accessorKey: "status",
    header: ({column}) => {
      const filterValue = column.getFilterValue() as StateToStatusValues;

      const changeFilter = (val: StateToStatusValues) => {
        if(filterValue === val) {
          column.setFilterValue(undefined);
          return;
        }
        column.setFilterValue(val);
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            Status
            <MoreHorizontal className="ml-2 w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            {Object.values(StateToStatus).map((val) => {
              const isActive = filterValue === val;
              return (
                <DropdownMenuItem className={"flex items-center"} onClick={() => changeFilter(val)} key={val}>
                  {isActive && <Check className="w-4 h-4" />}
                  <p className={cn(isActive ? "ml-2": "ml-6")}>{val}</p>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue<StateToStatusValues>("status");
      
      return <span className={`font-semibold origin-center`}>
        <p className={`${StatusToStyleCell[status]} w-fit`}>{status}</p>
      </span>;
    }
  },
  {
    accessorKey: "bet",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Bet
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const formatted = row.getValue<number>("bet").toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return formatted;
    }
  },
  {
    accessorKey: "won",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Won
            <ArrowUpDown className="ml-2 w-4 h-4" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const formatted = row.getValue<number>("won").toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return formatted;
    }
  },
  {
    accessorKey: "date",
    header: ({column}) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <Clock className="ml-2 w-4 h-4" />
          </Button>
      )
    },
    cell: ({ row }) => {
      const formattedDate = formatTimeElapsed(row.getValue("date"));
      return <p>{formattedDate}</p>;
    }
  }
]
