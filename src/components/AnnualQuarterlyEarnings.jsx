import React, { useState } from "react";
import axios from "axios";

const AnnualQuarterlyEarnings = () => {
  const [symbol, setSymbol] = useState("");
  const [reportType, setReportType] = useState("quarterly");
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
  };

  return (
    <div>
      <h1>Annual and Quarterly Earnings</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
          />
        </label>

        <button type="submit">Search</button>
      </form>
      Empresa: {earningsData.symbol}
      {earningsData ? (
        <div>
          <h2>Symbol: {earningsData.symbol}</h2>
          <div>
            <h2>Annual Earnings:</h2>
            <ul>
              {earningsData.annualEarnings.map((earning, index) => (
                <li key={index}>
                  <b>Fiscal Date Ending:</b> {earning.fiscalDateEnding}
                  <br />
                  <b>Reported EPS:</b> {earning.reportedEPS}
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No se han encontrado datos de ganancias.</p>
      )}
    </div>
  );
};

export default AnnualQuarterlyEarnings;
