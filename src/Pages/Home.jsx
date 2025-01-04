import { Toaster } from "@/Components/ui/toaster";
import { LightBox } from "../Components/LightBox";
import { Hero } from "../Components/Hero";
import product1 from "../Assets/img/image-product-1.jpg";
import product2 from "../Assets/img/image-product-2.jpg";
import product3 from "../Assets/img/image-product-3.jpg";
import product4 from "../Assets/img/image-product-4.jpg";
import product1_thumbNail from "../Assets/img/image-product-1-thumbnail.jpg";
import product2_thumbNail from "../Assets/img/image-product-2-thumbnail.jpg";
import product3_thumbNail from "../Assets/img/image-product-3-thumbnail.jpg";
import product4_thumbNail from "../Assets/img/image-product-4-thumbnail.jpg";

export const Home = () => {
  return (
    <>
      <main className="overflow-x-hidden lg:container mx-auto  px-0 sm:px-4 md:px-8 lg:px-12">
        <Toaster />
        {/* <NavBar /> */}
        <div className="md:grid md:grid-cols-2 md:gap-8  lg:gap-24 lg:max-w-7xl mx-auto items-start py-0 sm:py-8 md:py-12">
          <LightBox
            product1={product1}
            product2={product2}
            product3={product3}
            product4={product4}
            product1_thumbNail={product1_thumbNail}
            product2_thumbNail={product2_thumbNail}
            product3_thumbNail={product3_thumbNail}
            product4_thumbNail={product4_thumbNail}
          />

          <div className=" lg:mt-15 xl:mt-20 ">
            <Hero />
          </div>
        </div>
      </main>
    </>
  );
};
