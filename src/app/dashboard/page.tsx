import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"  
const Page = async () => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id) redirect("/auth-callback?orign=dashboard");
    // this shit happens only when they dont beon the db on prisma lol
    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })
    if(!dbUser) redirect("/auth-callback?orign=dashboard")
   
        return <Dashboard />

}
export default Page;