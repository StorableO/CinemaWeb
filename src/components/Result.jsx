import React, { useContext } from "react";
import DataContext from "../contexts/DataContext";
import { Card, ListGroup } from "react-bootstrap";

function ResultOrder(){
    const { customer, seats } = useContext(DataContext)

    return(
        <Card style={{ width: '100%' }} className="mt-4">
            <Card.Body>
                <Card.Title>Rezerwacja zakończona</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <strong>Klient:</strong> {customer.name} {customer.surname}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Email:</strong> {customer.Email}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Tel:</strong> {customer.Tel}
                </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Text>
                    <strong>Zarezerwowane miejsca:</strong>
                </Card.Text>
                <ListGroup>
                    {seats.map((seat, index) => (
                        <ListGroup.Item key={index}>
                            Rząd: {seat.Rzad}, Miejsce: {seat.Miejsce}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default ResultOrder;