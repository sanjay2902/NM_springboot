import React, { useState, useEffect } from 'react';
import './CustomerForm.css'; // Import CSS file

type Customer = {
  id?: number;
  name: string;
  email: string;
};

const API_URL = 'http://localhost:8080/customers';

const CustomerForm: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({ name: '', email: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data: Customer[] = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customer.name.trim() || !customer.email.trim()) {
      setError('Name and Email are required!');
      return;
    }

    try {
      const method = customer.id ? 'PUT' : 'POST';
      const url = customer.id ? `${API_URL}/${customer.id}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });

      if (!response.ok) throw new Error('Failed to save customer');

      setCustomer({ name: '', email: '' });
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
      setError('Failed to save customer. Try again.');
    }
  };

  const handleEdit = (cust: Customer) => {
    setCustomer(cust);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Failed to delete customer.');
    }
  };

  return (
    <div className="customer-container">
      <h2>Customer Management</h2>
      
      {error && <p className="error">{error}</p>}

      <form className="customer-form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={customer.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">{customer.id ? 'Update' : 'Add'} Customer</button>
      </form>

      <h3>Customer List</h3>
      <ul className="customer-list">
        {customers.length > 0 ? (
          customers.map((cust) => (
            <li key={cust.id}>
              <span>{cust.name} - {cust.email}</span>
              <div>
                <button className="edit-btn" onClick={() => handleEdit(cust)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cust.id!)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </ul>
    </div>
  );
};

export default CustomerForm;
