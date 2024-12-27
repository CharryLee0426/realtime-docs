import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
    try {
        // Authentication
        const user = await currentUser();
        if (!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const formData = await req.formData(); // Extract form data
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json(
                { error: "File are required" },
                { status: 400 }
            );
        }

        // Check if the file is an image based on MIME type
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
            { error: "The uploaded file is not an image" },
            { status: 400 }
            );
        }

        const postUrl = await convex.mutation(api.images.generateUploadUrl);
        if (!postUrl) {
            return NextResponse.json(
                { error: "Failed to generate upload URL" },
                { status: 500 }
            );
        }

        console.log("postUrl", postUrl);
        console.log("file name", file.name);
        console.log("file type", file.type);

        // Make the POST request to the upload URL
        const result = await fetch(postUrl, {
        headers: { "Content-Type": file!.type },
        method: "POST",
        body: file,
        });

        const { storageId } = await result.json();
        if (!storageId) {
            return NextResponse.json(
                { error: "Failed to upload image" },
                { status: 500 }
            );
        }

        // Get the serve URL
        const serveUrl = await convex.query(api.images.generateServeUrl, {
            storageId,
        });
        if (!serveUrl) {
            return NextResponse.json(
                { error: "Failed to generate serve URL" },
                { status: 500 }
            );
        }

        return NextResponse.json({ serveUrl });
    } catch (error) {
        return NextResponse.json({ error: `Fail to upload image: ${error}` }, { status: 500 });
    }
}