import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { Room } from "./room";

interface DocumentIdPageProps {
    params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    // Preload the document by server side due to the powerful server
    // render capability of NextJS
    // Learn more from convex documentations
    const { documentId } = await params;

    const { getToken } = await auth();
    const token = await getToken({ template: "convex" }) ?? undefined;

    if (!token) {
        throw new Error("Unauthorized");
    }

    const preloadedDocument = await preloadQuery(
        api.documents.getById,
        { id: documentId },
        { token } // need authentication when using preload query
    );

    return ( 
        <Room>
            <Document preloadedDocument={preloadedDocument}/>
        </Room>
    );
}
 
export default DocumentIdPage;