import React from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Table from "react-bootstrap/Table";

// import { changeData } from "../../store/actions/data";
// import { useDispatch, useSelector } from "react-redux";

export default function Srchtable() {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "VT345uYuYnVsLgGsdYofLoT06J93Fc83");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const [value, setValue] = useState([]);
  const [tableData, settableData] = useState([]);
  // const data = useSelector((state) => state.data.data);
  // const dispatch = useDispatch();

  const searchData = (vlu) => {
    console.log(vlu);
    fetch(
      `https://api.apilayer.com/number_verification/validate?number=${vlu}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        settableData(result);

        // dispatch(changeData(result));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Number :</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Form.Text className="text-muted">
          Phone number you would like to validate. Ex: 14158586273
        </Form.Text>
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          searchData(value);
        }}
      >
        GET DATA
      </Button>

      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>valid</th>
            <th>number</th>
            <th>country_code</th>
            <th>location</th>
            <th>line_type</th>
          </tr>
          {/* 
          {Object.keys(tableData).map((key, i) => {
            return (
              <p key={i}>
                <span> {key}</span>
                <span> {tableData[key]}</span>
              </p>
            );
          })} */}
          <tr>
            <th>{tableData}</th>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

//number:14158586273

// data:
// "valid": true,
// "number": "14158586273",
// "local_format": "4158586273",
// "international_format": "+14158586273",
// "country_prefix": "+1",
// "country_code": "US",
// "country_name": "United States of America",
// "location": "Novato",
// "carrier": "AT&T Mobility LLC",
// "line_type": "mobile"
