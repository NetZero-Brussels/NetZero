import react from 'react';
import LeaderboardSelect from './TeamSelect';

export default function LeaderboardCard() {
    return (
        <div className="flex flex-col items-start gap-[8px] self-stretch">
            <div className='text-[24px] not-italic font-medium leading-[32px] font-[Futura]'>
                <h1>Leaderboard</h1>
            </div>
            <div>
                <p className='font-normal'>Compete with other planet savers to offset your footprint.</p>
            </div>
            <LeaderboardSelect />
        </div>

    );
};