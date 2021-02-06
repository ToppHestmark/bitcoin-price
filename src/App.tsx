import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Wrapper } from "./styles/App.styles";

interface BitcoinData {
  "15m": number;
  last: number;
  buy: number;
  sell: number;
  symbol: string;
}

type Currencies = {
  [key: string]: BitcoinData;
};

const getBCData = async (): Promise<Currencies> => {
  const res = await (await fetch("https://blockchain.info/ticker")).json();
  return res;
};

const INTERVAL_TIME = 60000;

const App = () => {
  const [currency, setCurrency] = useState("USD");

  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    "bc-data",
    getBCData
  );

  const handleCurrencySelection = (e: any) => {
    setCurrency(e.currentTarget.value);
  };

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured when fetching data.</div>;

  return (
    <Wrapper>
      <h2>Bitcoin Price</h2>
      <select value={currency} onChange={handleCurrencySelection}>
        {data &&
          Object.keys(data).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
      </select>
      <section>
        <h3>
          <span>{data && data[currency].symbol}</span>
          <span>
            {data &&
              data[currency].last.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
          </span>
        </h3>
      </section>
    </Wrapper>
  );
};

export default App;
