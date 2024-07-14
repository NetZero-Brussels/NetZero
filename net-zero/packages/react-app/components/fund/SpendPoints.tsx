import { FundingProjectList } from "./FundingProjects";
import { PointPurchaseList } from "./PointPurchaseList";

export function SpendPoints() {
    return (
        <div>
            <div className="flex flex-col items-start gap-[8px] self-stretch">
                <div className='text-[24px] not-italic font-medium leading-[32px] font-[Futura]'>
                    <h1>Spend points on green travels</h1>
                </div>
                <div>
                    <p className='font-normal'>Net Zero collaborates with sustainable public transportation companies and rental bike services, allowing users to spend points on discounted tickets or bike rentals.</p>
                </div>
            </div>
            <PointPurchaseList />
        </div>
    )
}