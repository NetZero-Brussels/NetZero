// components/ProjectList.tsx
;
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, CircularProgressProps } from '@mui/material';
import { projectsData, ProjectType } from './mock/mockProjects';

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
        <Box p={2}>
            <div className='flex overflow-x-auto p-1'>
                {projectsData.map((project: ProjectType) => (
                    <Card key={project.id} sx={{ minWidth: 300, m: 1 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={project.image}
                            alt={project.title}
                        />
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
                    </Card>
                ))}
            </div>
        </Box>
    );
};