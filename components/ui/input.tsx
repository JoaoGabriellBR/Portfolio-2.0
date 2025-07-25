import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { textSizes } from "@/utils/text-sizes";

type InputProps = HTMLMotionProps<"input"> &
  React.ComponentPropsWithoutRef<"input"> & {
    label: string;
  };

const inputStyles = "text-foreground dark:text-white tracking-wide break-words";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <motion.input
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          type={type}
          className={cn(
            `${textSizes.md} ${inputStyles} peer flex h-10 w-full rounded-md border-b-2 border-neutral-400 dark:border-neutral-800 bg-transparent px-3 pt-4 pb-2 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50  font-normal`,
            className
          )}
          ref={ref}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={props.id}
          className={cn(
            `${textSizes.md} ${inputStyles} absolute duration-300 transform -translate-y-6 scale-75 top-4 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none  font-semibold dark:font-normal`
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
