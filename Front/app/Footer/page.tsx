import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone, FaLightbulb, FaNewspaper, FaRegFileAlt } from 'react-icons/fa';

const Page = () => {
    return (
        <footer className="bg-gray-700 h-auto py-8 px-6 flex flex-col items-center gap-8 mt-4">
            <div className="flex flex-col items-start p-6 border border-gray-400 rounded-lg bg-gray-50 shadow-lg w-full">
                <div className="grid grid-cols-4 gap-6 mb-4 w-full">
                    <div className="flex items-center gap-2">
                        <FaPhone className="text-blue-500" size={24} />
                        <span className="text-lg font-semibold text-black">Contáctanos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaLightbulb className="text-yellow-500" size={24} />
                        <span className="text-lg font-semibold text-black">Tips</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaNewspaper className="text-red-500" size={24} />
                        <span className="text-lg font-semibold text-black">Noticias</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRegFileAlt className="text-green-500" size={24} />
                        <span className="text-lg font-semibold text-black">Políticas de la empresa</span>
                    </div>
                </div>

                <div>
                    <p className="text-lg font-semibold text-black">Teléfono:</p>
                    <p className="text-black mb-4">
                    <FaWhatsapp /><strong> 3513908198</strong>
                    </p>
                    <p className="text-lg font-semibold text-black">Trabaja con nosotros:</p>
                    <p>
                        <a href="mailto:peludopolispf@gmail.com" className="text-blue-600 hover:underline">
                            <strong>peludopolispf@gmail.com</strong>
                        </a>
                    </p>
                </div>
                
            </div>

            <div className="flex gap-6 justify-center w-full">
                <div className="shake-on-hover group">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <div className="relative group-hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.6)] transition duration-300 p-2 rounded-full">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                alt="Logo Facebook"
                                width={80}
                                height={80}
                                title="Facebook"
                            />
                        </div>
                    </a>
                </div>
                <div className="shake-on-hover group">
                    <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                        <div className="relative group-hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.6)] transition duration-300 p-2 rounded-full">
                            <img
                                src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png"
                                alt="Logo X"
                                width={80}
                                height={80}
                                title="X"
                            />
                        </div>
                    </a>
                </div>
                <div className="shake-on-hover group">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <div className="relative group-hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.6)] transition duration-300 p-2 rounded-full">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                                alt="Logo Instagram"
                                width={80}
                                height={80}
                                title="Instagram"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Page;
