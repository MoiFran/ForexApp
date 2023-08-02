import { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import "../newLetter.css";

const TopGainesLoser = () => {
  const [dataTop, setDataTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=UTZGT3SW6V0TQMLQ"
      );
      // Simula un retraso de 1 segundo antes de actualizar el estado con la respuesta de la API
      setTimeout(() => {
        setDataTop(response.data);
        setLoading(false);
      }, 2000);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  console.log(dataTop);
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>TOP_GAINERS</h2>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>TOP_GAINERS</Accordion.Header>
          <Accordion.Body
            className="news-item container-new"
            style={{ margin: "5px" }}
          >
            {dataTop.top_gainers ? (
              dataTop.top_gainers.map((item, index) => (
                <div key={index}>
                  {["info"].map((variant) => (
                    <Alert key={variant} variant={variant}>
                      <h6> ticker: {item.ticker}</h6>
                      <h6>price: {item.price}</h6>
                      <h6>change_amount: {item.change_amount}</h6>
                      <h6>change_percentage: {item.change_percentage}</h6>
                      <h6>volume: {item.volume}</h6>
                    </Alert>
                  ))}
                </div>
              ))
            ) : (
              <p>No hay datos disponibles para TOP GAINERS</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>TOP_LOSERS</Accordion.Header>
          <Accordion.Body>
            {dataTop.top_losers ? (
              dataTop.top_losers.map((item, index) => (
                <div key={index}>
                  {["danger"].map((variant) => (
                    <Alert key={variant} variant={variant}>
                      <h6> ticker: {item.ticker}</h6>
                      <h6>price: {item.price}</h6>
                      <h6>change_amount: {item.change_amount}</h6>
                      <h6>change_percentage: {item.change_percentage}</h6>
                      <h6>volume: {item.volume}</h6>
                    </Alert>
                  ))}
                </div>
              ))
            ) : (
              <p>No hay datos disponibles para TOP LOSERS</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Most Actively</Accordion.Header>
          <Accordion.Body>
            {dataTop.most_actively_traded ? (
              dataTop.most_actively_traded.map((item, index) => (
                <div key={index}>
                  {["warning"].map((variant) => (
                    <Alert key={variant} variant={variant}>
                      <h6> ticker: {item.ticker}</h6>
                      <h6>price: {item.price}</h6>
                      <h6>change_amount: {item.change_amount}</h6>
                      <h6>change_percentage: {item.change_percentage}</h6>
                      <h6>volume: {item.volume}</h6>
                    </Alert>
                  ))}
                </div>
              ))
            ) : (
              <p>No hay datos disponibles para Most Actively</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default TopGainesLoser;
