import React, { useState } from "react";
import "./App.css";

function processResult(postcodes, suburbAndPostcode, location) {
  const { state, suburb, postcode } = location;

  if (suburbAndPostcode.localities === "" && postcodes.localities === "") {
    return `The suburb ${suburb} does not exist in the state ${state}`;
  }

  if (suburbAndPostcode.localities === "") {
    return `The postcode ${postcode} does not match the suburb ${suburb}`;
  }

  let availablePostcodes = postcodes.localities.locality;
  let selectedSuburbs = suburbAndPostcode.localities.locality;
  console.log(availablePostcodes);
  console.log(selectedSuburbs);

  if (
    !Array.isArray(availablePostcodes) &&
    !Array.isArray(selectedSuburbs) &&
    availablePostcodes.location === selectedSuburbs.location
  ) {
    return "The postcode, suburb and state entered are validre";
  }

  if (!Array.isArray(selectedSuburbs)) {
    selectedSuburbs = [selectedSuburbs];
  }

  if (!Array.isArray(availablePostcodes)) {
    availablePostcodes = [availablePostcodes]
  }

  for (let i = 0; i < availablePostcodes.length; i++) {
    for (let j = 0; j < selectedSuburbs.length; j++) {
      if (availablePostcodes[i].location === selectedSuburbs[j].location) {
        return "The postcode, suburb and state entered are valid";
      }
    }
  }

  return `The suburb ${suburb} does not exist in the state ${state}`;
}

async function validateAddress(location, setMessage) {
  const { state, suburb, postcode } = location;
  var myHeaders = new Headers();
  myHeaders.append("auth-key", "872608e3-4530-4c6a-a369-052accb03ca8");

  var requestOptions = {
    method: "GET",
    headers: myHeaders
  };

  let postcodes = await fetch(
    `https://digitalapi.auspost.com.au/postcode/search.json?state=${state}&q=${postcode}`,
    requestOptions
  );
  postcodes = await postcodes.json();

  let suburbAndPostcode = await fetch(
    `https://digitalapi.auspost.com.au/postcode/search.json?state=${state}&q=${suburb} ${postcode}`,
    requestOptions
  );
  suburbAndPostcode = await suburbAndPostcode.json();

  setMessage(processResult(postcodes, suburbAndPostcode, location));
}

function App() {
  const [form, setForm] = useState({ state: "NSW" });
  const [validations, setValidation] = useState({
    suburb: false,
    postcode: false,
    state: true
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
    setMessage("Contacting server... ");
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
