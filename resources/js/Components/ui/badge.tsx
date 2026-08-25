import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-amber-500/30 bg-amber-500/15 text-amber-300",
        secondary:
          "border-stone-700 bg-stone-800 text-stone-300",
        destructive:
          "border-red-500/30 bg-red-500/15 text-red-300",
        success:
          "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
        outline: "text-stone-300 border-stone-700",
        amber: "border-amber-500/40 bg-amber-500 text-stone-950",
        sky: "border-sky-500/30 bg-sky-500/15 text-sky-300",
        purple: "border-purple-500/30 bg-purple-500/15 text-purple-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
