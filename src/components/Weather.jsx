import React, { useEffect, useState } from 'react'
import "../assets/css/style.css";
import LoadingBar from 'react-top-loading-bar';
import { Slide, ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

const Weather = () => {
    const [searchValue, setSearchValue] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const icons = [Clear, Wind, Cloudy, Lightning, Haze, Rain, Snow];
    const api = {
        key: import.meta.env.VITE_KEY,
        main_url: "https://api.openweathermap.org/data/2.5/weather?",
        forecast_url: "https://api.openweathermap.org/data/2.5/forecast?",
    };

    const setIcons = (weatherData) => {
        switch (weatherData) {
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

    const defaultCall = async () => {
        try {
          setProgress(progress);
          let response = await fetch(
            `${api.main_url}appid=${api.key}&q=roorkee&units=metric`
          );
          let data = await response.json();
          setWeatherData(data);
        } catch (error) {
          error.message === "Failed to fetch"
            ? setError("Check your connections!")
            : setError(error.message);
        } finally {
          setProgress(100);
        }
      };

      useEffect(()=>{
        defaultCall();
      },[])

      const handleKey = (event) => {
        if (event.key === "Enter") {
          handleSearch();
        } else {
          setError("");
        }
      };

    const handleSearch = async () => {
        if (searchValue.trim !== " ") {
            try {
                let response = await fetch(`${api.main_url}appid=${api.key}&q=${searchValue}&units=metric`);
                let data = await response.json();
                if (data.cod === '404')
                    setError("City not found!");
                else {
                    setWeatherData(data); setError("");
                }
            } catch (error) {
                setError(error.message);
            }
        } else setError("Please enter a city name!");
    }

    const locationSearch = async () => {
        const resolve = async (location) => {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=metric&appid=${api.key}`);
                const data = await response.json();
                setWeatherData(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        const reject = () => {
            console.log("Access denied!");
        };
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }

    return (
        <>
            <LoadingBar color='#6F74A4' progress={100} height={3} />
            <div className='mainWrapper'>
                <div className='searchContainer'>
                <img src={Location_icon} alt='location-icon' onClick={locationSearch} />
                    <input className='searchInput'
                        type='text' placeholder='Search Location'
                        onKeyDown={handleKey} onChange={(e) => setSearchValue(e.target.value)}
                        autoFocus />
                    <img src={Search_icon} alt='search-icon' onClick={handleSearch} />
                </div>

                <div className='mainContainer' >
                    <div className="currentWeather">
                        {weatherData === null ? (
                            <div><p>No data found!</p></div>
                        ) : (
                            <>
                                <div className="basicInfo">
                                    <p className="location">{`${weatherData.name}, ${weatherData.sys.country}`}</p>
                                    <div className="iconBox">
                                        <img className='icon' width={"100px"} src={setIcons(weatherData.weather[0].description)} />
                                        <p className='temp'>{`${Math.floor(weatherData.main.temp)}℃`}</p>
                                    </div>
                                    <p className='description'>{`${weatherData.weather[0].description}`}</p>
                                </div>

                                <div className="extraInfo">
                                    <p>{`Feels like ${Math.floor(weatherData.main.feels_like)}℃`}</p>
                                    <div className="tempContainer">
                                        <div className="tempBox">
                                            <img src={Arrow_Up_Icon} alt='arrow_up_icon' />
                                            <p className='max_temp'>{`${Math.floor(weatherData.main.temp_max)}℃`}</p>
                                        </div>
                                        <div className="tempBox">
                                            <img src={Arrow_Down_Icon} alt='arrow_down_icon' />
                                            <p className='min_temp'>{`${Math.floor(weatherData.main.temp_min)}℃`}</p>
                                        </div>
                                    </div>

                                    <span className="row">
                                        <img src={Humidity_Icon} alt="Humidity Icon" />
                                        <p className="humidity">Humidity</p>
                                        <p>{`${weatherData.main.humidity}%`}</p>
                                    </span>
                                    <span className="row">
                                        <img src={Wind_Icon} alt="Wind Icon" />
                                        <p className="wind"> Wind</p>
                                        <p>{`${weatherData.wind.speed}km/h`}</p>
                                    </span>
                                    <span className="row">
                                        <img src={Pressure_Icon} alt="Pressure Icon" />
                                        <p className="pressure">Pressure</p>
                                        <p>{`${weatherData.main.pressure}hPa`}</p>
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {error && (
                <ToastContainer
                position='bottom'
                autoClose={4000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                draggable={false}
                >
                    {toast.error(error, { transition: Slide})}
                </ToastContainer>
            )}
        </>
    )
}

export default Weather;
