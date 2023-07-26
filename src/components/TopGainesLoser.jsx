import { useState, useEffect } from "react";
import axios from "axios";

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
      {dataTop.top_gainers ? (
        dataTop.top_gainers.map((item, index) => (
          <div key={index}>
            <ul>
              <li> ticker: {item.ticker}</li>
              <li>price: {item.price}</li>
              <li>change_amount: {item.change_amount}</li>
              <li>change_percentage:{item.change_percentage}</li>
              <li>volume: {item.volume}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No hay datos disponibles para TOP GAINERS</p>
      )}

      <h2>TOP_LOSERS</h2>
      {dataTop.top_losers ? (
        dataTop.top_losers.map((item, index) => (
          <div key={index}>
            <ul>
              <li> ticker:{item.ticker}</li>
              <li>price: {item.price}</li>
              <li>change_amount: {item.change_amount}</li>
              <li>change_percentage: {item.change_percentage}</li>
              <li>volume: {item.volume}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No hay datos disponibles para TOP LOSERS</p>
      )}

      <h2>Most Actively</h2>
      {dataTop.most_actively_traded ? (
        dataTop.most_actively_traded.map((item, index) => (
          <div key={index}>
            <ul>
              <li> ticker: {item.ticker}</li>
              <li>price: {item.price}</li>
              <li>change_amount: {item.change_amount}</li>
              <li>change_percentage: {item.change_percentage}</li>
              <li>volume: {item.volume}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No hay datos disponibles para Most Actively</p>
      )}
    </div>
  );
};

export default TopGainesLoser;
