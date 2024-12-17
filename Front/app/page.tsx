import Hero from '../components/Hero/Hero';
import Slider from '../components/Slider/Slider';
import ServicesPets from "../components/ServicesPets/page";
import PostMocks from "../components/post/PostMocks";
import PostButtons from "../components/post/PostButtons";

export default function Home() {
  return (
    <>
      <Hero />
      <Slider />
      <ServicesPets />
      <h1 className="text-center font-title text-primary text-2xl font-extrabold sm:text-3xl m-4">
        Experiencias de nuestros clientes
      </h1>
      <PostMocks />
      <PostButtons />
    </>
  );
}
