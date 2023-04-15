import React from 'react'
import classes from './navigation.module.css'
import { Icon } from '@iconify/react';

export default function Navigation() {
  return (
    <>
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <h1 style={{fontSize:"20px",letterSpacing:"2px"}}>DaBest</h1>
                <h1 style={{fontSize:"15px",letterSpacing:"2px"}}>weather</h1>
            </div>
            <div className={classes.items}>
                <ul>
                    <li className={`${classes.listitem} ${classes.active}`}><Icon icon="mdi:weather-cloudy" /></li>
                    <li className={`${classes.listitem}`}><Icon icon="mdi:chart-box-outline" /></li>
                    <li className={`${classes.listitem}`}><Icon icon="mdi:map-marker-radius-outline" /></li>
                    <li className={`${classes.listitem}`}><Icon icon="mdi:calendar" /></li>
                    <li className={`${classes.listitem}`}><Icon icon="mdi:cog-outline" /></li>
                </ul>
            </div>

            <div className={classes.bottom}>
            <li className={`${classes.listitem}`}><Icon icon="mdi:logout" /></li>
            </div>

        </div>
    </>
  )
}
