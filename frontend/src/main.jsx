import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams } from "./component/BgBeams.jsx";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
const client = new ApolloClient({
  //update the url 
  link: new HttpLink({ uri: import.meta.env.VITE_NODE_ENV==="development"?" http://localhost:4000/graphql":"/graphql" }),//this is our graphql server 
  cache: new InMemoryCache(),
  credentials: "include", 
});
createRoot(document.getElementById("root")).render(
  
 <StrictMode>


    <BrowserRouter>
    <BackgroundBeams>
      <ApolloProvider client={client}>
             <App />
      </ApolloProvider>
          
    </BackgroundBeams>
       
 
    </BrowserRouter>
 </StrictMode>
);

