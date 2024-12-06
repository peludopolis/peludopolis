// SoundToggle.tsx
"use client";

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
    isSoundEnabled: boolean;
    toggleSound: () => void;
}

const SoundToggle: React.FC<Props> = ({ isSoundEnabled, toggleSound }) => (
    <div className="ml-6">
        <button
            onClick={toggleSound}
            className="
                bg-gray-100 
                p-2 
                rounded-full 
                hover:bg-gray-200 
                transition 
                duration-300 
                shadow-md
                flex 
                items-center 
                justify-center
            "
            aria-label={isSoundEnabled ? "Silenciar sonidos" : "Activar sonidos"}
        >
            {isSoundEnabled ? (
                <Volume2 className="text-gray-700" />
            ) : (
                <VolumeX className="text-gray-700 line-through" />
            )}
        </button>
    </div>
);

export default SoundToggle;
