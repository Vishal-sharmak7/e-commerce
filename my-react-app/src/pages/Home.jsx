import Header from "../components/Header";
import Hero from "../components/Hero";
import MiddleSection from "../components/MiddleSection";
import Shop from "../components/Shop";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <MiddleSection /> 
      <Shop limit={4} />
    </>
  );
};

export default Home;
