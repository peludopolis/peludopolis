"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SoundKey } from "./constants";

interface Props {
    href: string;
    label: string;
    soundKey: SoundKey;
    icon: ReactNode;
    isSoundEnabled: boolean;
    playSound: (soundKey: SoundKey) => void;
}

const NavItem: React.FC<Props> = ({ href, label, soundKey, icon, isSoundEnabled, playSound }) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Evita la redirección automática
        if (isSoundEnabled) playSound(soundKey);

        setTimeout(() => {
            router.push(href); // Navega después del retraso
        }, 1200); // 1000 ms = 1 segundo
    };

    return (
        <div className="relative group">
            <Link
                href={href}
                onClick={handleClick}
                onMouseEnter={() => {
                    if (isSoundEnabled) playSound(soundKey);
                }}
                className="
          flex items-center h-full 
          text-gray-700 
          hover:text-blue-400 
          transition duration-300 
          transform 
          hover:scale-110 
          hover:font-semibold
          px-3 py-2
        "
            >
                <span className="mr-2 text-xl">{icon}</span>
                {label}
            </Link>

            <span
                className="
          absolute 
          bottom-0 
          left-0 
          h-1 
          bg-blue-400
          origin-left 
          scale-x-0 
          group-hover:scale-x-100 
          transition-transform 
          duration-300
        "
                style={{ width: "100%" }}
            />
        </div>
    );
};

export default NavItem;

