import React from "react";
import "./stocks.css";
import moment from "moment";

const getStatus = (stock) => {
  if (stock.status == 'down')
    return 'down';
  if (stock.status == 'up')
    return 'up'
}

const Stocks = (stocks, initializedTime) => {
  if (stocks && stocks.tickers.length > 0) {
    return (<table className="table">
      <tbody>
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Last Update</th>
        </tr>
        {
          stocks.tickers.map((stock, index) => {
            return (<tr key={index} className={stock.isChanged
                ? getStatus(stock)
                : null}>
              <td>{stock.name}</td>
              <td>
                {stock.price}
              </td>
              <td>{moment(stock.lastUpdate).from(initializedTime)}</td>
            </tr>);
          })
        }
      </tbody>
    </table>);
  }

  return null;
}

export default Stocks;
