import React, { useState } from "react";
import "./App.css";

function processResult(result) {
  console.log(result);
  return "Unknown"
}
function validateAddress(location, setMessage) {
  let {state, suburb, postcode} = location;
  console.log(state, suburb, postcode);
  var myHeaders = new Headers();
  myHeaders.append('no-Control-Allow-Origin', '*')
  myHeaders.append("Access-Control-Allow-Methods", 'HEAD, GET, POST, PUT, PATCH, DELETE');
  myHeaders.append("Access-Control-Allow-Headers", 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  myHeaders.append("auth-key", "872608e3-4530-4c6a-a369-052accb03ca8");


  var requestOptions = {
    method: "GET",
    headers: myHeaders
  };

  fetch(
    "https://digitalapi.auspost.com.au/postcode/search.json?state=NSW&q=Ryde 2112",
    requestOptions,
   
  )
    .then(response => response.text())
    .then(result => setMessage(processResult(result)))
    .catch(error => console.log("error", error));
}

function App() {
  const [form, setForm] = useState({ state: "NSW" });
  const [validations, setValidation] = useState({
    suburb: false,
    postcode: false,
    state: false
  });
  const [message, setMessage] = useState("");

  const handleInputChange = event => {
    let obj = {};
    obj[event.target.name] = event.target.value;
    setForm({ ...form, ...obj });

    let valid = {};
    valid[event.target.name] = true;
    setValidation({ ...validations, ...valid });
  };

  const handleSubmit = event => {
    event.preventDefault();
    for (const [, value] of Object.entries(validations)) {
      if (value === false) {
        setMessage("Please fill in all fields.");
        return false;
      }
    }
    setMessage("Contacting Postman Pat...");
    validateAddress(form, setMessage);
  };

  return (
    <div className="mainContainer">
      <form onSubmit={handleSubmit} className="formContainer">
        <label>Suburb</label>
        <input
          type="text"
          name="suburb"
          placeholder="Sydney"
          onChange={handleInputChange}
          onBlur={handleInputChange}
        />

        <label>Postcode</label>
        <input
          type="text"
          name="postcode"
          placeholder="2000"
          onChange={handleInputChange}
          onBlur={handleInputChange}
        />

        <label>State</label>
        <select
          id="state"
          name="state"
          onChange={handleInputChange}
          onBlur={handleInputChange}
        >
          <option value="NSW">New South Wales</option>
          <option value="VIC">Victoria</option>
          <option value="WA">Western Australia</option>
          <option value="QLD">Queensland</option>
          <option value="SA">South Australia</option>
          <option value="TAS">Tasmania</option>
        </select>

        <button onSubmit={handleSubmit} type="submit">
          Submit
        </button>
      </form>
      {message !== "" && (
        <div className="messageContainer">
          <span className="resultText">{message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
