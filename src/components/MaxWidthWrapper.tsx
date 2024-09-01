import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({   // Wrapper component for limiting the width of the content so it stays the same on all screen sizes
    className,
    children

    
}: {
    className?: string
    children: ReactNode
}) => {      
    return(
    <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
        {children}
    </div>
    )
}

export default MaxWidthWrapper;