import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import CategorySection from "../components/CategorySection";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <CategorySection />
      <ProductList />
      <Footer />
    </>
  );
};

export default Home;
