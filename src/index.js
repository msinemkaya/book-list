import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './context/books';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/*
     we could have done this inside of the App.js too as the parent (wrapper) on the return value 
     it doesnt really matter. The thing that is important is that we usually wrap the App component with
     context provider

     Context provider is the second step of using context. We are providing the data
     to all the childs (App component and what is inside of it) for them to use it.

     since we are no longer using a hardcoded value instead of BookContext.Provider we now pass the
     custom Provider function that we made
  */}
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);

