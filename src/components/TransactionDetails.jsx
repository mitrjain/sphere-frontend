import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBSwitch,
} from "mdb-react-ui-kit";

export default function TransactionDetails({transaction}) {

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };


  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardHeader className="bg-dark"> </MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <MDBRow className="text-center">
              <h3
                className="text-uppercase text-center mt-3"
                style={{ fontSize: "40px" }}
              >
                Transaction ID: {transaction.id} 
              </h3>
            </MDBRow>
            <MDBRow className="text-center">
              <h5
                className="text-uppercase text-center mt-3"
                style={{ fontSize: "15px" }}
              >
                Type: <span style={{color: transaction.type === "credit" ? "green" : "red",}}> {transaction.type}  </span>
              </h5>
            </MDBRow>
            <MDBRow >
            <MDBSwitch
              id='flexSwitchCheckDefault'
              label='Show only taxable items'
              style={{ marginLeft: 'auto' }}
              checked={isSwitchOn}
              onChange={handleToggle}
              />
            </MDBRow>

            <MDBRow className="mx-3">
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">Items</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price (per unit)</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Item price after discount</th>
                    <th scope="col">Taxable (Yes/No)  </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                {transaction.line_items.map((item, index) => (
                  <tr style={{ display: isSwitchOn && !item.taxable ? 'none' : 'table-row' }}>
                  <td>{item.name}</td>
                  <td> {item.quantity} </td>
                  <td> <MDBIcon fas icon="dollar-sign" /> {item.price} </td>
                  <td> { (item.discount_type == "amount" || item.discount_type == "") ? (
          <>
            <MDBIcon fas icon="dollar-sign" /> {item.discount}
          </>
        ) : item.discount + " %" } </td>
        <td> <MDBIcon fas icon="dollar-sign" /> {item.total_after_discount} </td>
        <td> {item.taxable ? "Yes" : "No"} </td>
                </tr>
                ))}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>

            <MDBRow className="mx-3">
              <MDBTable>
                <MDBTableBody>
                  <tr style={{ display: isSwitchOn ? 'none' : 'table-row' }}>
                    <td>
                    <span className="me-3 float-start">Total Transaction Amount:</span>
                    <MDBIcon fas icon="dollar-sign" /> {transaction.total_txn_amount}
                    </td>
                  </tr>
                  <tr>
                  <td>
                    <span className="me-3 float-start">Total Taxable Amount:</span>
                    <MDBIcon fas icon="dollar-sign" /> {transaction.taxable_amount}
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <span className="me-3 float-start">Tax rate :</span> {transaction.tax_rate + " %"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                    style={{
                      fontWeight: "400",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    Tax Liable: 
                    <span style={{color: transaction.type === "credit" ? "green" : "red",}}>
                      <MDBIcon fas icon="dollar-sign" className="ms-2" /> {Math.abs(transaction.tax_amount)}
                    </span>
                  </p>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
              </MDBRow>

            <MDBRow className="mt-2 mb-5">
              <p className="fw-bold">
                Address: <span className="text-muted">{transaction.address.state+", "+transaction.address.country}</span>
              </p>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
        <MDBCardFooter className="bg-dark"></MDBCardFooter>
      </MDBCard>
    </MDBContainer>
  );
}