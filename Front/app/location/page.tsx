const page = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">Ubicación</h1>
            <p className="text-lg mb-2 text-black">Visítanos en nuestra dirección ficticia:</p>
            <p className="text-lg font-semibold mb-6 text-black">
                Calle ficticia, Rosario, Santa Fe, Argentina
            </p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.048080802836!2d-60.650539825803066!3d-32.957086676873295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab03c3aaf9ff%3A0x2e2b4adf485b518c!2sRosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="600"
                height="450"
                className="border rounded-lg shadow-lg"
                allowFullScreen={true}
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default page;
