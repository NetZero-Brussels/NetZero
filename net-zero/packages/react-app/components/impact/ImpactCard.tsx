import { ProfileCard } from "../profile/ProfileCard";
import React from "react";
import { WalletCard } from "../profile/WalletCard";
import { Button } from "@headlessui/react";
import FootPrintButton from "./FootPrintButton.";


export default function ImpactCard() {
    return (
        <div className="flex p-[12px] flex-col justify-center items-start gap-[24px] self-stretch border-[1px] border-[var(--divider,rgba(0,26,76,0.12))] bg-[var(--inherit-white-main,_#FFF)]">
            <ProfileCard />
            <WalletCard />
            <FootPrintButton />
        </div>
    )
}