// src/components/ui/button.jsx
import React from "react";

export const Button = React.forwardRef(
  ({ className = "", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        className={`
        inline-flex items-center justify-center
        rounded-md text-sm font-medium
        transition-colors focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-purple-400
        disabled:pointer-events-none disabled:opacity-50
        ${className}
      `}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
