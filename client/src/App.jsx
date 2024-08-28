import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";

function App() {
  const [today, setToday] = useState({ date: "", color: "", period: "" });
  const [tomorrow, setTomorrow] = useState({ date: "", color: "", period: "" });
  const [counts, setCounts] = useState(null);

  const okColor = "lightgreen";
  const noOkColor = "red";
  const iconSize = 256;

  const apiUrl = "http://localhost:8019"; //TODO: utiliser .env

  const handleResponse = (data, setState) => {
    let color = "";
    switch (data.codeJour) {
      case 0:
        color = "black";
        break;
      case 1:
        color = "blue";
        break;
      case 2:
        color = "white";
        break;
      case 3:
        color = "red";
        break;
      default:
        break;
    }
    setState({ date: data.dateJour, color, period: data.periode });
  };

  const handleCounts = (data) => {
    let resultObj = {
      pastBlueDays: 0,
      pastWhiteDays: 0,
      pastRedDays: 0,
      unknowDays: 0
    };

    data.forEach((day) => {
      if (day.periode === today.period) {
        switch (day.codeJour) {
          case 0:
            resultObj.unknowDays += 1;
            break;
          case 1:
            resultObj.pastBlueDays += 1;
            break;
          case 2:
            resultObj.pastWhiteDays += 1;
            break;
          case 3:
            resultObj.pastRedDays += 1;
            break;
          default:
            break;
        }
      }
      setCounts(resultObj);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todayResponse = await axios.get(`${apiUrl}/today`);
        handleResponse(todayResponse.data, setToday);

        const tomorrowResponse = await axios.get(`${apiUrl}/tomorrow`);
        handleResponse(tomorrowResponse.data, setTomorrow);

        const allResponse = await axios.get(`${apiUrl}/all`);
        handleCounts(allResponse.data, setCounts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const renderDay = (day) => {
    return (
      <>
        <div>Date: {day.date}</div>
        <div>
          Couleur:
          {day.color === "red" ? (
            <BsFillLightbulbOffFill size={iconSize} color={noOkColor} />
          ) : (
            <BsFillLightbulbFill size={iconSize} color={okColor} />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div>Test : {counts && counts.pastBlueDays}</div>
      <div>Aujourd'hui: {renderDay(today)}</div>
      <div>Demain: {renderDay(tomorrow)}</div>
    </>
  );
}

export default App;
