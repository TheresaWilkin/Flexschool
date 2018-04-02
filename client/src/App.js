import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { BrowserRouter } from 'react-router-dom'
import Root from './components/Root';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './index.css';

const client = new ApolloClient({});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#80cbc4',
    },
    secondary: {
      main: '#f48fb1'
    },
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <CssBaseline />
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <Root />
            </MuiThemeProvider>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
