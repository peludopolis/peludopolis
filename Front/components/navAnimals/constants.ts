// constants.ts


export const animalSounds = {
    servicios: '/sounds/dog-bark.mp3',
    turnos: '/sounds/cat-meow.mp3',
    foro: '/sounds/big-dog.mp3',
    about: '/sounds/cat-purr.mp3'
} as const;

export type SoundKey = keyof typeof animalSounds;

export interface NavItem {
    href: string;
    label: string;
    soundKey: SoundKey;
    icon: string;
}
