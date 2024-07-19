import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ServiceCard = ({ image, title, description, buttonText, buttonLink }) => {
    return (
        <Card className="h-100 shadow-sm rounded-lg">
            <Card.Img variant="top" src={image} />
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title className="font-bold">{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </div>
                <Button variant="primary" href={buttonLink} target="_blank">{buttonText}</Button>
            </Card.Body>
        </Card>
    );
}

export default ServiceCard;
