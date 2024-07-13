import React from "react";
import ProjectList from "./ProjectList";

export function SupportedProjects() {
    return (
        <div className="flex flex-col items-start gap-[8px] self-stretch">
            <div className='text-[24px] not-italic font-medium leading-[32px] font-[Futura]'>
                <h1>Supported projects</h1>
            </div>
            <div>
                <p className='font-normal'>Check the Projects you have supported.</p>
            </div>
            <ProjectList />
        </div>
    );
}