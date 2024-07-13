import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, CircularProgressProps } from '@mui/material';
import { projectsData, ProjectType } from './mock/mockProjects';

const SupportAgainButton = () => {
    return (
        <button className='border-2 border-[#A5D6BF] rounded-md px-1'>Support again</button>
    );
};


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

export default function Project() {
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={2} p={2} id={'projects'}>
            {projectsData.map((project: ProjectType) => (
                <Card key={project.id} sx={{ maxWidth: 345, }}>
                    <CardContent>
                        <h1 className='mb-2 font-[Futura] text-[20px] not-italic font-[450] leading-[28px]'>
                            {project.title}
                        </h1>
                        <CardMedia
                            component="img"
                            height="140"
                            image={project.image}
                            alt={project.title}
                            className='mb-2'
                        />
                        <div className='flex flex-row content-center justify-between mb-[-5px] mt-4'>
                            <CircularProgressWithLabel value={project.progress} />
                            <div className='flex flex-col '>
                                <p>{project.supporters} supporters</p>
                                <p>{project.timeLeft}</p>
                            </div>
                            <SupportAgainButton />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};
