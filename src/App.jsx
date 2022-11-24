import { useState } from 'react';
import coldBg from './assets/Bgcold.jpg'
import hotBg from './assets/sunn.jpg'
import rainGif from './assets/trovoada.gif'
import snowGif from './assets/snow.gif'
import apiWeather from './services/weatherApi';
import ReactCountryFlag from 'react-country-flag'


function App() {
  const [locationCity, setLocationCity] = useState({})
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [bg, setBg] = useState(hotBg)


    async function weather(e){
      try{
        e.preventDefault()
        setIsLoading(true)
        const locationApi = await apiWeather.get('weather', {params: {appid: process.env.API_KEY, q: input}})
        setLocationCity(locationApi.data)
        setIsLoading(false)
        console.log(locationApi)
        setInput('')
        const temperatura = locationApi.data.main.temp - 273
        const rain = locationApi.data.weather[0].main
        const snow = locationApi.data.weather[0].main

        if(snow == 'Snow'){
          setBg(snowGif)
          return
        }
  
        if(rain == 'Rain'){
          setBg(rainGif)
          return
        }
  
        if(temperatura <= 20){
          setBg(coldBg)
        }else{
          setBg(hotBg)
        }
      }
      catch{
        alert('Cidade nao encontrada!')
        setIsLoading(false)
        setInput('')
      }
    }
  


      if(isLoading){
        return(
          <div className='loading'>
            <h3></h3>
            <div className='load'></div>
          </div>
        )
      }
      


  return (
    <form onSubmit={weather}>
      <div className="mainContainer" style={{backgroundImage: `url(${bg})`}}>
      <div className="container">
        <div className="header">
          <input type="text"
          placeholder="Digite sua cidade..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          />
        </div>
      {Object.keys(locationCity).length > 0 &&(
        <>
        <div className="mainInformation">
          <div className="left">
            <div className="country">
            <h3>{locationCity?.name}
            </h3>
            <ReactCountryFlag countryCode={locationCity?.sys.country} className='flag' svg />
            </div>
            { locationCity.weather ? (
                                locationCity.weather.map(w => 
                                <div key={w.id}>
                                    <img src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`} alt="weather-icon" />
                                </div>
                                )) : (
                                <div></div> 
                            )}
            { locationCity.weather ? (
                            locationCity.weather.map(w => 
                            <div key={w.id}>
                                <p>{w.description}</p>
                            </div>
                            )) : (
                            <div></div> 
                        )}
          </div>
          <div className="rigth">
            <h1>{Math.round(locationCity?.main?.temp - 273)}°C</h1>
          </div>
        </div>

        <div className="grid">
          <div className="additionalInformation">
            <div className="up">Min</div>
            <div className="down">{Math.round(locationCity?.main?.temp_min -273)}°C</div>
          </div>

          <div className="additionalInformation">
            <div className="up">Max</div>
            <div className="down">{Math.round(locationCity?.main?.temp_max - 273)}°C</div>
          </div>

          <div className="additionalInformation">
            <div className="up">Feels Like</div>
            <div className="down">{Math.round(locationCity?.main?.feels_like - 273)}°C</div>
          </div>

          <div className="additionalInformation">
            <div className="up">Pressure</div>
            <div className="down">{locationCity?.main?.pressure} hPa</div>
          </div>

          <div className="additionalInformation">
            <div className="up">Humidity</div>
            <div className="down">{locationCity?.main?.humidity}%</div>
          </div>

          <div className="additionalInformation">
            <div className="up">Wind</div>
            <div className="down">{locationCity?.wind?.speed} m/s</div>
          </div>
        </div>
        </>
      )}        
      </div>
      </div>
    </form>
  );
}

export default App;
