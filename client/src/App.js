import React, { useState, useEffect } from 'react';

import axios from "axios";

function App() {

  const [phones, setPhones] = useState([]);

  useEffect(() => {
    axios.get("/api/phones")
      .then(response => {
        setPhones(response.data);
      })
  }, []);
  return (
    <div>
      <h1>Hello World !!</h1>
      <div>
        <ul>
          {phones.map(phone => {
            return <li key={phone._id}>{phone.name}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
