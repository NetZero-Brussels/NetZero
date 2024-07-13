import IntroCard from "@/components/fund/IntroCard";
import { OngoingProjects } from "@/components/fund/OngoingProjects";
import { SpendPoints } from "@/components/fund/SpendPoints";


export default function Fund() {
    return (
        <div id="funding" className="flex flex-col gap-[32px] mb-16">
            <IntroCard />
            <OngoingProjects />
            <SpendPoints />
        </div>
    )
}