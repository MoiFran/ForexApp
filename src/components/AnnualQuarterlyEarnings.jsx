import React, { useState } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import "../style/annual.css";

const AnnualQuarterlyEarnings = () => {
  const [symbol, setSymbol] = useState("");
  // const [reportType, setReportType] = useState("quarterly");
  const [earningsData, setEarningsData] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const apiKey = "UTZGT3SW6V0TQMLQ"; // Reemplazar con tu API key de Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      setEarningsData(data);
      console.log(earningsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEarningsData(null);
    }
    console.log("work");
  };

  return (
    <div className="container">
      <h1 style={{ color: "#1F75FE" }}>Annual and Quarterly Earnings</h1>
      <form onSubmit={handleFormSubmit} className="form-container">
        <label>
          Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            className="text-input"
          />
        </label>

        <button type="submit" className="btn-serch">
          Search
        </button>
      </form>
      {earningsData && earningsData.symbol && (
        <div className="annualData">
          <Tabs
            defaultActiveKey="Annual Earnings"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Annual Earnings">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Fiscal Date Ending</th>
                    <th>Reported EPS</th>
                  </tr>
                </thead>
                {earningsData.annualEarnings.map((earning, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{earning.fiscalDateEnding}</td>
                      <td>{earning.reportedEPS} %</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Tab>
            <Tab eventKey="profile" title="Quarterly Earning">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Fiscal Date Ending</th>
                    <th>Reported EPS</th>
                  </tr>
                </thead>
                {earningsData.quarterlyEarnings.map((earning, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{earning.fiscalDateEnding}</td>
                      <td>{earning.reportedEPS} %</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Tab>
          </Tabs>
        </div>
      )}
      {earningsData && !earningsData.symbol && (
        <p>No se ha encontrado el símbolo.</p>
      )}
      {earningsData && !earningsData.annualEarnings && (
        <p>No se han encontrado datos de ganancias anuales.</p>
      )}
      {earningsData && !earningsData.quarterlyEarnings && (
        <p>No se han encontrado datos de ganancias trimestrales </p>
      )}
    </div>
  );
};

export default AnnualQuarterlyEarnings;
