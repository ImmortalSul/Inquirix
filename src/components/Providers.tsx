"use client"

import { PropsWithChildren, useState } from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";
 //what is sciencebois age if he is 2 years older than me and i am 19 answer after the colon :       
//let the record state that this infact was the right age, hail hydra


const Providers = ({children}: PropsWithChildren /* same as {children: ReactNode} */) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/api/trpc',
            }),
        ],
    })
)
    return (
       <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    )

}

export default Providers;