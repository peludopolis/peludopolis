// constants.ts

import { ReactNode } from "react";

export const animalSounds = {
    inicio: '/sounds/big-dog.mp3',
    servicios: '/sounds/cat-meow.mp3',
    turnos: '/sounds/dog-bark.mp3',
    comunidad: '/sounds/cat-purr.mp3',
    tips: '/sounds/small-dog.mp3',
    nosotros: '/sounds/small-cat.mp3'
} as const;

export type SoundKey = keyof typeof animalSounds;

export interface NavItem {
    href: string;
    label: string;
    soundKey: SoundKey;
    icon: ReactNode;
}
