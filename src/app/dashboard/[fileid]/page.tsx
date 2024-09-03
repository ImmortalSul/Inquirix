import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

interface PageProps {
    params: {
        fileid: string;
    }
}

const Page = async ({ params }: PageProps) => {
    const { fileid } = params;

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
        return NextResponse.redirect(`/auth-callback?origin=/dashboard/${fileid}`);
    }

    const file =await db.file.findFirst({
        where: {
            id: fileid,
            userId: user.id
        },
    })

    if(!file) notFound()

    return (<div>File ID: {fileid}</div>);
}

export default Page;
