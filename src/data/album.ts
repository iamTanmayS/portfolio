/**
 * Album Data
 * 
 * Photos for the Album/Gallery section.
 * Replace placeholder URLs with your actual photos.
 */

export interface AlbumPhoto {
    id: string;
    url: string;
    alt: string;
    caption?: string;
    category: 'achievement' | 'event' | 'milestone' | 'personal';
}

export const albumPhotos: AlbumPhoto[] = [
    {
        id: 'hackathon-win',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        alt: 'Hackathon winning moment',
        caption: 'First place at the 2024 Hackathon',
        category: 'achievement',
    },
    {
        id: 'conference-talk',
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
        alt: 'Speaking at a tech conference',
        caption: 'Sharing thoughts on modern architecture',
        category: 'event',
    },
    {
        id: 'team-celebration',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        alt: 'Team celebration after product launch',
        caption: 'Celebrating a successful launch',
        category: 'milestone',
    },
    {
        id: 'workspace',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        alt: 'My development workspace',
        caption: 'Where the magic happens',
        category: 'personal',
    },
    {
        id: 'graduation',
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        alt: 'Graduation ceremony',
        caption: 'Graduating with honors',
        category: 'milestone',
    },
    {
        id: 'workshop-leading',
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        alt: 'Leading a technical workshop',
        caption: 'Teaching React to beginners',
        category: 'event',
    },
    {
        id: 'hiking-adventure',
        url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        alt: 'Weekend hiking adventure',
        caption: 'Finding balance outside the screen',
        category: 'personal',
    },
    {
        id: 'award-ceremony',
        url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&q=80',
        alt: 'Receiving an award',
        caption: 'Recognition for open source contributions',
        category: 'achievement',
    },
];

export const getPhotosByCategory = (category: string) =>
    category === 'all' ? albumPhotos : albumPhotos.filter(p => p.category === category);
