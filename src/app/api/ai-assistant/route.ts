import { systemPrompt } from "@/app/constants/prompt";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// For testing project with clerks
// See this site: https://clerk.com/docs/testing/postman-or-insomnia
// Run this command in the project await window.Clerk.session.getToken({ template: '<the template name you chose above>' })

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
       const body = await req.json();
       const { prompt } = body;

       if (!prompt || typeof prompt !== "string") {
        return NextResponse.json({error: "Prompt is missed and must be a stirng"}, {status: 400});
       }
       if (prompt.length === 0) {
        return NextResponse.json({error: "Cannot send an empty prompt"}, {status: 400});
       }

       // Authentication
       const user = await currentUser();
       if (!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
       }

       const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content:prompt},
        ],
        temperature: 1.0,
        max_tokens: 4096,
       });

       const result = response.choices[0]?.message?.content || "No response generated.";
       return NextResponse.json({ result }, { status: 200 });
    } catch (err) {
        console.error("Error in AI assistant route:", err);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}