import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";

function App() {
  const [today, setToday] = useState({ date: "", color: "", period: "" });
  const [tomorrow, setTomorrow] = useState({ date: "", color: "", period: "" });
  const [counts, setCounts] = useState({
    pastBlueDays: 0,
    pastWhiteDays: 0,
    pastRedDays: 0,
    unknowDays: 0
  });
  const [data, setData] = useState([]);
  const blueDaysInPeriod = 300;
  const whiteDaysInPeriod = 43;
  const redDaysInPeriod = 22;

  const okColor = "lightgreen";
  const noOkColor = "red";
  const iconSize = 256;

  const apiUrl = "http://localhost:8019"; //TODO: utiliser .env

  const handleResponse = (data, setState) => {
    let color = "";
    switch (data.codeJour) {
      case 0:
        color = "grey";
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

    data.map((day) => {
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
    });
    setCounts(resultObj);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todayResponse = await axios.get(`${apiUrl}/today`);
        handleResponse(todayResponse.data, setToday);

        const tomorrowResponse = await axios.get(`${apiUrl}/tomorrow`);
        handleResponse(tomorrowResponse.data, setTomorrow);

        const allResponse = await axios.get(`${apiUrl}/all`);
        setData(allResponse.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((jour) => jour.periode === today.period);
    handleCounts(filteredData);
  }, [data, today.period]);

  const renderDay = (day) => {
    return (
      <>
        <div>Date: {day.date}</div>
        <div>
          Couleur:
          <BsFillLightbulbFill size={iconSize} color={day.color} />
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <p>Past Blue Days: {counts.pastBlueDays}</p>
        <p>Past White Days: {counts.pastWhiteDays}</p>
        <p>Past Red Days: {counts.pastRedDays}</p>
        <p>Unknown Days: {counts.unknowDays}</p>
        <p>Remaining Blue Days: {blueDaysInPeriod - counts.pastBlueDays}</p>
        <p>Remaining White Days: {whiteDaysInPeriod - counts.pastWhiteDays}</p>
        <p>Remaining Red Days: {redDaysInPeriod - counts.pastRedDays}</p>
      </div>
      <div>Aujourd'hui: {renderDay(today)}</div>
      <div>Demain: {renderDay(tomorrow)}</div>
    </>
  );
}

export default App;
