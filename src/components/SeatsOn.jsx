import React, { useContext } from 'react';
import DataContext from '../contexts/DataContext';

function SeatsOn(){
    const liczboweSeats = Array.from({ length: 50 }, (_, i) => i.toString());
    const {seats, setSeats} = useContext(DataContext);

    const getSeatStatus = (seat) => {
        const seatNum = parseInt(seat);
        const newSeat = {
            Rzad: Math.floor(seatNum / 10) + 1, 
            Miejsce: (seatNum % 10) + 1
        };
        
        const seatExists = seats.some(existingSeat => 
            existingSeat.Rzad === newSeat.Rzad && 
            existingSeat.Miejsce === newSeat.Miejsce
        );
        
        return seatExists ? 'btn-success' : 'btn-outline-primary';
    };

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
        <div className="Seats mb-4">
            <h4>Miejsca w kinie:</h4>
            <div className="seats-grid">
                {liczboweSeats.map(seat => (
                    <button
                        key={seat}
                        onClick={() => OnSeatClick(seat)}
                        className={`btn ${getSeatStatus(seat)} m-1 seat-btn`}
                    >
                        {parseInt(seat) % 10 + 1}
                    </button>
                ))}
            </div>
            <div className="mt-2">
                <small className="text-muted">
                    Ekran
                </small>
                <div className="screen"></div>
            </div>
        </div>
    );
};

export default SeatsOn;