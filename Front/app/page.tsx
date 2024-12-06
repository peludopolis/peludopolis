import Hero from '../components/Hero/Hero';
import Slider from '../components/Slider/Slider'; // Asegúrate de que la ruta sea la correcta

export default function Home() {
  return (
    <>
      <Hero />
      <Slider />
      <h1 className="text-center text-4xl font-bold text-gray-100 mt-8">Home Peludopolis</h1>
    </>
  );
}
