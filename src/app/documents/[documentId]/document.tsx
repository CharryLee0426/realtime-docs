"use client";

import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { AIAssistant } from "./ai-assistent";
import { useEffect, useState } from "react";
import { DAY_IN_MS } from "@/app/constants/time";

interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
    // Using preload content from convex to make sure its real-time availability
    const document = usePreloadedQuery(preloadedDocument);
    const { user } = useUser();

    const [isPro, setIsPro] = useState(false);
    const userSubscription = useQuery(api.subscriptions.getSubscription, user ? {ownerId: user.id} : {ownerId: ""});

    const checkSubscription = () => {
        if (!user) {
            setIsPro(false);
        }

        if (!userSubscription) {
            setIsPro(false);
        }

        const isValid = userSubscription?.stripePriceId && (userSubscription?.stripeCurrentPeriodEnd ?? 0) + DAY_IN_MS > Date.now();
        setIsPro(!!isValid);
    }

    useEffect(() => {
        checkSubscription();
    }, [user, userSubscription, checkSubscription]);

    return ( 
    <div className="min-h-screen bg=[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
            <Navbar data={document} isPro={isPro}/>
            <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
            {user?.id === document.ownerId && !document.isPreloaded ? <Editor initialContent={document.initialContent} id={document._id}/> : <Editor id={document._id}/>}
        </div>
        {isPro == true ? (
            <div className="fixed bottom-2 right-28 z-10">
                <AIAssistant documentId={document._id} />
            </div>
        ) : (
            <div></div>
        )}
    </div>
    );
}