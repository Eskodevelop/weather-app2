import React from "react";

export default function SingleResult({
  city,
  icon,
  country,
  temp,
  windSpeed,
  arrow,
  index,
  removeHandler,
}) {
  return (
    <div className="single">
      <p>
        {city}{" "}
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather Icon"
        />
        <img
          src={`https://flagicons.lipis.dev/flags/1x1/${country}.svg`}
          alt="Country Icon"
        />
      </p>

      <div>
        <p id="temp-color">
          {temp}°C  
        </p>
        <p>
        {windSpeed}m/s  {arrow}
        </p>
      </div >
      <button className="rmv-btn" onClick={() => removeHandler(index)}>Remove</button>
    </div>
  );
}
