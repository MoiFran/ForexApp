import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import "../newLetter.css";

const NewLetter = () => {
  const [dataNew, setDataNew] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula un retraso de 2 segundos antes de obtener la respuesta de la API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(
          "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=UTZGT3SW6V0TQMLQ"
        );
        setDataNew(response.data);
        setLoading(false); // Actualiza el estado para indicar que ya no está cargando
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Actualiza el estado para indicar que ya no está cargando
      }
    };

    fetchData();
  }, []);

  console.log(dataNew);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <p>
            Cargando...
            <Spinner animation="border" />
          </p>
        </div>
      ) : (
        <>
          {dataNew && dataNew.feed && dataNew.feed.length > 0 ? (
            dataNew.feed.map((item, index) => (
              <div className="news-item" key={index}>
                <img
                  className="news-image"
                  src={item.banner_image}
                  alt={item.title}
                />
                <a href={item.url} className="news-link">
                  <h2 className="news-title">{item.title.slice(0, 200)}...</h2>
                </a>
              </div>
            ))
          ) : (
            <p className="no-data-message">
              Ha ocurrido un error , intente de nuevo mas tarde.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default NewLetter;
