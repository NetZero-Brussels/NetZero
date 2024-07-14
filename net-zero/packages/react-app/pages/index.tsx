import React from "react";
import bg from "../../react-app/public/bg.jpg";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="absolute inset-0 z-[-1]">
        <Image src={bg} alt="bg" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center bg-white bg-opacity-80 px-8 py-4 rounded-lg gap-8">
        <h1 className="text-4xl font-bold">Net Zero</h1>


        <p className="text-center text-[24px] not-italic font-medium leading-[32px]">A web3 app that helps neutralize your carbon footprint and offers sustainable products to offset carbon emissions.</p>

        {/* redirect button to /register */}
        <Link href='/register' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full items-center text-center">
          Get Started
        </Link>


      </div>
    </div>
  );
}