import React from "react";
import Carousel from "react-bootstrap/Carousel";
import stockTradingImage from "../img/stock-trading-g842110306_1280.jpg";
import stockTradingImage2 from "../img/hands-g27c88de70_1280.jpg";
import stockTradingImage3 from "../img/stock-exchange-g8599b1330_1280.jpg";
import stockTradingImage4 from "../img/stock-gb70cc2ff0_1280.jpg";
import stockTradingImage5 from "../img/businessman-gfd74e3cd3_1280.jpg";

const Banner = () => {
  const imagePaths = [
    stockTradingImage,
    stockTradingImage2,
    stockTradingImage3,
    stockTradingImage4,
    // Agrega aquí todas las rutas de tus imágenes en la carpeta "img"
  ];

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stockTradingImage}
            style={{
              height: "50vh",
              objectFit: "cover",
              width: "auto",
            }} // Estilo para ajustar la altura al 30% de la ventana (30vh)
          />
          <Carousel.Caption>
            <h3>Forex Exchange </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stockTradingImage5}
            style={{
              height: "50vh",
              objectFit: "cover",
              width: "auto",
            }} // Estilo para ajustar la altura al 30% de la ventana (30vh)
          />
          <Carousel.Caption>
            <h3>Stock NewsLetter </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stockTradingImage3}
            style={{
              height: "50vh",
              objectFit: "cover",
              width: "auto",
            }} // Estilo para ajustar la altura al 30% de la ventana (30vh)
          />
          <Carousel.Caption>
            <h3>Top Gainers and Losers </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stockTradingImage4}
            style={{
              height: "50vh",
              objectFit: "cover",
              width: "auto",
            }} // Estilo para ajustar la altura al 30% de la ventana (30vh)
          />
          <Carousel.Caption>
            <h3>Global Quote </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
