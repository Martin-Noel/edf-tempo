import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [todayDate, setTodayDate] = useState("");
  const [todayColor, setTodayColor] = useState("");
  const [tomorrowDate, setTomorrowDate] = useState("");
  const [tomorrowColor, setTomorrowColor] = useState("");

  const apiUrl = "http://localhost:8019";

  const setStateFunctions = {
    Today: {
      setDate: setTodayDate,
      setColor: setTodayColor
    },
    Tomorrow: {
      setDate: setTomorrowDate,
      setColor: setTomorrowColor
    }
  };

  const handleResponse = (data, day) => {
    const { setDate, setColor } = setStateFunctions[day];
    switch (data.codeJour) {
      case 0:
        setColor("black");
        break;
      case 1:
        setColor("blue");
        break;
      case 2:
        setColor("white");
        break;
      case 3:
        setColor("red");
        break;
      default:
        break;
    }
    setDate(data.dateJour);
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/today`)
      .then(({ data }) => handleResponse(data, "Today"));

    axios
      .get(`${apiUrl}/tomorrow`)
      .then(({ data }) => handleResponse(data, "Tomorrow"));
  }, []);

  return (
    <>
      <div>Date du jour : {todayDate}</div>
      <div style={{ backgroundColor: tomorrowColor }}>
        Couleur du jour : {todayColor}
      </div>
      <div>Date de demain : {tomorrowDate}</div>
      <div style={{ backgroundColor: tomorrowColor }}>
        Couleur de demain : {tomorrowColor}
      </div>
    </>
  );
}

export default App;
