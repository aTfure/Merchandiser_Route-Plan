import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../src/pages/landing/landing.page.styles.scss";
import router from "./routes";
import store from "./redux/store";
import { Link, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/splash/splash.scss";

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div id="splash-screen">
        <div className="splash-content">
          <img
            src="/images/SILog.png"
            alt="SILog Logo"
            className="splash-logo"
          />
          <h1 className="splash-title"></h1>
          <p className="splash-message">Transforming Field Sales Operations</p>
          <div className="splash-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
