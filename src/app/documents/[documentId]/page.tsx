import { Editor } from "./editor";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    // Dynamic APIs are asynchronous from NextJS 15.
    const { documentId } = await params;
    return ( 
    <div className="min-h-screen bg=[#FAFBFD]">
        <Editor />
    </div> 
    );
}
 
export default DocumentIdPage;