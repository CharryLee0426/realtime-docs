"use client";

import { useState } from "react"
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/stripe", { method: "GET" });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.url;
            } else {
                toast.error("Failed to redirect to Checkout");
            }
        } catch (error) {
            toast.error(`${error}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button disabled={loading} onClick={onClick} size="sm" variant={isPro ? "default" : "premium"}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Sparkles className="h-4 w-4 fill-white text-white ml-2" />}
        </Button>
    )
}