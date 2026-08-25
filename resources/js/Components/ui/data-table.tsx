import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  toolbarSlot?: React.ReactNode
  pageSize?: number
  pageSizeOptions?: number[]
  emptyMessage?: string
  showColumnVisibility?: boolean
  showPagination?: boolean
  tableClassName?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search records...",
  globalFilter: controlledGlobalFilter,
  onGlobalFilterChange,
  toolbarSlot,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  emptyMessage = "No matching records found.",
  showColumnVisibility = true,
  showPagination = true,
  tableClassName,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState("")

  const isGlobalFilterControlled = controlledGlobalFilter !== undefined
  const currentGlobalFilter = isGlobalFilterControlled ? controlledGlobalFilter : internalGlobalFilter

  const handleGlobalFilterChange = (val: string) => {
    if (isGlobalFilterControlled) {
      onGlobalFilterChange?.(val)
    } else {
      setInternalGlobalFilter(val)
    }
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter: searchKey ? undefined : currentGlobalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      {(searchKey || !searchKey || toolbarSlot || showColumnVisibility) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {searchKey ? (
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder={searchPlaceholder}
                  value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                  }
                  className="pl-9 pr-8 h-9 text-xs bg-stone-950 border-stone-800 rounded-xl text-stone-200 placeholder:text-stone-500"
                />
                {Boolean(table.getColumn(searchKey)?.getFilterValue()) && (
                  <button
                    onClick={() => table.getColumn(searchKey)?.setFilterValue("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder={searchPlaceholder}
                  value={currentGlobalFilter}
                  onChange={(e) => handleGlobalFilterChange(e.target.value)}
                  className="pl-9 pr-8 h-9 text-xs bg-stone-950 border-stone-800 rounded-xl text-stone-200 placeholder:text-stone-500"
                />
                {Boolean(currentGlobalFilter) && (
                  <button
                    onClick={() => handleGlobalFilterChange("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {toolbarSlot}
          </div>

          <div className="flex items-center gap-2">
            {showColumnVisibility && <DataTableViewOptions table={table} />}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className={`rounded-2xl border border-stone-800 bg-stone-900 overflow-hidden shadow-lg ${tableClassName || ""}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-stone-800">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-stone-800/60 hover:bg-stone-850/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-xs text-stone-400"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      )}
    </div>
  )
}
