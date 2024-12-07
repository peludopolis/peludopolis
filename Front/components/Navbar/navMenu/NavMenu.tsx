"use client";

import React, { useState, useRef, useEffect } from "react";
import { animalSounds } from "./constants";
import { navItems } from "./navItems";
import NavItemComponent from "./NavItem";
import SoundToggle from "./SoundToggle";
import { Menu, X } from "lucide-react";

const NavMenu: React.FC = () => {
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado del menú móvil
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

    useEffect(() => {
        Object.entries(animalSounds).forEach(([key, src]) => {
            const audio = new Audio(src);
            audioRefs.current[key] = audio;
        });
    }, []);

    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const playSound = (soundKey: keyof typeof animalSounds) => {
        if (!isSoundEnabled) return;
        Object.values(audioRefs.current).forEach((audio) => audio?.pause());
        const audio = audioRefs.current[soundKey];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch((error) => {
                console.warn("Error al reproducir sonido:", error);
            });
        }
    };

    return (
        <nav className="md:bg-white shadow-lg relative font-fun rounded-lg">

            {/* Contenedor general */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-around h-16 items-center">


                    {/* Menú hamburguesa (visible en pantallas medianas y más pequeñas) */}
                    <button
                        onClick={toggleMobileMenu}
                        className="block md:hidden bg-gray-100 p-2 rounded-md focus:outline-none hover:bg-gray-200 shadow-lg"
                        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Menú de navegación (pantallas grandes) */}
                    <div className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <NavItemComponent
                                key={item.href}
                                {...item}
                                isSoundEnabled={isSoundEnabled}
                                playSound={playSound}
                            />
                        ))}
                    </div>
                    {/* Controles del sonido */}
                    <SoundToggle isSoundEnabled={isSoundEnabled} toggleSound={toggleSound} />
                </div>

                {/* Menú desplegable (pantallas pequeñas) */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-2 space-y-2">
                        {navItems.map((item) => (
                            <NavItemComponent
                                key={item.href}
                                {...item}
                                isSoundEnabled={isSoundEnabled}
                                playSound={playSound}
                            />
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavMenu;


