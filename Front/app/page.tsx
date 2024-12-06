import Hero from '../components/Hero/Hero';
import ServicesPets from "../components/ServicesPets/page"

export default function Home() {
  return (
    <>
    <h1 className="text-3xl font-bold text-center text-gray-800 mt-10">Home</h1>
    <Hero/>
    
    <ServicesPets/>
    </>
    )
}