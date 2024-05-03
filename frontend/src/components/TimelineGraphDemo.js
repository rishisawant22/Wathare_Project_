import React, { useState } from 'react';
import '../css/demo.css';

const TimelineGraphDemo = () => {
  const [data, setData] = useState([]);
  const [click, setClick] = useState();
  const [timeframe, setTimeframe] = useState('');

  // Function to generate simulated data for the specified timeframe
  const generateData = (hours) => {
    const startTime = new Date('2024-01-21T00:00:00');
    const simulatedData = [];
    for (let i = 0; i < hours; i++) {
      const timestamp = new Date(startTime.getTime() + i * 60 * 60 * 1000); // Adding 1 hour in milliseconds
      const machineStatus = Math.random() < 0.9 ? 1 : 0; // Assuming 90% uptime
      const vibration = Math.floor(Math.random() * 1000); // Random vibration value
      simulatedData.push({
        id: i + 1,
        ts: timestamp.toISOString(),
        machine_status: machineStatus,
        vibration: vibration,
      });
    }
    setData(simulatedData);
    setTimeframe(`${hours} Hr`);
  };

  // Function to handle button click
  const buttonHandler = (hours) => {
    setClick('');
    generateData(hours);
  };

  return (
    <>
      <div className="button-container">
        <div className="Timeframe"><h5>Timeframe: {timeframe}</h5></div>
        <ul className="button-list">
          <li>
            <button onClick={() => buttonHandler(1)} className="btn btn-secondary">
              1 Hr
            </button>
          </li>
          <li>
            <button onClick={() => buttonHandler(8)} className="btn btn-secondary">
              8 Hr
            </button>
          </li>
          <li>
            <button onClick={() => buttonHandler(24)} className="btn btn-secondary">
              24 Hr
            </button>
          </li>
        </ul>
        <button onClick={() => generateData(24)} className="btn btn-primary">Generate Data</button>
      </div>
      <div className="timeline-container">
        <div className="containerD">
          <div className="cycle-status">Cycle Status</div>
          {data.map((entry, index) => (
            <div
              key={index}
              className="timeline-entry1"
              style={{
                left: `${(index / data.length) * 100}%`, // Adjust the value as needed
                backgroundColor: entry.machine_status === 0 ? 'yellow' : (entry.machine_status === 1 ? 'green' : 'red'),
                border: entry.machine_status === 0 ? '50px solid yellow' : (entry.machine_status === 1 ? '50px solid green' : '50px solid red'),
              }}
            >
              <div style={{ position: 'absolute', top: '100%', transform: 'translateX(-50%)' }}>
                {(index === 0 || index === data.length - 1 || click) &&
                  new Date(entry.ts).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    hour12: false,
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimelineGraphDemo;
