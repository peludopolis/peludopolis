import React from 'react';
import { NavItem } from './constants';
import { Home, Sun, Calendar, Users, Lightbulb, MapPin } from 'lucide-react';

export const navItems: NavItem[] = [
    { href: '/', label: 'Inicio', soundKey: 'inicio', icon: React.createElement(Home, { size: 24, color: '#1DA1F2' }) },
    { href: '/servicesPets', label: 'Servicios', soundKey: 'servicios', icon: React.createElement(Sun, { size: 24, color: '#FF9900' }) },
    { href: '/appointments', label: 'Turnos', soundKey: 'turnos', icon: React.createElement(Calendar, { size: 24, color: '#28A745' }) },
    { href: '/comunity', label: 'Comunidad', soundKey: 'comunidad', icon: React.createElement(Users, { size: 24, color: '#FFC107' }) },
    { href: '/tips', label: 'Tips', soundKey: 'tips', icon: React.createElement(Lightbulb, { size: 24, color: '#DC3545' }) },
    { href: '/location', label: 'Ubicación', soundKey: 'turnos', icon: React.createElement(MapPin, { size: 24, color: '#1DA1A0' }) },
    { href: '/about', label: 'Nosotros', soundKey: 'nosotros', icon: React.createElement(Users, { size: 24, color: '#6F42C1' }) }
];

