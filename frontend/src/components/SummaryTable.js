import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/SummaryTable.css'; // Import the CSS file for styling

const SummaryTable = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    ones: 0,
    zeros: 0,
    maxContinuousOnes: 0,
    maxContinuousZeros: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data');
      setData(response.data);
      calculateSummary(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateSummary = (data) => {
    let ones = 0;
    let zeros = 0;
    let maxContinuousOnes = 0;
    let maxContinuousZeros = 0;
    let continuousOnes = 0;
    let continuousZeros = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].machine_status === 1) {
        ones++;
        continuousOnes++;
        continuousZeros = 0;
        if (continuousOnes > maxContinuousOnes) {
          maxContinuousOnes = continuousOnes;
        }
      } else {
        zeros++;
        continuousZeros++;
        continuousOnes = 0;
        if (continuousZeros > maxContinuousZeros) {
          maxContinuousZeros = continuousZeros;
        }
      }
    }

    setSummary({
      ones,
      zeros,
      maxContinuousOnes,
      maxContinuousZeros,
    });
  };

  return (
    <div className="summary-table-container"> {/* Apply a container class */}
      <h2 className="Summary">Summary Table</h2>
      <table className="summary-table"> {/* Apply a table class */}
        <thead>
          <tr>
            <th>Category</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of 1s</td>
            <td>{summary.ones}</td>
          </tr>
          <tr>
            <td>Number of 0s</td>
            <td>{summary.zeros}</td>
          </tr>
          <tr>
            <td>Continuous 1s</td>
            <td>{summary.maxContinuousOnes}</td>
          </tr>
          <tr>
            <td>Continuous 0s</td>
            <td>{summary.maxContinuousZeros}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
