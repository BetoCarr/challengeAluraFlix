import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./StyleSlider.css"


function MySlider ({ children }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="slider-container ">
            <Slider {...settings} className="custom-slider">
                {children}
            </Slider>
        </div>

    );
}

export default MySlider;
