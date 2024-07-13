import { FundingProjectList } from "./FundProject";

export function OngoingProjects() {
    return (
        <div>
            <div className="flex flex-col items-start gap-[8px] self-stretch">
                <div className='text-[24px] not-italic font-medium leading-[32px] font-[Futura]'>
                    <h1>On going projects</h1>
                </div>
                <div>
                    <p className='font-normal'>Offset your footprint today by donating as low as 1 cUSD.</p>
                </div>
            </div>
            <FundingProjectList />
        </div>
    )
}