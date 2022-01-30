import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./store";

const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_API_SERVER}/graphql/`,
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
