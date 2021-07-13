import React from 'react';
import ReactDOM from 'react-dom';
import CarCard from './components/CarCard';
import StatChart from './components/StatChart';
import Main from './pages/Main';
import VehicleTable from './components/VehicleTable';
import reportWebVitals from './reportWebVitals';
import BlackDash from './components/BlackDash';

ReactDOM.render(

    <Main />,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
