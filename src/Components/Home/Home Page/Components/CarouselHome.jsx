import React  from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../../../../public/image Hero/image1.png'
import image2 from '../../../../../public/image Hero/image2.png'
import image3 from '../../../../../public/image Hero/image3.png'

function CarouselHome() {

   const handleExploreMore = () => {
    const nextSection = document.getElementById('explore-more-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };
  
  return (
      <div>
        <Carousel  autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img src={image1} alt="carousel 1" />
      </div>
      <div>
        <img src={image2} alt="carousel 2" />
      </div>
      <div>
        <img src={image3} alt="carousel 3" />
      </div>
    </Carousel>
    <div className='grid justify-center'><button className='cursor-pointer text-semibold rounded-3xl md:py-3 py-1 md:px-5 px-2 bg-blue-500 my-5 text-white hover:bg-white hover:blue-500 hover:text-blue-500' onClick={handleExploreMore}>Explore More</button></div>
    </div>
  );
}

export default CarouselHome;
