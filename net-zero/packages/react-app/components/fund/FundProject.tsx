// components/ProjectList.tsx
;
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, CircularProgressProps, CardActionArea } from '@mui/material';
import { projectsData, ProjectType } from './mock/mockProjects';
import Image from 'next/image';

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
    return (
        <div className='flex p-1 overflow-y-auto whitespace-nowrap snap-proximity snap-y'>
            {projectsData.map((project: ProjectType) => (
                <Card key={project.id} sx={{ minWidth: 300, m: 1 }}>
                    <CardActionArea>
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
                            <Box display="flex" alignItems="center" gap={2}>
                                <CircularProgressWithLabel value={project.progress} />
                                <Typography variant="body2" color="textSecondary">
                                    {project.supporters} supporters
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                {project.timeLeft}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}