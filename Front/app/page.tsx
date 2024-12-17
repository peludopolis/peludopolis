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
      <PostMocks />
      <PostButtons />
    </>
  );
}
