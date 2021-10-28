import Table from 'react-bootstrap/Table'
import moment from 'moment'
import './TemperaturesTables.css'

const TemperaturesTable = ({temps}) => {
    const {title, readings} = temps
    return (
        <div className="readings">
            <h3>{title}</h3>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Max</th>
                        <th>Min</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        readings.map((day)=>{
                            const date = moment.utc(day.dt * 1000).format('ddd MMM D')
                            const {min, max} = day.temp
                            return (
                                <tr key={day.dt}>
                                    <td>{date}</td>
                                    <td>{min} &#8451;</td>
                                    <td>{max} &#8451;</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TemperaturesTable