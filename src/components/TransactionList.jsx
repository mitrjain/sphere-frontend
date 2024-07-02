import React, { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import '../index.css'; // Import CSS file for styling
import {
  MDBBtn,
} from 'mdb-react-ui-kit';

function TransactionList({ transactions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Smooth scrolling animation
    });
  };

  return (
    <div className="transaction-list">
      {paginatedTransactions.map(transaction => (
        <TransactionDetails key={transaction.id} transaction={transaction} />
      ))}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Implement pagination controls based on transactions.length and itemsPerPage */}
        {/* Example: */}
        <MDBBtn onClick={() => handlePageChange(currentPage - 1)}>Previous</MDBBtn>
        <MDBBtn onClick={() => handlePageChange(currentPage + 1)}>Next</MDBBtn>
      </div>
    </div>
  );
}

export default TransactionList;
