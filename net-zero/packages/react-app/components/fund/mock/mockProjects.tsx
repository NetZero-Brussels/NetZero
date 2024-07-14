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
        title: 'Safe water project in Rwanda',
        image: '/image1.png',
        progress: 75,
        supporters: 120,
        timeLeft: '10 days left',
    },
    {
        id: 2,
        title: 'Africa cookstove project',
        image: '/image2.png',
        progress: 45,
        supporters: 80,
        timeLeft: '20 days left',
    },
    {
        id: 3,
        title: 'Zambia Safe Water',
        image: '/image3.png',
        progress: 60,
        supporters: 95,
        timeLeft: '15 days left',
    },
    {
        id: 4,
        title: 'Cookstove Project in DRC',
        image: '/image4.png',
        progress: 90,
        supporters: 150,
        timeLeft: '5 days left',
    },
    {
        id: 5,
        title: 'Protect the native forest',
        image: '/image5.png',
        progress: 30,
        supporters: 60,
        timeLeft: '25 days left',
    },
];
