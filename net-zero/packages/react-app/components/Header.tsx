// @ts-nocheck
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NetZeroIcon from "../public/NetZeroIcon.svg";
import Image from 'next/image';


export default function Header() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="flex w-full px-[80px] py-0 pt-4 justify-center items-center gap-[12px]">
            <div className="">
              <Image className="w-[42px] " priority src={NetZeroIcon} alt="NetZero Icon"></Image>
            </div>
            <div className="text-center font-[futura] text-[32px] not-italic font-bold leading-[48px] text-[#A5D6BF]">
              <h1>Net Zero</h1>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

declare global {
  interface Window {
    ethereum: any;
  }
}
