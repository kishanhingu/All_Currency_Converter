import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyConverter />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
