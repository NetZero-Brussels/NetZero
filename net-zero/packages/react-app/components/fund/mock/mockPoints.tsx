// data/greenTravelDiscounts.ts

export interface GreenTravelDiscount {
    id: number;
    title: string;
    photo: string;
}

export const purchases: GreenTravelDiscount[] = [
    {
        id: 1,
        title: '50% off Eurostar tickets',
        photo: '/spend1.png',
    },
    {
        id: 2,
        title: 'Deutsche bahn 25% off',
        photo: '/spend2.jpg',
    },
    {
        id: 3,
        title: 'ÖBB 5 Euro off',
        photo: '/spend3.png',
    },
    {
        id: 4,
        title: 'Green travel adventure',
        photo: '/spend4.png',
    },
];