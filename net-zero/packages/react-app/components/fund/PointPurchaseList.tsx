// components/ProjectList.tsx
;
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, CircularProgressProps, CardActionArea } from '@mui/material';
import { purchases, GreenTravelDiscount } from './mock/mockPoints';
import Image from 'next/image';


export function SpendButton() {
    return (
        <div className="flex px-[24px] py-[11px] flex-col justify-center items-center self-stretch bg-[#A5D6BF]">
            <p className="font-semibold">Spend your points</p>
        </div>
    )
}



export function PointPurchaseList() {
    return (
        <div className='flex p-1 overflow-y-auto whitespace-nowrap snap-proximity snap-y'>
            {purchases.map((project: GreenTravelDiscount) => (
                <Card key={project.id} sx={{ minWidth: 300, m: 1 }}>
                    <CardActionArea>
                        <div className='h-[140px]'>
                            <Image
                                src={project.photo}
                                alt={project.title}
                                layout="fill"
                                className='max-h-[140px]'
                                objectFit="cover"
                            />
                        </div>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {project.title}
                            </Typography>
                        </CardContent>
                        <SpendButton />
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}