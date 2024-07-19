import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';

import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/Firebase"; // Firebase bağlantısını içeren dosyayı import edin

const Cafeteria = () => {
    const [activeCategory, setActiveCategory] = useState('drinks'); // Default active category
    const [menuItems, setMenuItems] = useState([]);
    const backgroundImageUrl = 'https://hasanaliyucel.atakum.bel.tr/img/slider/background.png';

    // Firestore'dan verileri çekme işlemi
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const menuSnapshot = await getDocs(collection(db, 'cafeteria'));
                const menuData = menuSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log(menuData)
                setMenuItems(menuData);
            } catch (error) {

                console.error('Error fetching menu items: ', error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div>
            <div
                className="header"
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',  // Full screen height
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Container className="py-4">
                    <Row className="mb-4">
                        <Col>
                            <Button
                                variant="primary"
                                className={`mr-2 ${activeCategory === 'drinks' ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('drinks')}
                            >
                                Drinks
                            </Button>
                            <Button
                                variant="primary"
                                className={`mr-2 ${activeCategory === 'food' ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('food')}
                            >
                                Food
                            </Button>
                            {/* Add more categories as needed */}
                        </Col>
                    </Row>
                    <Row>
                        {menuItems
                            .filter(item => item.category === activeCategory)
                            .map(item => (
                                <Col key={item.id} md={6} lg={4} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={item.image}/>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>Price: {item.price}</Card.Text>
                                            <Card.Text className="small">Ingredients: {item.ingredients}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Cafeteria;
