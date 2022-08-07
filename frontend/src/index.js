import React from "react";
import {createRoot} from 'react-dom/client';
require('file-loader?name[name].[ext]!../public/index.html');

import './index.css'
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/react-hooks';
import {createUploadLink} from 'apollo-upload-client';

// import App from './fileupload/App'
import App from "./App";

const client = new ApolloClient({
    link: createUploadLink({
    uri: "http://localhost:4000/graphql"
    }),
    
    cache: new InMemoryCache(),
})


// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root'); 
const root = createRoot(rootElement);

root.render(
    <ApolloProvider client={client} >
          <App /> 
    </ApolloProvider>
    
       
  
);  