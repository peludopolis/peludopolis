// src/navItems.ts

import { NavItem } from './constants';

export const navItems: NavItem[] = [
    { href: '/servicesPets', label: 'Servicios', soundKey: 'servicios', icon: '🐶' },
    { href: '/appointments', label: 'Turnos', soundKey: 'turnos', icon: '🐱' },
    { href: '/comunity', label: 'Comunidad', soundKey: 'foro', icon: '🐕‍🦺' },
    { href: '/tips', label: 'Tips', soundKey: 'about', icon: '😽' },
    { href: '/about', label: 'Nosotros', soundKey: 'about', icon: '🐈‍⬛' },
];
