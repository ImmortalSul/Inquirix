import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';



export const appRouter = router({
    authCallback: publicProcedure.query(async ()=>{
        const {getUser} = getKindeServerSession()
        const user = await getUser()

        if(!user || !user.id || !user.email) 
            throw new TRPCError({code: 'UNAUTHORIZED', })

        //time to check if the user is in the database
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id
            }
        })
        if(!dbUser){ //if the user is not in the database, we need to add them as its the first time they are logging in
            //create the user
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,  
                }
            })
        }
            return {success : true}
    }),
    getUserFiles: privateProcedure.query(async({ctx})=>{
        const {userId} = ctx

        return await db.file.findMany({
            where: {
                userId
            }
        })
    }),
});

export type AppRouter = typeof appRouter;