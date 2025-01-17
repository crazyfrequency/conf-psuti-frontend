import { cn } from "@/lib/utils";

export default function Error({
  children,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>& Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "text-destructive text-xl text-center content-center",
        className
      )}
      {...props}
      >
      {children}
    </div>
  )
}
