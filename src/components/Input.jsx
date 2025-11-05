import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useContext } from 'react';
import DataContext from '../contexts/DataContext';

function InputSeat() {
    const [nrRzadu, setNrRzadu] = useState('')
    const [nrKrzesla, setNrKrzesla] = useState('')
    const { setSeats, seats } = useContext(DataContext);

    const handleAddSeat = () => {
        if (nrRzadu && nrKrzesla) {
            const newSeat = {
                Rzad: parseInt(nrRzadu),
                Miejsce: parseInt(nrKrzesla),
                Zajete: true
            };
            
            const seatExists = seats.some(existingSeat => 
                existingSeat.Rzad === newSeat.Rzad && 
                existingSeat.Miejsce === newSeat.Miejsce
            );
            
            if (!seatExists) {
                setSeats([...seats, newSeat]);
                setNrRzadu('');
                setNrKrzesla('');
            } else {
                alert('To miejsce jest już zarezerwowane!');
            }
        }
    };

    return (
        <div className="mb-4">
            <h5>Ręczne dodawanie miejsc:</h5>
            <InputGroup className="mb-2">
                <InputGroup.Text>Nr rzędu</InputGroup.Text>
                <Form.Control
                    value={nrRzadu}
                    onChange={(e) => setNrRzadu(e.target.value)}
                    type="number"
                    min="1"
                    max="5"
                    placeholder="1-5"
                />
            </InputGroup>
            
            <InputGroup className="mb-2">
                <InputGroup.Text>Nr miejsca</InputGroup.Text>
                <Form.Control
                    value={nrKrzesla}
                    onChange={(e) => setNrKrzesla(e.target.value)}
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1-10"
                />
            </InputGroup>
            
            <button 
                className="btn btn-secondary w-100"
                onClick={handleAddSeat}
                disabled={!nrRzadu || !nrKrzesla}
            >
                Dodaj miejsce ręcznie
            </button>
        </div>
    );
}

export default InputSeat;