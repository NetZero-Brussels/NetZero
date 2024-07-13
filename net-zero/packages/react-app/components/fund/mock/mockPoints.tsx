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
        title: 'Free Bicycle Rentals',
        photo: '/images/bicycle-rentals.jpg',
    },
    {
        id: 3,
        title: '30% Sustainable Tours',
        photo: '/images/sustainable-tours.jpg',
    },
    {
        id: 4,
        title: 'Green Experiences',
        photo: '/images/green-experiences.jpg',
    },
];