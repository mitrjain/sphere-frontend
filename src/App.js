  import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse
  } from 'mdb-react-ui-kit';



import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import ApiService from './services/ApiService';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [tax_liability, setTaxLiability] = useState([]);
  const [showBasic, setShowBasic] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await ApiService.fetchTransactions();
      setTransactions(data);
    }
    fetchTransactions();
  },[]);

  useEffect(() => {
    async function fetchTaxLiability() {
      const data = await ApiService.fetchTaxLiability();
      console.log(data)
      setTaxLiability(data.tax);
    }
    fetchTaxLiability();
  }, []);

  
  return (
    <header>
      <MDBNavbar expand='lg' light bgColor='white' fixed className='sticky-top'>
        <MDBContainer fluid>
            <h1 className="text-center">Overall Tax Liability: <span style={{color: tax_liability<0 ? "red" : "green",}}> {Math.abs(tax_liability)}  </span></h1>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
          </MDBNavbarToggler>
          <MDBCollapse show={showBasic}>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <div className="App">
        <TransactionList transactions={transactions} />
      </div>
      </header>
  );
}

export default App;
