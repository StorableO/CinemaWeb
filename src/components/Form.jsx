import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import DataContext from '../contexts/DataContext';

function FormExample() {
    const {
        imie, setImie, 
        nazwisko, setNazwisko,
        email, setEmail,
        telefon, setTelefon,
        seats, 
        SaveCustomer, 
        setResult 
    } = useContext(DataContext);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else if (seats.length === 0) {
            alert('Proszę wybrać co najmniej jedno miejsce!');
            return;
        } else {
            SaveCustomer(imie, nazwisko, email, telefon);
            setResult(true);
        }
        
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h4>Dane klienta:</h4>
            
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Imię *</Form.Label>
                    <Form.Control
                        value={imie}
                        onChange={(e) => setImie(e.target.value)}
                        required
                        type="text"
                        placeholder="Wprowadź imię"
                    />
                    <Form.Control.Feedback type="invalid">
                        Imię jest wymagane
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Nazwisko *</Form.Label>
                    <Form.Control
                        value={nazwisko}
                        onChange={(e) => setNazwisko(e.target.value)}
                        required
                        type="text"
                        placeholder="Wprowadź nazwisko"
                    />
                    <Form.Control.Feedback type="invalid">
                        Nazwisko jest wymagane
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="validationCustom03">
                <Form.Label>Email *</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="adres@email.pl"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Proszę wprowadzić poprawny email
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom04">
                <Form.Label>Numer telefonu *</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text>+48</InputGroup.Text>
                    <Form.Control
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        type="tel"
                        placeholder="123456789"
                        required
                        pattern="[0-9]{9}"
                    />
                    <Form.Control.Feedback type="invalid">
                        Proszę wprowadzić poprawny numer telefonu (9 cyfr)
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <div className="mb-3">
                <strong>Wybrane miejsca: {seats.length}</strong>
                {seats.length > 0 && (
                    <div className="mt-2">
                        {seats.map((seat, index) => (
                            <span key={index} className="badge bg-primary me-1">
                                Rząd {seat.Rzad} - Miejsce {seat.Miejsce}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <Button type="submit" className="w-100">Zarezerwuj</Button>
        </Form>
    );
}

export default FormExample;