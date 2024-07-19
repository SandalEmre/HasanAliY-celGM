import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/images/atakum.png'; // Logo dosyasını import edin
import '../assets/css/BoostNavbar.css'; // Özel stil dosyasını import edin

function BoostNavbar({ isRegisterPage }) {
    const [navbarBackground, setNavbarBackground] = useState(isRegisterPage ? 'grey' : 'transparent');

    useEffect(() => {
        if (!isRegisterPage) {
            const handleScroll = () => {
                const currentScrollPos = window.pageYOffset;
                const headerHeight = 70; // Örneğin, header yüksekliği

                if (currentScrollPos > headerHeight) {
                    setNavbarBackground('#007bff'); // Scroll yukarıdan aşağıya geçişte arka plan rengini mavi yap
                } else {
                    setNavbarBackground('transparent'); // Scroll yukarı çıkarken arka plan rengini tekrar şeffaf yap
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isRegisterPage]);

    return (
        <Navbar bg={navbarBackground} expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="me-auto text-center">
                        <Nav.Link href="/" className="mx-2">Anasayfa</Nav.Link>
                        <Nav.Link href="#" className="mx-2">Etkinlikler</Nav.Link>
                        <Nav.Link href="#" className="mx-2">Hizmetler</Nav.Link>
                        <Nav.Link href="/cafeteria" className="mx-2">Yemekhane</Nav.Link>
                        <Nav.Link href="#about" className="mx-2">Hakkımızda</Nav.Link>
                        <Nav.Link href="/JobsApplication" className="mx-2">iş ilanı</Nav.Link>
                        <Nav.Link href="#contact" className="mx-2">İletişim</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="d-flex align-items-center ml-auto">
                    <span className="navbar-text ml-3">
                        HASAN ALİ YÜCEL GENÇLİK MERKEZİ
                    </span>
                </div>
            </Container>
        </Navbar>
    );
}

export default BoostNavbar;
