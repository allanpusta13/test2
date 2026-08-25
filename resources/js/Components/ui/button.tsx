import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-amber-500 text-stone-950 shadow hover:bg-amber-400 active:scale-[0.98]",
        destructive:
          "bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white shadow-sm",
        outline:
          "border border-stone-800 bg-stone-900/60 text-stone-200 hover:bg-stone-800 hover:text-stone-100",
        secondary:
          "bg-stone-800 text-stone-100 hover:bg-stone-750 active:bg-stone-700",
        ghost: "text-stone-300 hover:bg-stone-800/60 hover:text-stone-100",
        link: "text-amber-400 underline-offset-4 hover:underline",
        emerald: "bg-emerald-600 text-white hover:bg-emerald-500 active:scale-[0.98] shadow-md shadow-emerald-900/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-base",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
