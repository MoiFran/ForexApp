import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import InputGroup from "react-bootstrap/InputGroup";

const GlobalQuotes = () => {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [symbols, setSymbols] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const companies = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
    },

    {
      symbol: "ADBE",
      name: "Adobe Inc.",
    },

    {
      symbol: "AMD",
      name: "Advanced Micro Devices, Inc.",
    },

    {
      symbol: "AMGN",
      name: "Amgen Inc.",
    },

    {
      symbol: "AXP",
      name: "American Express Company",
    },

    {
      symbol: "BA",
      name: "Boeing Company",
    },

    {
      symbol: "BAC",
      name: "Bank of America Corporation",
    },

    {
      symbol: "BBY",
      name: "Best Buy Co., Inc.",
    },

    {
      symbol: "BIDU",
      name: "Baidu, Inc.",
    },

    {
      symbol: "BK",
      name: "Bank of New York Mellon Corporation",
    },

    {
      symbol: "BMY",
      name: "Bristol-Myers Squibb Company",
    },

    {
      symbol: "C",
      name: "Citigroup Inc.",
    },

    {
      symbol: "CAT",
      name: "Caterpillar Inc.",
    },

    {
      symbol: "CSCO",
      name: "Cisco Systems, Inc.",
    },

    {
      symbol: "CMCSA",
      name: "Comcast Corporation",
    },

    {
      symbol: "CVX",
      name: "Chevron Corporation",
    },

    {
      symbol: "CXO",
      name: "Cerner Corporation",
    },

    {
      symbol: "DHR",
      name: "Danaher Corporation",
    },

    {
      symbol: "DIS",
      name: "The Walt Disney Company",
    },

    {
      symbol: "DLR",
      name: "Digital Realty Trust, Inc.",
    },

    {
      symbol: "DOW",
      name: "Dow Inc.",
    },

    {
      symbol: "EMR",
      name: "Emerson Electric Co.",
    },

    {
      symbol: "EOG",
      name: "EOG Resources, Inc.",
    },

    {
      symbol: "FB",
      name: "Meta Platforms, Inc.",
    },

    {
      symbol: "FDX",
      name: "FedEx Corporation",
    },

    {
      symbol: "FIS",
      name: "Fidelity National Information Services, Inc.",
    },

    {
      symbol: "FIZZ",
      name: "Constellation Brands, Inc.",
    },

    {
      symbol: "FOE",
      name: "Fortune Brands Home & Security, Inc.",
    },

    {
      symbol: "GD",
      name: "General Dynamics Corporation",
    },

    {
      symbol: "GE",
      name: "General Electric Company",
    },

    {
      symbol: "GILD",
      name: "Gilead Sciences, Inc.",
    },

    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
    },

    {
      symbol: "GS",
      name: "Goldman Sachs Group, Inc.",
    },

    {
      symbol: "HD",
      name: "The Home Depot, Inc.",
    },

    {
      symbol: "HON",
      name: "Honeywell International Inc.",
    },

    {
      symbol: "HRB",
      name: "H&R Block, Inc.",
    },

    {
      symbol: "IBM",
      name: "International Business Machines Corporation",
    },

    {
      symbol: "INTC",
      name: "Intel Corporation",
    },

    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
    },

    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
    },

    {
      symbol: "JWN",
      name: "Nordstrom, Inc.",
    },

    {
      symbol: "KHC",
      name: "The Kraft Heinz Company",
    },

    {
      symbol: "KO",
      name: "The Coca-Cola Company",
    },

    {
      symbol: "LMT",
      name: "Lockheed Martin Corporation",
    },

    {
      symbol: "LOW",
      name: "Lowe's Companies, Inc.",
    },

    {
      symbol: "MA",
      name: "Mastercard Incorporated",
    },

    {
      symbol: "MDT",
      name: "Medtronic plc",
    },

    {
      symbol: "MELI",
      name: "MercadoLibre, Inc.",
    },

    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
    },

    {
      symbol: "MMM",
      name: "3M Company",
    },

    {
      symbol: "MNST",
      name: "Monster Beverage Corporation",
    },

    {
      symbol: "MO",
      name: "Altria Group, Inc.",
    },

    {
      symbol: "MRK",
      name: "Merck & Co., Inc.",
    },

    {
      symbol: "MU",
      name: "Micron Technology, Inc.",
    },

    {
      symbol: "NKE",
      name: "Nike, Inc.",
    },

    {
      symbol: "NOC",
      name: "Northrop Grumman Corporation",
    },

    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
    },

    {
      symbol: "ORCL",
      name: "Oracle Corporation",
    },

    {
      symbol: "PFE",
      name: "Pfizer Inc.",
    },

    {
      symbol: "PG",
      name: "The Procter & Gamble Company",
    },

    {
      symbol: "PM",
      name: "Philip Morris International Inc.",
    },

    {
      symbol: "PYPL",
      name: "PayPal Holdings, Inc.",
    },

    {
      symbol: "QCOM",
      name: "Qualcomm Incorporated",
    },

    {
      symbol: "RTX",
      name: "Raytheon Technologies Corporation",
    },

    {
      symbol: "SBUX",
      name: "Starbucks Corporation",
    },

    {
      symbol: "SCHW",
      name: "Charles Schwab Corporation",
    },

    {
      symbol: "SO",
      name: "Southern Company",
    },

    {
      symbol: "T",
      name: "AT&T Inc.",
    },

    {
      symbol: "TMO",
      name: "T-Mobile US, Inc.",
    },

    {
      symbol: "TRMB",
      name: "Thermo Fisher Scientific Inc.",
    },

    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
    },

    {
      symbol: "TSM",
      name: "Taiwan Semiconductor Manufacturing Company Limited",
    },

    {
      symbol: "UNH",
      name: "UnitedHealth Group Incorporated",
    },

    {
      symbol: "UPS",
      name: "United Parcel Service, Inc.",
    },

    {
      symbol: "USB",
      name: "United States Bancorp",
    },

    {
      symbol: "V",
      name: "Visa Inc.",
    },

    {
      symbol: "VLO",
      name: "Valero Energy Corporation",
    },

    {
      symbol: "WMT",
      name: "Walmart Inc.",
    },

    {
      symbol: "XOM",
      name: "Exxon Mobil Corporation",
    },
    // ... Más empresas ...
  ];

  useEffect(() => {
    const filteredCompanies = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const options = filteredCompanies.map((company) => (
      <option key={company.symbol} value={company.symbol}>
        {company.name}
      </option>
    ));
    setSymbols(options);
  }, [searchTerm]);

  useEffect(() => {
    if (symbol) {
      getQuote(symbol);
    }
  }, [symbol]);

  const getQuote = async (symbol) => {
    const apiKey = "UTZGT3SW6V0TQMLQ"; // Reemplazar con tu API key de Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setData(data["Global Quote"]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
  };

  return (
    <div className="GlobalQuotes">
      <Form.Group className="mb-3">
        <Form.Label>
          {" "}
          <h1>Global Quote</h1>
        </Form.Label>

        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with dropdown button"
            placeholder="Empresa "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Form.Select
            name="symbol"
            onChange={(event) => setSymbol(event.target.value)}
          >
            <option value="">Select Symbol</option>
            {symbols}
          </Form.Select>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        {data ? (
          <Card style={{ width: "18rem" }}>
            {Object.entries(data).map(([key, value]) => (
              <ListGroup key={key}>
                <ListGroup.Item>
                  {key}: <b>{value}</b>
                </ListGroup.Item>
              </ListGroup>
            ))}
          </Card>
        ) : (
          <p>No se ha seleccionado ningún símbolo.</p>
        )}
      </Form.Group>
    </div>
  );
};

export default GlobalQuotes;
