import React from "react";
import ImpactCard from "../../components/impact/ImpactCard";
import LeaderboardCard from "../../components/impact/LeaderboardCard";
import { SupportedProjects } from "../../components/impact/SupportedProjects";

export default function Impact() {

    return (
        <>
            <ImpactCard />
            <LeaderboardCard />
            <SupportedProjects />
        </>
    )
}