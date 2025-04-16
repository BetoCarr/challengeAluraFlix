import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./StyleSlider.css"

// Definición del componente funcional MySlider
function MySlider ({ children }) {

    // Configuración de las opciones del slider usando el paquete react-slick
    const settings = {
        dots: true, // Muestra los puntos indicadores de posición
        infinite: children.length > 3, // Permite el desplazamiento infinito si hay más de 3 elementos
        speed: 500, // Velocidad de animación en milisegundos
        slidesToShow: 3, // Número de elementos que se muestran a la vez
        slidesToScroll: 1 // Número de elementos que se desplazan al hacer clic en las flechas
    };

    // Retorna la estructura del componente
    return (
        <Slider {...settings} className="custom-slider">
            {children}
        </Slider>
    );
}

// Exporta el componente MySlider para su uso en otras partes de la aplicación
export default MySlider;