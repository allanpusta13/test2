import * as React from "react"
import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("text-[10px] font-bold uppercase tracking-wider text-stone-400", className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 text-[11px] font-bold text-stone-300 hover:text-stone-100 hover:bg-stone-800/80 data-[state=open]:bg-stone-800"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-amber-400" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-amber-400" />
            ) : (
              <ChevronsUpDown className="ml-1.5 h-3.5 w-3.5 text-stone-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-stone-900 border-stone-800 text-stone-200">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="gap-2 text-xs">
            <ArrowUp className="h-3.5 w-3.5 text-stone-400" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="gap-2 text-xs">
            <ArrowDown className="h-3.5 w-3.5 text-stone-400" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-stone-800" />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className="gap-2 text-xs text-stone-400">
            <EyeOff className="h-3.5 w-3.5" />
            Hide column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
