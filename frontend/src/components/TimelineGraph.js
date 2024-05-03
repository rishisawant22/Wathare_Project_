import React, { useEffect, useState } from 'react';
import '../css/TimelineGraph.css';

const TimelineGraph = () => {
  const [data, setData] = useState();
  const [time, setTime] = useState([]);
  const [click, setClick] = useState();

  const getData = async () => {
    try {
      // Simulate fetching data from a service
      const response = await fetch('http://localhost:3000/data');
      const timeStampDataArray = await response.json();

      setData(timeStampDataArray);

      const timeArray = timeStampDataArray.map(val => {
        const date = new Date(val.ts);
        return {
          timestamp: date.getTime(),
          hour: date.getUTCHours(),
          minutes: date.getUTCMinutes(),
          seconds: date.getUTCSeconds()
        };
      });

      setTime(timeArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const buttonHandler = e => {
    setClick(e.target.value);
  };

  return (
    <>
      <div className="button-container">
        <div className="Timeframe"><h5>Timeframe</h5></div>
        <ul className="button-list" onClick={buttonHandler}>
          <li>
            <button value="1 Hr" className="btn btn-secondary">
              1 Hr
            </button>
          </li>
          <li>
            <button value="8 Hr" className="btn btn-secondary">
              8 Hr
            </button>
          </li>
          <li>
            <button value="24 Hr" className="btn btn-secondary">
              24 Hr
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div className="container">
          <div className="cycle-status">Cycle Status</div>
          {data &&
            data.map((entry, index) => (
              <div
                key={index}
                className="timeline-entry"
                style={{
                  left: `${index * 0.2}px`,
                  backgroundColor: entry.machine_status === 0 ? 'yellow' : (entry.machine_status === 1 ? 'green' : 'red'),
                }}
              >
                {((click === '1 Hr' && index % 3000 === 0) ||
                  (click === '8 Hr' && index % 24000 === 0) ||
                  (click === '24 Hr' && index % 72000 === 0) ||
                  index === data.length - 1 ||
                  index === 0) && (
                  <div style={{ position: 'absolute', top: '100%', transform: 'translateX(-50%)' }}>
                    {new Date(time[index].timestamp).toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    })}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TimelineGraph;
