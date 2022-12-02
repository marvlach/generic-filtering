import React, {useCallback, useEffect, useState} from "react";
import {Grid} from '@material-ui/core'
import {Map} from './Map'
import SelectMultiple from './SelectMultiple'
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
// backend
/* the data above is structurally bad.
the data from the backend should look like the following in my opinion:
const data = [{
    id: '18'
    lat: ...
    lng: ...
    hazards: [{
        type: ,
        probability: ,
        magnitude: 
    }, {
        type: ,
        probability: ,
        magnitude:    
    }, {
        ...
    }]
},{
    ...
}]

But I won't change them :)
*/



// helper to mock Api call. After at most 300ms, the provided data is returned.
const mockApiCall = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, Math.floor(Math.random() * 300))
    });
};




export default function App() {
    console.log('rerender')
    // state to fill the select menus
    const [hazardTypes, setHazardTypes] = useState([])
    const [probability, setProbability] = useState([])
    const [magnitude, setMagnitude] = useState([])

    const [cities, setCities] = useState({})
    const [hazards, setHazards] = useState({})
    const [filters, setFilters] = useState({
        type: [],
        probability: [],
        magnitude: []
    })

    // fetch all data on mount
    useEffect(() => {
        const dataToFetch = [HAZARDTYPES, PROBABILITY, MAGNITUDE, data, cities_coordinates]
        const setDataToFetch = [setHazardTypes, setProbability, setMagnitude, setHazards, setCities]

        const fetchAllData = async () => {
            try {
                const fetchDataPromises = dataToFetch.map(data => mockApiCall(data))
                const dataFetched = await Promise.all(fetchDataPromises)
                dataFetched.forEach((data, index) => { setDataToFetch[index](data) })
            } catch (error) {
                console.log(error)
            } 
        }

        fetchAllData();

    }, []) // no deps, everything is either in useEffect or out of component

    const applyFilters = useCallback((filterProp, filters) => {
        setFilters(prev => {
            return { ...prev, [filterProp]: filters }
        })
    }, [])


    const decideToInclude = (city, filterField) => {
        if (filters[filterField]?.length === 0) {
            return true
        }
        const cityHazards = hazards[city].map(hazardObj => hazardObj[filterField]);

        for (const cityHazard of cityHazards) {
            if (filters[filterField].includes(cityHazard)) {
                return true
            }
        }
        return false
    }


    const filteredCitiesKeys = Object.keys(cities)
        .filter(city => decideToInclude(city, 'type'))
        .filter(city => decideToInclude(city, 'probability'))
        .filter(city => decideToInclude(city, 'magnitude'))
 

    const filteredCities = Object.keys(cities)
        .filter(key => filteredCitiesKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = cities[key];
            return obj;
        }, {});
   
    // console.log(typeFilters)
    return (
        <Grid container>
            <Grid item lg={2}>
                <SelectMultiple filterType={"Hazard Filter"} filterProp={"type"} filterOptions={hazardTypes} applyFilters={applyFilters}/>
            </Grid>
            <Grid item lg={2}>
                <SelectMultiple filterType={"Probability Filter"} filterProp={"probability"} filterOptions={probability} applyFilters={applyFilters}/> 
            </Grid>
            <Grid item lg={2}>
                <SelectMultiple filterType={"Magnitude Filter"} filterProp={"magnitude"} filterOptions={magnitude} applyFilters={applyFilters}/>   
            </Grid>
            <Grid item lg={12}>
                <Map data={filteredCities}/>
            </Grid>
        </Grid>
    );
}
