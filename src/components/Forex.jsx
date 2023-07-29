import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styleForex.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setShow(true);
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
      <div className="form-Style">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>From Currency</Form.Label>
            <Form.Select id="fromCurrency" {...register("from_currency")}>
              <option>Currency</option>
              {currenciesList.map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>To Currency</Form.Label>
            <Form.Select id="toCurrency" {...register("to_currency")}>
              <option>Currency</option>
              {currenciesList.map((currency) => (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            GET
          </Button>
        </Form>
      </div>
      <div className="currenInfo">
        {loading ? (
          <p style={{ color: "black" }}>Esperando resultados...</p>
        ) : (
          <>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Currency info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  From Currency Code: {currencyInfo["1. From_Currency Code"]}
                </p>
                <p>
                  From Currency Name: {currencyInfo["2. From_Currency Name"]}
                </p>
                <p>To Currency Code: {currencyInfo["3. To_Currency Code"]}</p>
                <p>To Currency Name: {currencyInfo["4. To_Currency Name"]}</p>
                <p>Exchange Rate: {currencyInfo["5. Exchange Rate"]}</p>
                <p>Last Refreshed: {currencyInfo["6. Last Refreshed"]}</p>
                <p>Bid Price: {currencyInfo["8. Bid Price"]}</p>
                <p>Ask Price: {currencyInfo["9. Ask Price"]}</p>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Forex;
