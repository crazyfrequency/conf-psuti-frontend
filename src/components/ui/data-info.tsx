import { cn } from "@/lib/utils";
import { Label } from "./label";

function DataLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Label>) {
  return (
    <Label
      className={cn(
        "flex text-end justify-end items-center font-bold text-base",
        className
      )}
      {...props}
    />
  )
}

function DataText({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center text-sm font-normal",
        className
      )}
      {...props}
    />
  )
}

export { DataLabel, DataText };

