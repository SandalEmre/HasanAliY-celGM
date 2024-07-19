import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

function ExampleCarouselImage({ image, text }) {
    const imageStyle = {
        width: '800px',
        height: '400px',
        objectFit: 'cover'
    };

    return (
        <div>
            <img
                className="d-block w-100"
                src={image}
                alt={`${text} slide`}
                style={imageStyle}
            />
        </div>
    );
}

ExampleCarouselImage.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

function AnnouncementSlider({ announcements }) {
    return (
        <Carousel slide={false}>
            {announcements.map((announcement, index) => (
                <Carousel.Item key={index}>
                    <ExampleCarouselImage image={announcement.image} text={announcement.text} />
                    <Carousel.Caption>
                        <h3>{announcement.label}</h3>
                        <p>{announcement.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

AnnouncementSlider.propTypes = {
    announcements: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default AnnouncementSlider;