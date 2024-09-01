import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
const middleware = t.middleware
const isAuth = middleware (async(opts) => {

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.id){
        throw new TRPCError({code: 'UNAUTHORIZED'})
    } 

    return opts.next({
        ctx: {// what this does is adds context so it can pass info from here to index
            userId: user.id,
            user,
        }
    })

})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);// damn this shit works, basically it makes sure the logic works before the ctx(context) is passed lol
    
