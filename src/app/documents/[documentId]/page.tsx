interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    // Dynamic APIs are asynchronous from NextJS 15.
    const { documentId } = await params;
    return ( 
    <div>
        Document Id: {documentId}
    </div> 
    );
}
 
export default DocumentIdPage;