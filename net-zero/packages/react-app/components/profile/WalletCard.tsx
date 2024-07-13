import React from "react";
import JazzIcon from "../../public/jazzicon.svg"
import Image from "next/image";


export function WalletCard() {
    return (
        <div className="flex flex-row h-[59px] p-[16px] items-center gap-[104px] self-stretch justify-between rounded-[6px] border-[1px] border-[var(--divider,rgba(0,26,76,0.12))]">
            <div className="flex flex-row items-center">
                <div id="icon" className="mr-3">
                    <Image src={JazzIcon} alt="Scan button"></Image>
                </div>
                <div id="walletandamount">

                    <div className="flex flex-row items-center">
                        <p className="mr-2">0x02da....q12sd</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                            <path d="M8.25 1H2.25C1.7 1 1.25 1.45 1.25 2V9H2.25V2H8.25V1ZM9.75 3H4.25C3.7 3 3.25 3.45 3.25 4V11C3.25 11.55 3.7 12 4.25 12H9.75C10.3 12 10.75 11.55 10.75 11V4C10.75 3.45 10.3 3 9.75 3ZM9.75 11H4.25V4H9.75V11Z" fill="#3C3C3C" fill-opacity="0.54" />
                        </svg>
                    </div>
                    <div id="" className="">
                        342.32 cUSD
                    </div>
                </div>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M12 8.5C13.1 8.5 14 7.6 14 6.5C14 5.4 13.1 4.5 12 4.5C10.9 4.5 10 5.4 10 6.5C10 7.6 10.9 8.5 12 8.5ZM12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5ZM12 16.5C10.9 16.5 10 17.4 10 18.5C10 19.6 10.9 20.5 12 20.5C13.1 20.5 14 19.6 14 18.5C14 17.4 13.1 16.5 12 16.5Z" fill="#3C3C3C" fill-opacity="0.54" />
                </svg>
            </div>
        </div>
    );
}