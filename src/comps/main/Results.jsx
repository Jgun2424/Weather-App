import React, {useState, useEffect} from 'react'
import classes from './main.module.css'

export default function Results(props) {

    const [temp, setTemp] = useState('..')

    function changeLocation() {
        localStorage.setItem('location', `${props.cityName}, ${props.region}`)
        props.update()
        props.reset()
    }

    useEffect(() => {
      const temp = async () => {
        await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8c797274edce4c5085f190353222504&q=${props.cityName},${props.region}&aqi=no&alerts=no&days=1`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setTemp(localStorage.getItem('unit') === 'c' ? `${Math.round(data.current.feelslike_c)}°C` : `${Math.round(data.current.feelslike_f)}°F`)
        })
      }
      temp()
    }, [])
    

  return (
    <li className={classes.results} onClick={() => changeLocation()}><h2 style={{flexGrow: "1"}}>{props.cityName}, {props.region}</h2><h2>{temp}</h2></li>
  )
}
