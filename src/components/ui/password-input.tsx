import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base"
import * as PasswordInputPrimitive from "@/components/ui/password-input-primitive"

export type PasswordInputProps = React.ComponentPropsWithoutRef<
  typeof PasswordInputPrimitive.Root
> &
  React.ComponentPropsWithoutRef<typeof InputBase>

export const PasswordInput = React.forwardRef<
  React.ElementRef<typeof InputBase>,
  PasswordInputProps
>(({ visible, defaultVisible, onVisibleChange, ...props }, ref) => (
  <PasswordInputPrimitive.Root
    visible={visible}
    defaultVisible={defaultVisible}
    onVisibleChange={onVisibleChange}
  >
    <InputBase ref={ref} {...props} />
  </PasswordInputPrimitive.Root>
))
PasswordInput.displayName = "PasswordInput"

export const PasswordInputAdornment = InputBaseAdornment

export const PasswordInputAdornmentButton = InputBaseAdornmentButton

export const PasswordInputInput = React.forwardRef<
  React.ElementRef<typeof PasswordInputPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof PasswordInputPrimitive.Input>
>((props, ref) => (
  <InputBaseControl>
    <PasswordInputPrimitive.Input ref={ref} asChild {...props}>
      <InputBaseInput />
    </PasswordInputPrimitive.Input>
  </InputBaseControl>
))
PasswordInputInput.displayName = "PasswordInputInput"

export const PasswordInputAdornmentToggle = React.forwardRef<
  React.ElementRef<typeof PasswordInputPrimitive.Toggle>,
  React.ComponentPropsWithoutRef<typeof PasswordInputPrimitive.Toggle>
>(({ className, ...props }, ref) => (
  <InputBaseAdornment>
    <InputBaseAdornmentButton asChild>
      <PasswordInputPrimitive.Toggle
        ref={ref}
        className={cn("group", className)}
        {...props}
      >
        <Eye className="hidden size-4 group-data-[state=visible]:block" />
        <EyeOff className="block size-4 group-data-[state=visible]:hidden" />
      </PasswordInputPrimitive.Toggle>
    </InputBaseAdornmentButton>
  </InputBaseAdornment>
))
PasswordInputAdornmentToggle.displayName = "PasswordInputAdornmentToggle"
