// components/ProjectList.tsx
;
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, CircularProgressProps, CardActionArea } from '@mui/material';
import { projectsData, ProjectType } from './mock/mockProjects';
import Image from 'next/image';
import SupportButton from './SupportButton';
import { useWeb3 } from '@/contexts/useWeb3';
import { parseEther } from "viem";


interface CircularProgressWithLabelProps extends CircularProgressProps {
    value: number;
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = (props) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
};

export function FundingProjectList() {

    const {
        depositToUser,
        approveSpending,
    } = useWeb3();

    async function handleApproval() {
        try {
            const amountToDeposit = "1";
            const amountInWei = parseEther(amountToDeposit);
            const receipt = await approveSpending(amountInWei.toString());
            console.log("Approval done:", receipt);
        } catch (error) {
            console.error("Error approving spending:", error);
        }
    }

    async function handleDeposit() {
        try {
            const amountToDeposit = "1";
            const receipt = await depositToUser(amountToDeposit.toString());
            console.log("Deposited:", receipt);
        } catch (error) {
            console.error("Error depositing:", error);
        }
    }

    function donateProject() {
        handleApproval().then(() => handleDeposit());
    }

    return (
        <div className='flex p-1 overflow-y-auto whitespace-nowrap snap-proximity snap-y'>
            {projectsData.map((project: ProjectType) => (
                <Card key={project.id} sx={{ minWidth: 300, m: 1 }}>
                    <CardActionArea onClick={donateProject}>
                        <div className='h-[140px]'>
                            <Image
                                src={project.image}
                                alt={project.title}
                                layout="fill"
                                className='max-h-[140px]'
                                objectFit="cover"
                            />
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {project.title}
                            </Typography>
                            <div className='flex items-center justify-around gap-2 mb-3'>
                                <CircularProgressWithLabel value={project.progress} />
                                <Typography variant="body2" color="textSecondary">
                                    {project.supporters} supporters
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {project.timeLeft}
                                </Typography>
                            </div>

                            <SupportButton />
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}