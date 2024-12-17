"use client"; 

import React from 'react';
import Image from 'next/image';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                     <Image
                src="https://www.purina.com.bo/sites/default/files/styles/webp/public/2024-02/Imagen_error404_600x350.jpg.webp?itok=ZiNoTCRC" 
                alt="Error 404" 
                style={{ maxWidth: '30%', height: 'auto', margin: '0 auto', width: '100%' }}
                width={600}
                height={350}
            />
        </div>
    );
};

export default NotFound;
