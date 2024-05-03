
import { color } from "chart.js/helpers";
import TimelineGraph from "./components/TimelineGraph";
import Navbar from "./components/Navbar";
import SummaryTable from "./components/SummaryTable";
import Weather from "./components/weather";
import Footer from "./components/Footer";
import DataSimulator from "./components/DataSimulator";
import TimelineGraphDemo from "./components/TimelineGraphDemo";

function App() {
  return (
<>
    <div>
    <Navbar></Navbar>
    </div>

    <div>
    <TimelineGraph></TimelineGraph>
    </div>    
    <div><SummaryTable></SummaryTable></div>

<div><Weather></Weather></div>
<div><DataSimulator></DataSimulator></div>
<div><TimelineGraphDemo></TimelineGraphDemo></div>

<div><Footer></Footer></div>

</>
  );
}

export default App;