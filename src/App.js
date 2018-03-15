import React, {Component} from 'react';
import logo from './logo.svg';
import {Stocks, StockChart} from "./components";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date();
    this.state = {
      tickers: []
    }
  }

  handleUpdateMessage(event, callback) {
    const data = JSON.parse(event.data);
    const newObj = {};

    data.forEach(([name, price]) => {
      let status = undefined;
      let isChanged = false;
      const oldState = this.state.tickers[name];

      if (oldState && oldState.price > price) {
        status = 'down';
        isChanged = true
      }

      if (oldState && oldState.price < price) {
        status = 'up';
        isChanged = true
      }

      const stockObj = {
        name,
        price,
        status,
        isChanged,
        lastUpdate: new Date()
      };
      newObj[name] = stockObj;
      callback(Object.assign({}, this.state.tickers, newObj))
    });
  }

  componentDidMount() {
    this.connection = new WebSocket('ws://stocks.mnet.website');
    this.connection.onmessage = event => {
      this.handleUpdateMessage(event, (newStockObj) => {
        this.setState({tickers: newStockObj});
      });
    };

  }

  render() {
    console.log('tickers', this.state.tickers);
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">(Live) Stocks App built with React</h1>
      </header>
      <div className="wrapper">
        <div className="leftcolumn">
          <h4>Stock Table</h4>
          <Stocks tickers={Object.values(this.state.tickers)} initializedTime={this.currentDate}/>
        </div>
        <div className="rightcolumn">
          <h4>Stock Chart</h4>
          <StockChart tickers={Object.values(this.state.tickers)}/>
        </div>
      </div>

    </div>);
  }
}

export default App;
