import Link from "next/link";

const Hero = () => {
    return (
        <header className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white h-48 sm:h-56 md:h-64 lg:h-72 flex flex-col items-center justify-center rounded-xl sm:rounded-2xl my-2 sm:my-3 overflow-hidden">
            {/* Imagen de fondo con overlay más oscuro para mejor legibilidad */}
            <div 
                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" 
                style={{ 
                    backgroundImage: "url('https://source.unsplash.com/1600x900/?shopping')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>
            
            <div className="relative z-10 text-center px-3 sm:px-4 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
                    Bienvenido a <span className="font-fun">Peludópolis!</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
                    Hoy es un gran día para consentir a tu mascota, encuentra el mejor servicio para él!
                </p>
                <Link
                    href="/servicesPets"
                    className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white text-indigo-600 rounded-full text-lg sm:text-xl font-semibold hover:bg-indigo-600 hover:text-white transition duration-300 shadow-lg hover:shadow-xl"
                >
                    Ir a los servicios
                </Link>
            </div>
        </header>
    );
};

export default Hero;