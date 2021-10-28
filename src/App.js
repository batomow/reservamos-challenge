import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from 'react-multi-select-component';
import TemperaturesTable from './components/TemperaturesTables'
import axios from 'axios'

//this should be secret but oh well
const api_key = 'a5a47c18197737e8eeca634cd6acb581'


class App extends Component {
  state = { loadingCities: true, loadingTemps: true, selectedCities: []}

  async componentDidMount(){
    const {data: cities} =  await axios.get('https://search.reservamos.mx/api/v2/places')
    const cityOptions = cities.map(city => {
      return {
        label: city.display,
        value: {
          lat: city.lat, 
          long: city.long
        }
      }
    })
    this.setState({ cityOptions, loadingCities: false})
  }

  handleCityChange = async (value) =>{
    this.setState({loadingTemps: true})
    let selected_cities = [...value]
    console.log(selected_cities)
    this.setState({selectedCities: selected_cities})
    const promises = []
    for (const city of selected_cities){
      const {lat, long} = city.value
      if (lat == null || long == null){
        continue
      }
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`
      promises.push(axios.get(url))
    }
    const results = await Promise.all(promises)
    const temps = []
    for (let n = 0; n < results.length; n++){
      const result = results[n]
      const title = selected_cities[n].label
      const {data} = result
      temps.push({title, readings: data.daily})
    }
    this.setState({ temps, loadingTemps: false})
  }

  render() { 
    return (
      <div className="main-container">
        {
          this.state.loadingCities ? 
            <div>Loading...</div> : 
            <MultiSelect 
              className="multi-select"
              value={this.state.selectedCities}
              options={this.state.cityOptions}
              onChange={this.handleCityChange}
              />
        }
        <div className="calendars-container">
          {
            this.state.loadingTemps ? 
              <div>..waiting on data..</div>:
              this.state.temps.map((t)=>
                <TemperaturesTable temps={t}/>
              )
          }
        </div>
      </div>
    )
  }
}

export default App;
