import axios from "axios";

const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}`,
});

// Get method from axios
export const currencyConverter = async (fromCurrency, toCurrency, amount) => {
  try {
    const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
