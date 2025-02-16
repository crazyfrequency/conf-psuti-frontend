import * as React from "react"
import { Primitive } from "@radix-ui/react-primitive"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const ControlGroupContext = React.createContext<
  Pick<ControlGroupProps, "orientation">
>({
  orientation: "horizontal",
})

function useControlGroupContext() {
  const context = React.useContext(ControlGroupContext)

  if (!context) {
    throw new Error("useControlGroup must be used within a <ControlGroup />")
  }

  return context
}

export interface ControlGroupProps
  extends React.ComponentPropsWithoutRef<typeof Primitive.div> {
  orientation?: "horizontal" | "vertical"
}

export const ControlGroup = React.forwardRef<
  React.ElementRef<typeof Primitive.div>,
  ControlGroupProps
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <ControlGroupContext.Provider value={{ orientation }}>
    <Primitive.div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "vertical" && "flex-col",
        className
      )}
      {...props}
    />
  </ControlGroupContext.Provider>
))
ControlGroup.displayName = "ControlGroup"

export const ControlGroupItem = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => {
  const { orientation } = useControlGroupContext()

  return (
    <Slot
      ref={ref}
      className={cn(
        "rounded-none focus-within:z-10",
        orientation === "horizontal" &&
          "-me-px h-auto first:rounded-s-md last:-me-0 last:rounded-e-md",
        orientation === "vertical" &&
          "w-auto [margin-block-end:-1px] first:rounded-se-md first:rounded-ss-md last:rounded-ee-md last:rounded-es-md last:[margin-block-end:0]",
        className
      )}
      {...props}
    />
  )
})
ControlGroupItem.displayName = "ControlGroupItem"
