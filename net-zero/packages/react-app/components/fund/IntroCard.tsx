export default function IntroCard() {
    return (
        <div className="flex h-fit p-[24px] flex-col justify-center items-start gap-[24px] self-stretch border-[1px] border-[var(--divider,rgba(0,26,76,0.12))] bg-[var(--inherit-white-main,_#FFF)]">
            <div className='text-[24px] not-italic font-medium leading-[32px] font-[Futura] gap-2'>
                <h1>Fund a project</h1>
                <p>Your all-in-one carbon offset solution.</p>
            </div>
            <div>
                <p className='font-normal'>Net Zero helps create a sustainable future by enabling individuals to reach carbon neutrality. We track users' transportation activities to reward them with points and offer crowdfunding projects to offset their carbon footprints.</p>
            </div>
        </div>
    )
}