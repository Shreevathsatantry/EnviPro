import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import './componentscss.css';

const Vehicle = ({ setCalculatedData, documentId }) => {
  const { user, addDocument } = useAuth();
  const [mileage, setMileage] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [fuelType, setFuelType] = useState('petrol');
  const [calculatedFootprint, setCalculatedFootprint] = useState(null);

  const handleSubmit = async () => {
    const conversionFactor = fuelType === 'petrol' ? 8887 : 10180;
    const gallonsConsumed = parseFloat(mileage) / parseFloat(efficiency);
    const calculatedFootprintValue = (gallonsConsumed * conversionFactor * 0.001).toFixed(2);
    
    setCalculatedData(prev => ({ ...prev, vehicleFootprint: calculatedFootprintValue }));
    setCalculatedFootprint(calculatedFootprintValue);
  
    const documentData = {
      email: user.email,
      Mileage: parseFloat(mileage),
      efficiency: parseFloat(efficiency), // Updated attribute name
      Fuel_type: fuelType,
       // Corrected attribute name
    };
  
    try {
      await addDocument(documentData, documentId);
      
    } catch (error) {
      console.error("Error adding vehicle data:", error);
      if (error.response && error.response.data) {
        console.error("Appwrite error response:", error.response.data);
      }
      alert("Failed to add vehicle data");
    }
  };

  return (
    <div className="welcome-container">
      <h2 className='h2_comp'>Vehicle carbon footprint calculator</h2>
      <div className="form-container">
        <div className="input-group">
          <label>Mileage (miles):</label>
          <input 
            type="number" 
            value={mileage} 
            onChange={(e) => setMileage(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Enter efficiency (mpg US):</label>
          <input 
            type="number" 
            value={efficiency} 
            onChange={(e) => setEfficiency(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Fuel type:</label>
          <select 
            value={fuelType} 
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Calculate Car Footprint</button>
        {calculatedFootprint !== null && (
          <p>Your vehicle's carbon footprint is {calculatedFootprint} metric tons of CO2.</p>
        )}
      </div>
    </div>
  );
};

export default Vehicle;
