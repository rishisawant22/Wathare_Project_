// DataSimulator.js
import React, { useState } from 'react';
import '../css/DataSimulator.css';

const DataSimulator = () => {
  const [data, setData] = useState(null);

  const simulateData = () => {
    const simulatedData = {
      ts: new Date().toISOString(),
      machine_status: Math.random() > 0.5 ? 1 : 0, // Simulating machine status randomly
      vibration: Math.floor(Math.random() * (1000 - 100) + 100) // Simulating vibration value within a range
    };
    setData(simulatedData);
  };

  return (
    <div className="data-simulator">
      <h2>Data Simulator</h2>
      <button className="simulate-button" onClick={simulateData}>Simulate Data</button>
      {data && (
        <div className="simulated-data">
          <h3>Simulated Data:</h3>
          <table>
            <tbody>
              <tr>
                <td>Timestamp:</td>
                <td>{data.ts}</td>
              </tr>
              <tr>
                <td>Machine Status:</td>
                <td>{data.machine_status}</td>
              </tr>
              <tr>
                <td>Vibration:</td>
                <td>{data.vibration}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataSimulator;
