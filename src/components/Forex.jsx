import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
//import "../styleForex.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import TopGainesLoser from "./TopGainesLoser";
import Table from "react-bootstrap/Table";

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
      <h1 className="header color1" style={{ color: "#1F75FE" }}>
        Consulta de Divisas Forex
      </h1>
      <div className="form-Style">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#f3f3f7" }}>From Currency</Form.Label>
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
            <Form.Label style={{ color: "#f3f3f7" }}>To Currency</Form.Label>
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
          <p style={{ color: "#f3f3f7" }}>
            Esperando resultados <Spinner animation="grow" size="sm" />
          </p>
        ) : (
          <Table variant="dark" striped bordered hover>
            <tbody style={{ color: "#f3f3f7" }}>
              <tr>
                <td>From Currency Code:</td>
                <td>{currencyInfo["1. From_Currency Code"]}</td>
              </tr>
              <tr>
                <td>From Currency Nmea</td>
                <td>{currencyInfo["2. From_Currency Name"]}</td>
              </tr>

              <tr>
                {" "}
                <td>To Currency Name</td>
                <td>{currencyInfo["4. To_Currency Name"]}</td>
              </tr>
              <tr>
                <td>To Currency Code</td>
                <td>{currencyInfo["3. To_Currency Code"]}</td>
              </tr>
              <tr>
                <td>Exchange Rate</td>
                <td>{currencyInfo["5. Exchange Rate"]}</td>
              </tr>
              <tr>
                <td>Last Refreshed</td>
                <td> {currencyInfo["6. Last Refreshed"]}</td>
              </tr>
              <tr>
                <td>Bid Price</td>
                <td> {currencyInfo["8. Bid Price"]}</td>
              </tr>
              <tr>
                <td>Ask Price</td>
                <td> {currencyInfo["9. Ask Price"]}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Forex;
