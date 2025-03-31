import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import RoutePage from "./utils/RoutePage";
import { ToastContainer } from "react-toastify";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import { AuthProvider } from "./context/AuthContext";
import StoreProvider from "./lib/StoreProvider";
import "react-toastify/dist/ReactToastify.css";
// import GoogleAdScript from "./hooks/AdsScript";

function App() {
  // const isSubscribed = false;
  return (
    <>
      <StoreProvider>
        <QueryClientContextProvider>
          <AuthProvider>
            <Router>
              <RoutePage />
            </Router>
            <ToastContainer />
          </AuthProvider>
        </QueryClientContextProvider>
      </StoreProvider>
    </>
  );
}

export default App;
