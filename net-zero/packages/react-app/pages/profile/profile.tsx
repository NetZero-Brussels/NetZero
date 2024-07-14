import { useEffect, useState } from 'react';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { ContributionCard } from '../../components/profile/ContributionCard';
import { InfoCard } from '../../components/profile/InfoCard';
import { WalletCard } from '../../components/profile/WalletCard';

const Profile = () => {

    return (
        <div className='flex flex-col gap-[32px] mb-16'>
            <ProfileCard />
            <WalletCard />
            <InfoCard />
            <ContributionCard />
        </div>
    );
};

export default Profile;