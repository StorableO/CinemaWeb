import { useState } from 'react'
import './App.css'
import ResultOrder from './components/Result'
import FormExample from './components/Form'
import InputSeat from './components/Input'
import DataContext from './contexts/DataContext'
import SeatsOn from './components/SeatsOn'

function App() {
    const [result, setResult] = useState(false)
    const [seats, setSeats] = useState([])
    
    const [imie, setImie] = useState('')
    const [nazwisko, setNazwisko] = useState('')
    const [email, setEmail] = useState('')
    const [telefon, setTelefon] = useState('')

    const [customer, setCustomer] = useState({
        name: '',
        surname: '',
        email: '',
        tel: ''
    })

    const SaveCustomer = (imie, nazwisko, email, telefon) => {
        const newCustomer = {
            name: imie,
            surname: nazwisko,
            Email: email,
            Tel: telefon
        }
        setCustomer(newCustomer);
    }

    const OnSeatClick = (seat) => {
        const seatNum = parseInt(seat);
        const newSeat = {
            Rzad: Math.floor(seatNum / 10) + 1, 
            Miejsce: (seatNum % 10) + 1,
            Zajete: true
        };
        
        const seatExists = seats.some(existingSeat => 
            existingSeat.Rzad === newSeat.Rzad && 
            existingSeat.Miejsce === newSeat.Miejsce
        );
        
        if (!seatExists) {
            setSeats([...seats, newSeat]);
        } else {
            setSeats(seats.filter(existingSeat => 
                !(existingSeat.Rzad === newSeat.Rzad && 
                  existingSeat.Miejsce === newSeat.Miejsce)
            ));
        }
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">System rezerwacji miejsc w kinie</h1>
            
            <DataContext.Provider 
                value={{
                    imie, setImie, 
                    nazwisko, setNazwisko,
                    email, setEmail,
                    telefon, setTelefon,
                    customer, setCustomer, 
                    seats, setSeats, 
                    OnSeatClick,
                    SaveCustomer, 
                    setResult
                }}>
                
                <div className="row">
                    <div className="col-md-6">
                        <SeatsOn />
                        <InputSeat />
                    </div>
                    <div className="col-md-6">
                        <FormExample />
                        {result && <ResultOrder />}
                    </div>
                </div>
            </DataContext.Provider>
        </div>
    )
}

export default App