
import React from 'react';
import avatar from '../../public/avatar.svg';
import Image from 'next/image';
import ScanButton from "../../public/scanbutton.svg"

export function ProfileCard() {
    return (
        <>
            <div className="flex flex-col items-start gap-[12px] self-stretch ">
                <div className='flex flex-row px-[5px] py-[8px] gap-[24px] justify-between w-full'>
                    <div id='profilePoints' className=' w-54 h-54'>
                        <div id='icon' className=''>
                            <Image priority src={avatar} alt="User's avatar"></Image>
                        </div>
                    </div>

                    <div id='namePoints' className='inline-flex flex-col items-start gap-[2px] ml-[-75px]'>
                        <div className='text-[20px] not-italic font-semibold leading-[30px] text-[#3C3C3C]'>
                            Rakkun.eth🤘
                        </div>
                        <div className='text-[14px] not-italic font-semibold leading-[22px] text-[#FBC02D]'>
                            320 points
                        </div>
                    </div>

                    <div id='streak' className='flex w-[56px] h-[32px] items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M22.6666 13.9067V2.66667H9.33325V13.9067C9.33325 14.3733 9.57325 14.8133 9.98658 15.0533L15.5599 18.4L14.2399 21.52L9.69325 21.9067L13.1466 24.8933L12.0933 29.3333L15.9999 26.9733L19.9066 29.3333L18.8666 24.8933L22.3199 21.9067L17.7733 21.52L16.4533 18.4L22.0266 15.0533C22.4266 14.8133 22.6666 14.3867 22.6666 13.9067ZM14.6666 14.76L11.9999 13.16V5.33334H14.6666V14.76ZM19.9999 13.16L17.3333 14.76V5.33334H19.9999V13.16Z" fill="#FCD062" />
                        </svg>
                        <p className='font-bold'> 42</p>

                    </div>

                </div>

                <div className='flex justify-between px-[5px] items-center self-stretch '>
                    <div className='text-[#656565]'>
                        Junior marketeer

                    </div>
                    <Image priority src={ScanButton} alt="Edit profile"></Image>

                </div>
            </div>
        </>
    );
};



