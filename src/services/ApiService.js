const API_BASE_URL = 'http://localhost:8000/api';

const ApiService = {
  async fetchTransactions() {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  async fetchTaxLiability() {
    try {
      const response = await fetch(`${API_BASE_URL}/tax-liability`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }


};

export default ApiService;
