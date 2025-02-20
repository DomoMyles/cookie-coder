import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Clipboard from './pages/Clipboard';
import Dashboard from './components/Dashboard';
import NavBar from "./components/NavClipboard"
import PageFooter from "./components/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';

// construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar></NavBar>
          <div>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/clipboard" element={<Clipboard />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>
          </div>
          <PageFooter></PageFooter>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
