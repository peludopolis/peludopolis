import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="flex flex-col min-h-[10vh]">
      <main className="flex-grow"></main>

      <footer className="bg-gray-700 h-[100px] flex items-center justify-center mt-8">
        <div className="shake-on-hover">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://images.vexels.com/media/users/3/140168/isolated/preview/7ddc26f9e729cd633ae3dd4c692a04db-icono-redondo-distorsionado-de-facebook.png"
              alt="Logo Facebook"
              width={100}
              height={100}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Page;
