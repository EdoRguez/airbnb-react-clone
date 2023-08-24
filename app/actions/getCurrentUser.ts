import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/app/libs/prismadb';

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        console.log('que paso');

        const session = await getSession();
        console.log(session);
        if(!session?.user?.email) {
            return null;
        }
        console.log('check sesion')
        console.log(session.user);
        const currentUser = await prisma.user.findFirst({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        return null;
    }
}