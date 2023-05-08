import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import RootStore from "./store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

// const store = RootStore.create({});
// export const StoreContext = createContext(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <StoreContext.Provider value={store}>
    <App />
    // </StoreContext.Provider>
);
