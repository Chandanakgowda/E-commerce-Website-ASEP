import Hero from "../components/Hero";
import Latestcollection from "../components/Latestcollection";
import Ourpolicy from "../components/Ourpolicy";
import Newslaterbox from "../components/Newslaterbox";
import ShopByCategory from "@/components/ShopByCategory";

const Home = () => {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <Latestcollection />
      <Ourpolicy />
      <Newslaterbox />
    </>
  );
};
export default Home;
