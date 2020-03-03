import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="mainContainer">
      <form className="formContainer">
        <label>Postcode</label>
        <input type="text" name="postcode" placeholder="2000" />

        <label>Suburb</label>
        <input type="text" name="suburb" placeholder="Sydney" />

        <label>State</label>
        <select id="state" name="state">
          <option value="NSW">New South Wales</option>
          <option value="VIC">Victoria</option>
          <option value="WA">Western Australia</option>
          <option value="QLD">Queensland</option>
          <option value="SA">South Australia</option>
          <option value="TAS">Tasmania</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
