import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ id, image, title, description, onRegisterClick }) => {
    return (
        <Card className="h-100 shadow-sm rounded-lg">
            <Card.Img variant="top" src={image} className="rounded-t-lg" />
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title className="font-bold">{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </div>
                <Button variant="primary" className="mt-auto" onClick={onRegisterClick}>Başvuru Yap</Button>
            </Card.Body>
        </Card>
    );
}

export default CourseCard;
