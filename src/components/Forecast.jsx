import "../assets/css/style.css"
import React, { useEffect, useState } from 'react'
import {
    Arrow_Up_Icon,
    Arrow_Down_Icon,
    Humidity_Icon,
    Wind_Icon,
    Pressure_Icon,
    Clear,
    Wind,
    Cloudy,
    Lightning,
    Haze,
    Rain,
    Snow,
    Search_icon,
    Location_icon,
} from "../assets/images/images.js";

const Forecast = () => {
    const icons = [Clear, Wind, Cloudy, Lightning, Haze, Rain, Snow];
    const [forecastData, setForecastData]= useState(null);
        const api = {
            key: import.meta.env.VITE_KEY,
            forecast_url: "https://api.openweathermap.org/data/2.5/forecast?",
        };
    const setIcons = (forecastData) => {
            switch (forecastData) {
              case "clear sky":
                return icons[0];
        
              case "few clouds":
                return icons[2];
        
              case "scattered clouds":
                return icons[2];
        
              case "drizzle":
                return icons[2];
        
              case "overcast clouds":
                return icons[2];
        
              case "broken clouds":
                return icons[2];
        
              case "shower rain":
                return icons[5];
        
              case "light rain":
                return icons[5];
        
              case "moderate rain":
                return icons[5];
        
              case "rain":
                return icons[5];
        
              case "thunderstorm":
                return icons[3];
        
              case "thunderstorm with light rain":
                return icons[3];
        
              case "snow":
                return icons[6];
        
              case "light snow":
                return icons[6];
        
              case "haze":
                return icons[4];
        
              case "smoke":
                return icons[4];
        
              default:
                return icons[0];
            }
          };
    
        const forecastCall = async () => {
            try {
              let response = await fetch(
                `${api.forecast_url}appid=${api.key}&q=roorkee&units=metric`
              );
              let data = await response.json();
              setForecastData(data);
            } catch (error) {
              error.message === "Failed to fetch"
                ? setError("Check your connections!")
                : setError(error.message);
            } 
          };
    
          useEffect(()=>{
            forecastCall();
          },[])
  return (
    <>
    <div className="forecastContainer">
        {forecastData ? (forecastData.list.map((data, index) => (
            
          <div className="cardBody" key={index}>
            <p>{new Date(data.dt_txt).toLocaleDateString("en-US", { // e.g., "Monday"
                day: "numeric", // e.g., "18"
                month: "short",  // e.g., "Jan"
                hour: "2-digit", // e.g., "03"
                minute: "2-digit",// e.g., "Jan"
                })}</p>
            <img
              src={setIcons(data.weather[0].description)}
              alt={data.weather[0].description}
              className="cardImg"
            />
            <p className="description">{data.weather[0].description}</p>
            <div className="row">
              <img src={Arrow_Up_Icon} alt="Arrow Up Icon" />
              <p>{`${data.main.temp_max}°`}</p>
              <img src={Arrow_Down_Icon} alt="Arrow Down Icon" />
              <p>{`${data.main.temp_min}°`}</p>
            </div>
          </div>
        ))):(<p>Loading Forecast Data...</p>)}
      
    </div>
    </>
  )
}

export default Forecast
