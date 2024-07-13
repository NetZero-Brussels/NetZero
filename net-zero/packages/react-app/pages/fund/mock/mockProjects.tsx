// data/mockProjects.ts
export interface ProjectType {
    id: number;
    title: string;
    image: string;
    progress: number;
    supporters: number;
    timeLeft: string;
}

export const projectsData: ProjectType[] = [
    {
        id: 1,
        title: 'Project Alpha',
        image: '/images/project-alpha.jpg',
        progress: 75,
        supporters: 120,
        timeLeft: '10 days left',
    },
    {
        id: 2,
        title: 'Project Beta',
        image: '/images/project-beta.jpg',
        progress: 45,
        supporters: 80,
        timeLeft: '20 days left',
    },
    {
        id: 3,
        title: 'Project Gamma',
        image: '/images/project-gamma.jpg',
        progress: 60,
        supporters: 95,
        timeLeft: '15 days left',
    },
    {
        id: 4,
        title: 'Project Delta',
        image: '/images/project-delta.jpg',
        progress: 90,
        supporters: 150,
        timeLeft: '5 days left',
    },
    {
        id: 5,
        title: 'Project Epsilon',
        image: '/images/project-epsilon.jpg',
        progress: 30,
        supporters: 60,
        timeLeft: '25 days left',
    },
];
