


import CategorySection from "../components/CategorySection";

import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarouse";

import Products from "../components/Products";

const Home = () => {
  return (
    < >
     <div className="bg-white">
       <HeroCarousel />
      <CategorySection />
   <Products></Products>
      <Footer />
     </div>
    </>
  );
};

export default Home;
