import React, { useState } from 'react';
import axios from 'axios';

const InvoiceByParty = () => {
  const [partyName, setPartyName] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInvoice = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/invoice', { params: { partyName } });
      setInvoiceData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching data');
      setInvoiceData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice by Party</h1>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          placeholder="Enter Party Name"
          className="border p-2 rounded w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={fetchInvoice} 
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-blue-500 text-center">Loading invoice data...</p>
      )}

      {error && (
        <div className="text-red-500 bg-red-100 border border-red-400 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {invoiceData && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">Party Details</h2>
          <p><strong>Name:</strong> {invoiceData.partyDetails.name}</p>
          <p><strong>Contact:</strong> {invoiceData.partyDetails.contactNumber}</p>
          <p><strong>Email:</strong> {invoiceData.partyDetails.email}</p>
          <p><strong>Address:</strong> {invoiceData.partyDetails.address}</p>

          <h2 className="text-xl font-bold mt-4">Trips</h2>
          {invoiceData.trips.map((trip, index) => (
            <div key={index} className="border p-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <p><strong>Vehicle:</strong> {trip.vehicle?.companyName} ({trip.vehicle?.modelNumber})</p>
              <p><strong>Driver:</strong> {trip.driver?.name || 'N/A'}</p>
              <p><strong>Start Location:</strong> {trip.tripStartLocation}</p>
              <p><strong>End Location:</strong> {trip.tripEndLocation}</p>
              <p><strong>Total Fare:</strong> ₹{trip.fareDetails.totalFare}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">Duty Slips</h2>
          {invoiceData.dutySlips.map((duty, index) => (
            <div key={index} className="border p-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <p><strong>Vehicle:</strong> {duty.vehicle}</p>
              <p><strong>Driver:</strong> {duty.driver}</p>
              <p><strong>Start Location:</strong> {duty.startLocation}</p>
              <p><strong>End Location:</strong> {duty.endLocation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceByParty;
