import { useState, useRef } from 'react'
import classes from './main.module.css'
import { Icon } from '@iconify/react';
import moment from 'moment';
import Results from './Results';

export default function Main(props) {

  const [searchResults, setResults] = useState([])
  const [searchAnimation, setAnimation] = useState('')
  const search = useRef();
  let data = props.weatherData

  console.log(data)


  

  async function searchPlace(e) {
    e.preventDefault()

    let request = e.target.value

    if (request.length < 3) {
      setResults([])
      setAnimation('0px')
      return;
    }

    try {
      await fetch(`https://api.weatherapi.com/v1/search.json?key=8c797274edce4c5085f190353222504&q=${request}`)
            .then(res => {
              return res.json()
            }).then(data => {
              if (data.length === 0) {
                setResults([])
                setAnimation('0px')
                return;
              }
              console.log(data)
              setResults({data})
              setAnimation('55px')
            })
    } catch (error) {
            return;
    }
  }

  function reset() {
    search.current.value = ''
    setResults([])
    setAnimation('0px')
  }

  return (
    <div className={classes.wrapper}>
        <div className={classes.topBar}>
            <div className={classes.welcomeUser}><h1 style={{fontSize:"30px"}}>{data.location.name}</h1><h2 style={{fontSize:"20px"}}>{data.location.region}, {data.location.country} <span className={classes.dailyLow} style={{marginLeft:"10px", backgroundColor:"rgb(25, 40, 63)", color:"white", fontSize:"17px"}}>Local time: {moment(`${data.location.localtime}`).format('h:mm a')}</span></h2></div>
            <div className={classes.search}>
              <input type="text" className={classes.searchBar} placeholder='Search Anything ...' onChange={(e) => searchPlace(e)} ref={search}/>
              <Icon icon="ri:search-line" className={classes.icon}/>
            
              <div className={classes.searchResults} style={{top:`${searchAnimation}`}}>

              {searchResults.data && searchResults.data.slice(0,3).map(e => {
                return (
                  <Results cityName={e.name} region={e.region} update={props.fire} reset={reset} key={Math.random(0,10)}/>
                )
              })}
              </div>
            </div>
            <div className={classes.notifs}><Icon icon="ph:bell-bold" /></div>
        </div>



        <div className={classes.weather}>
            <div className={classes.item} style={{backgroundImage: "url('https://cdn.discordapp.com/attachments/927874970669940746/1073369210803204178/Untitled-1.png')"}}>
                <div className={classes.top}>
                    <div className={classes.weatherIcon}>
                    <Icon icon="bi:clouds" />
                    </div>
                    <h2 style={{fontSize:"20px", marginLeft: "20px", lineHeight:"25px"}}>Current Weather <br /> <span style={{fontSize:"16px"}}>Hows the weather today?</span></h2>
                </div>
                <div className={classes.weatherTemp}>
                    <div className={classes.innerTemp}>
                      
                    <h2 style={{fontSize:"50px"}}>{localStorage.getItem('unit') === "c" ? Math.round(data.current.temp_c) + '°C' : Math.round(data.current.temp_c) + '°F'}</h2>
                    <h1 className={classes.dailyLow}>feels like {localStorage.getItem('unit') === "c" ? Math.round(data.current.feelslike_c) + '°C' : Math.round(data.current.feelslike_f) + '°F'}</h1>
                    </div>
                    <h2 style={{marginTop:"10px", fontSize:"23px"}}>{data.current.condition.text}</h2>
                    <h2 style={{marginTop:"5px"}}>Last updated {moment(data.current.last_updated).from(data.location.localtime)}</h2>
                </div>
                <div className={classes.weatherGrid}>
                    <div className={classes.weatherItem} style={{backgroundColor:"#19283f"}}>
                        <p style={{margin:"10px"}}>Pressure</p>
                        <h2 style={{fontSize:"30px",marginBottom:"10px"}}>{data.current.pressure_mb}mb</h2>
                    </div>
                    <div className={classes.weatherItem} style={{backgroundColor:"#cce16a", color:"black"}}>
                        <p style={{margin:"10px"}}>Visibility</p>
                        <h2 style={{fontSize:"30px",marginBottom:"10px"}}>{localStorage.getItem('unit') === "c" ? data.current.vis_km + 'km' : data.current.vis_mi + 'mi'}</h2>
                    </div>
                    <div className={classes.weatherItem} style={{backgroundColor:"#fff", color:"black"}}>
                        <p style={{margin:"10px"}}>Humidity</p>
                        <h2 style={{fontSize:"30px",marginBottom:"10px"}}>{data.current.humidity}%</h2>
                    </div>
                </div>
            </div>
            <div className={classes.item} style={{backgroundImage: "url('https://cdn.discordapp.com/attachments/927874970669940746/1073370285392281600/Untitldwqed-1.png')"}}>
                <div className={classes.top} style={{color:'white'}}>
                  <div className={classes.weatherIcon}>
                    <Icon icon="ph:wind-bold" />
                    </div>
                    <h2 style={{fontSize:"20px", marginLeft: "20px", lineHeight:"23px"}}>Air Quality <br /> <span style={{fontSize:"16px"}}>Hows the air quality today?</span></h2>
                </div>
                <div className={classes.weatherTemp} style={{color:"white"}}>
                    <div className={classes.innerTemp}>
                      
                    <h2 style={{fontSize:"50px"}}>{props.aqi}</h2>
                    <h1 className={classes.dailyLow} style={{backgroundColor:"#cce16a", color:"black"}}>AQI</h1>
                    </div>
                    <h2 style={{marginTop:"10px", fontSize:"23px"}}>{data.current.wind_dir}</h2>
                    <h2 style={{marginTop:"5px"}}>Last updated {moment(data.current.last_updated).from(data.location.localtime)}</h2>
                </div>
                <div className={classes.weatherGrid} style={{gridTemplateColumns:"1fr"}}>
                    <div className={classes.weatherItem} style={{backgroundColor:"#fff", color:"#626c7c", alignItems:"normal", paddingLeft:"30px",paddingRight:"30px", justifyContent:"center"}}>
                      <div className={classes.weatherItem2}>
                        <h2 className={data.current.air_quality["gb-defra-index"] <= 3 ? classes.active : null}>Healthy {data.current.air_quality["gb-defra-index"] <= 3 ? <Icon icon="material-symbols:arrow-drop-down-rounded" className={classes.airIcon}/>: null}</h2>
                        <h2 className={data.current.air_quality["gb-defra-index"] > 3 && data.current.air_quality["gb-defra-index"] < 6 ? classes.active : null}>Fair {data.current.air_quality["gb-defra-index"] > 3 && data.current.air_quality["gb-defra-index"] < 6 ? <Icon icon="material-symbols:arrow-drop-down-rounded" className={classes.airIcon}/> : null}</h2>
                        <h2 className={data.current.air_quality["gb-defra-index"] >= 6 ? classes.active : null}>Hazardous {data.current.air_quality["gb-defra-index"] >= 6 ? <Icon icon="material-symbols:arrow-drop-down-rounded" className={classes.airIcon}/> : null}</h2>
                      </div>
                      <div className={classes.progress}>
                        <div className={classes.meter} style={{width: `${data.current.air_quality["gb-defra-index"]}${0}%`, backgroundColor:`#ef9556`}}>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={classes.today}>
              <div className={classes.tempToday}>
                <h2>Tempature for today</h2>
                <div className={classes.forecast}>
                  <div className={classes.innerForecast}>
                    <div className={classes.outerCircle}>
                      <img src={data.forecast.forecastday[0].hour[7].condition.icon} alt="" width={40} height={40}/>
                    </div>
                    <h1>{Math.round(data.forecast.forecastday[0].hour[7].temp_c)}°</h1>
                    <p>Morning</p>
                  </div>
                  <div className={classes.innerForecast}>
                    <div className={classes.outerCircle}>
                      <img src={data.forecast.forecastday[0].hour[14].condition.icon} alt="" width={40} height={40}/>
                    </div>
                    <h1>{Math.round(data.forecast.forecastday[0].hour[14].temp_c)}°</h1>
                    <p>Afternoon</p>
                  </div>
                  <div className={classes.innerForecast}>
                    <div className={classes.outerCircle}>
                      <img src={data.forecast.forecastday[0].hour[19].condition.icon} alt="" width={40} height={40}/>
                    </div>
                    <h1>{Math.round(data.forecast.forecastday[0].hour[19].temp_c)}°</h1>
                    <p>Evening</p>
                  </div>
                  <div className={classes.innerForecast}>
                    <div className={classes.outerCircle}>
                      <img src={data.forecast.forecastday[0].hour[1].condition.icon} alt="" width={40} height={40}/>
                    </div>
                    <h1>{Math.round(data.forecast.forecastday[0].hour[1].temp_c)}°</h1>
                    <p>Night</p>
                  </div>
                </div>
              </div>
              <div>       
                (this is a personal project)    
                <br />   
                This app is a work in progress... more features to come
                <br />
                Developed by: <a href="https://github.com/Jgun2424/">Jax Gun</a>
                <br />
                Design by: <a href="https://dribbble.com/budiartidesign">Budiarti R.</a>
                <br />
                <br />
                todo list

                <ul>
                  <li>Mobile optimization</li>
                </ul>

                </div>
        </div>
    </div>
  )
}
