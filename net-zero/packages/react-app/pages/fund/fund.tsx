import IntroCard from "@/components/fund/IntroCard";
import { OngoingProjects } from "@/components/fund/OngoingProjects";


export default function Fund() {
    return (
        <div id="funding" className="flex flex-col gap-[32px] mb-16">
            <IntroCard />
            <OngoingProjects />
        </div>
    )
}