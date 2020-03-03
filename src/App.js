import React, { useState } from "react";
import "./App.css";
function validateAddress(location) {
  console.log(location);
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
    valid[event.target.name] = true
    setValidation({...validations, ...valid});
    console.log(form);
  };

  const handleSubmit = event => {
    event.preventDefault();
    for (const [key,value] of Object.entries(validations)) {
      if (value === false) {
        setMessage("Please fill in all fields.")
        return false;
      }
    }
    validateAddress(form);
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
      <div className="messageContainer">
          <span className="resultText">{message}</span>
        </div>
    </div>
  );
}

export default App;
