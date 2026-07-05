import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-emerald-500/30 bg-background px-6 py-2.5 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2 text-sm transition-all duration-300 group-hover:opacity-0">
        {text}
      </span>
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-sm text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
        {text}
        <ArrowRight className="h-4 w-4" />
      </span>
      <div className="absolute inset-0 scale-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:scale-100"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
