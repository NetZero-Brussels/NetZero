import { useEffect, useState } from 'react';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { ContributionCard } from '../../components/profile/ContributionCard';
import { InfoCard } from '../../components/profile/InfoCard';
import { WalletCard } from '../../components/profile/WalletCard';

const Profile = () => {

    return (
        <div className='flex flex-col gap-[32px]'>
            <ProfileCard />
            <WalletCard />
            <InfoCard />
            <ContributionCard />
        </div>
    );
};

export default Profile;