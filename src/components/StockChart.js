import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const Chart = (stocks) => {
  if (stocks && stocks.tickers.length > 0) {
    return (
      <LineChart width={400} height={400} data={stocks.tickers}>
        <Line type="monotone" dataKey="price" stroke="#8884d8"/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
    </LineChart>
  );
  }

  return null;
}

export default Chart;
