import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton, OrganizationSwitcher, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DAY_IN_MS } from "../constants/time";
import { SubscriptionButton } from "@/components/subscription-button";

export const Navbar = () => {
    const [isPro, setIsPro] = useState(false);
    const { user } = useUser();
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
        <nav className="flex items-center justify-between h-full w-full">
            <div className="flex gap-3 items-center shrink-0 pr-6">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                </Link>
                <h3 className="text-xl">Docs</h3>
            </div>
            <SearchInput />
            <div className="flex gap-3 items-center pl-6">
                <SubscriptionButton isPro={isPro} />
                <OrganizationSwitcher 
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    );
}