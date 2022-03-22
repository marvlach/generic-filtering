import React, {useEffect, useState} from "react";
import {Grid} from '@material-ui/core'
import {Map} from './Map'
import {SelectMultiple} from './SelectMultiple'
import { HAZARDTYPES, PROBABILITY, MAGNITUDE } from "./options";

const data = {'18': [
                    {'type': 'Flood and sea level rise > Coastal flood', 'probability': 'Medium', 'magnitude': 'Medium'}, 
                    {'type': 'Storm and wind > Storm surge', 'probability': 'Medium', 'magnitude': 'Medium'}, 
                    {'type': 'Extreme hot temperature > Heat wave', 'probability': 'Medium', 'magnitude': 'Medium'}, 
                    {'type': 'Extreme Precipitation > Rain storm', 'probability': 'High', 'magnitude': 'High'}
                    ], 
              '159': [
                    {'type': 'Biological hazards > Vector-borne disease', 'probability': 'Medium Low', 'magnitude': 'High'}, 
                    {'type': 'Wild fire > Forest fire', 'probability': 'Low', 'magnitude': 'Medium'}, 
                    {'type': 'Extreme cold temperature > Cold wave', 'probability': 'Medium Low', 'magnitude': 'Medium'}, 
                    {'type': 'Storm and wind > Severe wind', 'probability': 'Medium', 'magnitude': 'Medium High'}, 
                    {'type': 'Mass movement > Subsidence', 'probability': 'Medium', 'magnitude': 'Medium Low'}, 
                    {'type': 'Extreme cold temperature > Extreme cold days', 'probability': 'Medium Low', 'magnitude': 'Medium High'}, 
                    {'type': 'Flood and sea level rise > River flood', 'probability': 'Medium', 'magnitude': 'High'}, 
                    {'type': 'Extreme Precipitation > Rain storm', 'probability': 'Medium', 'magnitude': 'Medium High'}, 
                    {'type': 'Water Scarcity > Drought', 'probability': 'Medium High', 'magnitude': 'High'}, 
                    {'type': 'Extreme hot temperature > Extreme hot days', 'probability': 'Medium High', 'magnitude': 'High'}, 
                    {'type': 'Extreme hot temperature > Heat wave', 'probability': 'High', 'magnitude': 'High'}], 
              '163': [
                    {'type': 'Flood and sea level rise > Flash / surface flood', 'probability': 'High', 'magnitude': 'High'}, 
                    {'type': 'Extreme hot temperature > Heat wave', 'probability': 'High', 'magnitude': 'High'}, 
                    {'type': 'Extreme hot temperature > Extreme hot days', 'probability': 'High', 'magnitude': 'High'}
                    ], 
            }
const cities_coordinates = {'18':  {'lat': 55.67613, 'lng': 12.56571},
                            '159': {'lat': 48.8787676, 'lng': 2.3222643},
                            '163': {'lat': 50.8705213, 'lng': 7.069748}
                            }


export default function App() {
    const [cities, setCities] = useState({})
    const [hazards, setHazards] = useState()
    const [typeFilters, setTypeFilters] = useState([])
    const [magnitudeFilters, setMagnitudeFilters] = useState([])
    const [probabilityFilters, setProbabilityFilters] = useState([])
    const [filtered_cities, setFilteredCities] = useState({})

    const GROUP = {
      'HAZARD': 'hazard',
      // add here
  }

   

    useEffect(() => {
        //here???


    },[typeFilters])


    return (
        <Grid container>
            <Grid item lg={2}>
                <SelectMultiple filterType={"Hazard Filter"} filterOptions={HAZARDTYPES} filters={typeFilters} setFilters={setTypeFilters}/>
            </Grid>
            <Grid item lg={2}>
                <SelectMultiple filterType={"Probability Filter"} filterOptions={PROBABILITY} filters={probabilityFilters} setFilters={setProbabilityFilters}/> 
            </Grid>
            <Grid item lg={2}>
                <SelectMultiple filterType={"Magnitude Filter"} filterOptions={MAGNITUDE} filters={magnitudeFilters} setFilters={setMagnitudeFilters}/>   
            </Grid>
            <Grid item lg={12}>
                <Map data={filtered_cities}/>
            </Grid>
        </Grid>
    );
}
