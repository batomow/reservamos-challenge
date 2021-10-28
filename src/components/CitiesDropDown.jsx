const CitiesDropDown = ({cities, handleCityChange})=>{
    return (
        <select onChange={handleCityChange} >
            <option key="0" value="null">Select a city</option>
            {cities.map(city => (
                <option key={city.id} value={city.slug}>{city.display}</option>
            ))}
        </select>
    )
}

export default CitiesDropDown