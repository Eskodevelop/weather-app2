import React, { useState, useEffect } from "react";
import Header from "./Header";
import SingleResult from "./SingleResult";
import axios from "axios";

const KEY = process.env.REACT_APP_KEY;
export default function Main() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [tempCity, setTempCity] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [msg, setMsg] = useState("");

  const sendRequest = () => {
    const URL = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&type=accurate&appid=${KEY}`;

    axios
      .get(URL)
      .then((response) => {
        let tempTemperature = response.data.list[0].main.temp;
        let tempCity = response.data.list[0].name;
        let tempCoutry = response.data.list[0].sys.country.toLowerCase();
        let tempWindSpeed = response.data.list[0].wind.speed;
        let tempWindDeg = response.data.list[0].wind.deg;
        let tempIcon = response.data.list[0].weather[0].icon;

        let winDeg = "";

        if (tempWindDeg >= 0 && tempWindDeg < 45) {
          winDeg = "↑";
        } else if (tempWindDeg >= 45 && tempWindDeg < 90) {
          winDeg = "↗️";
        } else if (tempWindDeg >= 90 && tempWindDeg < 135) {
          winDeg = "→";
        } else if (tempWindDeg >= 135 && tempWindDeg < 180) {
          winDeg = "↘️";
        } else if (tempWindDeg >= 180 && tempWindDeg < 225) {
          winDeg = "↓";
        } else if (tempWindDeg >= 225 && tempWindDeg < 270) {
          winDeg = "↙️";
        } else if (tempWindDeg >= 270 && tempWindDeg < 315) {
          winDeg = "←";
        } else if (tempWindDeg >= 315 && tempWindDeg < 360) {
          winDeg = "↖️";
        } else if (tempWindDeg === 360) {
          winDeg = "↑";
        }

        let tempData = {
          city: tempCity,
          icon: tempIcon,
          country: tempCoutry,
          temp: tempTemperature,
          windSpeed: tempWindSpeed,
          arrow: winDeg,
        };

        setData([...data, tempData]);
        setMsg("");
      })
      .catch((reason) => setMsg("There is no city with that name! Try again!"));
  };

  useEffect(() => {
    if (city === "") return;

    sendRequest();
  }, [city]);

  const clickHandler = (e) => {
    setIsInput(!isInput);
  };

  const changeHandler = (e) => {
    setTempCity(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      if (tempCity !== "") {
        setCity(tempCity);
        setIsInput(false);
      }
    }
    setIsDisableButton(true);
  };

  const removeHandler = (index) => {
    let newData = [];
    let j = 0;

    for (let i = 0; i < data.length; i++) {
      if (i !== index) {
        newData[j] = data[i];
        j++;
      }
    }

    setData(newData);
    setIsDisableButton(false);
  };

  useEffect(() => {
    if (data.length === 0) return;

    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (localStorage.getItem("data") === null) return;

    if (JSON.parse(localStorage.getItem("data")) === null) return;

    setData(JSON.parse(localStorage.getItem("data")));
  }, []);

  return (
    <div>
      <Header />
      <div className="weather-list">
        <div className="add-button-container">
          <button
            className="add-button"
            onClick={clickHandler}
            disabled={isInput}
          >
            +
          </button>
        </div>
        {isInput ? (
          <input
            className="input-filed"
            onChange={changeHandler}
            onKeyPress={enterHandler}
            type="text"
            placeholder="Enter city name..."
          />
        ) : (
          <div></div>
        )}
        {msg === "" ? <div></div> : <div className="msg">{msg}</div>}
        <div className="container">
          {data.map((value, index) => {
            return (
              <SingleResult
                key={index}
                city={value.city}
                icon={value.icon}
                country={value.country}
                temp={value.temp}
                windSpeed={value.windSpeed}
                arrow={value.arrow}
                index={index}
                removeHandler={removeHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
