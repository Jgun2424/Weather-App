import { useState, useEffect } from 'react'
import Layout from '../src//comps/layout/layout'
import Navigation from '../src//comps/navigation/navigation'
import Main from '../src//comps/main/main'
import LoadingState from './comps/loading/LoadingState'

export default function App() {
  
  const [weatherData, setWeatherData] = useState('')
  const [aqi, setAqi] = useState('-')

  const setDefault = () => {
    localStorage.setItem('location', 'Miami')
    localStorage.setItem('unit', 'c')
  }

  const fetchWeather = async () => {
    if (!localStorage.getItem('location')) setDefault();
    try {
      await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8c797274edce4c5085f190353222504&q=${localStorage.getItem('location')}&days=5&aqi=yes&alerts=yes`).then(response => {
        return response.json()
      }).then(data => {
        setWeatherData(data)
      })
    } catch (error) {
      return;
    }
  }
  async function fetchData() {
    if (!localStorage.getItem('location')) setDefault();
    await fetch(`https://api.waqi.info/feed/${localStorage.getItem('location').split(',')[0]}/?token=03acbd9dc8b4d429862c7da20490dc21ab564f21`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "error") return setAqi('-')
      setAqi(data.data.aqi)
    })
  }

  function fireBoth() {
    fetchWeather()
    fetchData()
  }

  useEffect(() => {
    fireBoth()
  }, []);


  return (
    <>
      <Layout>
        <Navigation />
        {
          !weatherData ? <LoadingState /> : (
            <Main weatherData={weatherData} aqi={!aqi ? null : aqi} unit={localStorage.getItem('unit')} fire={() => fireBoth()}/>
          )
        }
      </Layout>
    </>
  )
}
