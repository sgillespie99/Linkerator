import React, { useState, useEffect } from 'react';

import {
  getSomething,
  getLinks
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getLinks()
      .then(response => {
        console.log(response)
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
  );
}

export default App;