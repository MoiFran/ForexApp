import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styleForex.css";
import Spinner from "react-bootstrap/Spinner";

const Forex = () => {
  const currenciesList = [
    "AUD",
    "CAD",
    "CHF",
    "DKK",
    "EUR",
    "GBP",
    "JPY",
    "NOK",
    "NZD",
    "USD",
  ];

  const { register, handleSubmit, setValue } = useForm();
  const [currencyInfo, setCurrencyInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const { from_currency, to_currency } = data;
    const apiUrl = "https://www.alphavantage.co/query";
    const apiKey = "UTZGT3SW6V0TQMLQ";
    const params = {
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency,
      to_currency,
      apikey: apiKey,
    };

    try {
      const response = await axios.get(apiUrl, { params });
      const exchangeRateData = response.data["Realtime Currency Exchange Rate"];
      setCurrencyInfo(exchangeRateData);
      setLoading(false);
      console.log(currencyInfo);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error al obtener la tasa de cambio:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(currencyInfo).length > 0) {
      setLoading(false);
    }
  }, [currencyInfo]);

  return (
    <div className="container">
      <h1 className="header color1">Consulta de Divisas Forex</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fromCurrency" className="label color2">
          Seleccionar divisa origen:
        </label>
        <select
          id="fromCurrency"
          {...register("from_currency")}
          className="select color3"
        >
          <option>From Currency</option>
          {currenciesList.map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label htmlFor="toCurrency" className="label color2">
          Seleccionar divisa destino:
        </label>
        <select
          id="toCurrency"
          {...register("to_currency")}
          className="select color3"
        >
          <option>To Currency</option>
          {currenciesList.map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button type="submit" className="button color4">
          Get
        </button>
      </form>
      <div className="currenInfo">
        {loading ? (
          <p>Esperando resultados...</p>
        ) : (
          <>
            <p>From Currency Code: {currencyInfo["1. From_Currency Code"]}</p>
            <p>From Currency Name: {currencyInfo["2. From_Currency Name"]}</p>
            <p>To Currency Code: {currencyInfo["3. To_Currency Code"]}</p>
            <p>To Currency Name: {currencyInfo["4. To_Currency Name"]}</p>
            <p>Exchange Rate: {currencyInfo["5. Exchange Rate"]}</p>
            <p>Last Refreshed: {currencyInfo["6. Last Refreshed"]}</p>
            <p>Bid Price: {currencyInfo["8. Bid Price"]}</p>
            <p>Ask Price: {currencyInfo["9. Ask Price"]}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Forex;
