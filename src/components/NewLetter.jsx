import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import "../newLetter.css";

const NewLetter = () => {
  const moreTickers = [
    "GOOGL",
    "FB",
    "AMZN",
    "TSLA",
    "NVDA",
    "AMD",
    "BABA",
    "INTC",
    "BA",
    "JPM",
    "WMT",
    "UNH",
    "PG",
    "KO",
    "MSFT",
    "MA",
    "V",
    "UNP",
    "VZ",
    "XOM",
    "JNJ",
    "WMT",
    "HD",
    "TGT",
    "AXP",
    "CVX",
    "DIS",
    "CSCO",
    "MMM",
    "INTC",
    "PG",
    "VZ",
    "UNH",
    "KO",
    "GE",
    "IBM",
    "WFC",
    "GS",
    "AAPL",
  ];
  const tickers = [...moreTickers];

  const [dataNew, setDataNew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState();

  const fetchData = async () => {
    try {
      // Simula un retraso de 2 segundos antes de obtener la respuesta de la API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=UTZGT3SW6V0TQMLQ`
      );
      setDataNew(response.data);
      setLoading(false); // Actualiza el estado para indicar que ya no está cargando
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Actualiza el estado para indicar que ya no está cargando
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSymbol(event.target.value);
    fetchData();
  };
  console.log(symbol);
  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(null);
    fetchData();
  };

  return (
    <div className="body">
      <div className="select-container">
        <select value={symbol} onChange={handleChange}>
          <option value="">Selecciona un ticker</option>
          <option value="AAPL">Apple</option>
          <option value="MSFT">Microsoft</option>
          <option value="GOOGL">Google</option>
          <option value="FB">Facebook</option>
          <option value="AMZN">Amazon</option>
          <option value="TSLA">Tesla</option>
        </select>
        <br />
        <Button onClick={handleSubmit}>Buscar</Button>
      </div>
      <div className="container-new">
        {loading ? (
          <div className="loading-container">
            <p>
              <Placeholder xs={6} />
              <Placeholder className="w-75" />{" "}
              <Placeholder style={{ width: "50%" }} />
              <Spinner animation="border" />
            </p>
          </div>
        ) : (
          <>
            {dataNew && dataNew.feed && dataNew.feed.length > 0 ? (
              dataNew.feed.map((item, index) => (
                <div className="news-item" key={index}>
                  <img
                    src={item.banner_image}
                    alt={item.title}
                    className="news-image"
                  />

                  <OverlayTrigger
                    placement="top"
                    delay={{ hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip">{item.title}</Tooltip>
                    }
                  >
                    <Card.Title style={{ color: "#ffff" }}>
                      {item.title.slice(0, 100)}...
                    </Card.Title>
                  </OverlayTrigger>

                  <a href={item.url}>
                    <Button
                      style={{
                        borderRadius: "2px",
                        marginTop: "0.5rem",
                        backgroundColor: "#00d4ff",
                      }}
                    >
                      {" "}
                      More ...
                    </Button>
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
    </div>
  );
};

export default NewLetter;
