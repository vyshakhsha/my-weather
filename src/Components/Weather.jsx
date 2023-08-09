import React,{useState,useEffect} from "react";
import SearchIcon from '@mui/icons-material/Search';
import  "./style.css"
import axios from "axios";

function Weather(){

    const [weatherData,setWeatherData]=useState({})
    const[api,setApi]=useState("https://api.openweathermap.org/data/2.5/weather?appid=f30788b1a81303443d22d90c4bb52247&q=kannur&unit=metric")
    let [location,setLocation]=useState("kannur")
    let [locationTemp,setLocationTemp]=useState("")
    

    function handleChange(event){
        setLocationTemp(event.target.value)
    }

    function handleClick(){
        setLocation(locationTemp)
        console.log(locationTemp)
        setApi("https://api.openweathermap.org/data/2.5/weather?appid=f30788b1a81303443d22d90c4bb52247&q="+locationTemp+"&unit=metric")
    }
    useEffect(()=>
    {   
        async function getData()
        {
            
            try
            {
                let response=await axios.get(api)
                let { weather: apiWeather ,main:apiTemperature } = response.data
                let { temp:temperature}=apiTemperature
                temperature=(Number(temperature)-273).toFixed(2);
                let{description:description,icon:icon}=apiWeather[0]
                let iconName="icons/"+icon+".png"
                setWeatherData({
                    temperature:temperature+"°C",
                    description:description,
                    iconName:iconName
                })     
            }
            catch(error)
            {
                console.log(error)
            }
        }
        getData()
    },[api])


    return (<div className="container">
    <h2>WEATHER VISTA</h2>
        <div className="search-box">
            <input type="textbox" className="textbox" id="txtLocation" onChange={handleChange} placeholder="Enter Location"></input>
            <button onClick={handleClick}><SearchIcon/></button>
        </div>
        <div className="weather-card">
            <table>
                <tr>
                    <td>
                        <div className="weather-details">
                            <h4>{location.toUpperCase()}</h4>
                            <p>{weatherData.description}</p>
                            <p>{weatherData.temperature}</p>
                        </div>
                    </td>
                    <td>
                        <div className="weather-icon">
                            <img src={weatherData.iconName}  alt="weather"></img>
                        </div>
                    </td>
                </tr>               
            </table>
        </div>
    </div>)
}
export default Weather