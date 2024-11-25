import { useState } from "react";
import currencyData from "../api/currency.json";
import { useQuery } from "@tanstack/react-query";
import { currencyConverter } from "../api/api";

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["currency"],
    queryFn: () => currencyConverter(fromCurrency, toCurrency, amount),
    enabled: false,
  });

  const handleCurrencyBtnClick = () => {
    if (fromCurrency.length !== 0) refetch();
    else return;
  };
  return (
    <section className="currency_converter">
      <div className="currency_div">
        <h1>Currency Converter</h1>

        <hr />

        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <div className="select_section">
          {/* FROM INPUT */}
          <div>
            <label>
              From:
              <input
                list="From-currency"
                name="From-currency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              />
              <datalist id="From-currency">
                {currencyData.map((curEle) => {
                  return (
                    <option value={curEle.code} key={curEle.id}>
                      {curEle.code} {curEle.name}
                    </option>
                  );
                })}
              </datalist>
            </label>
          </div>
          {/* TO INPUT */}
          <div>
            <label>
              To:
              <input
                list="To-currency"
                name="To-currency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              />
              <datalist id="To-currency">
                {currencyData.map((curEle) => {
                  return (
                    <option value={curEle.code} key={curEle.id}>
                      {curEle.code} {curEle.name}
                    </option>
                  );
                })}
              </datalist>
            </label>
          </div>
        </div>

        <button
          disabled={amount <= 0 || isLoading}
          onClick={handleCurrencyBtnClick}
        >
          {isLoading ? "Converting..." : "Convert"}
        </button>

        <hr />

        {data && (
          <div>
            <h2>
              {amount} {fromCurrency} = {data.conversion_result.toFixed(2)}
              {` ${toCurrency}`}
            </h2>
          </div>
        )}

        {isError && <h2>{error.message}</h2>}
      </div>
    </section>
  );
};
