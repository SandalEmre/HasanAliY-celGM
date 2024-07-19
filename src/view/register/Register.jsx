import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRadio, MDBRow } from "mdb-react-ui-kit";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useLocation } from 'react-router-dom';
import LoadingSpinner from "../../components/LoadingSpinner";

function Register() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('id'); // URL'den 'id' parametresini al

    const [isLoading, setIsLoading] = useState(false); // isLoading state'i eklendi, başlangıçta false

    useEffect(() => {
        console.log(`Course ID: ${courseId}`); // Konsola courseId'yi logla, doğru alınıp alınmadığını kontrol et
    }, [courseId]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const backgroundImageUrl = 'https://hasanaliyucel.atakum.bel.tr/img/slider/background.png';

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Form gönderilirken yükleme durumu başlatılıyor

        try {
            // Firestore'a kayıt ekleme işlemi
            const docRef = await addDoc(collection(db, `courses/${courseId}/Registrants`), {
                firstName,
                lastName,
                birthday,
                gender,
                email,
                phoneNumber,
                registrationDate: Timestamp.now() // Başvuru tarihini ekle
            });
            console.log("Document written with ID: ", docRef.id);

            // Başvuru formunu temizleme
            setFirstName('');
            setLastName('');
            setBirthday('');
            setGender('');
            setEmail('');
            setPhoneNumber('');

            setIsLoading(false); // Yükleme tamamlandı, yükleme durumu false yapılıyor

            // Başvuru başarıyla kaydedildi mesajı veya yönlendirme ekleyebilirsiniz
            alert("Başvurunuz başarıyla kaydedildi!");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Başvuru sırasında bir hata oluştu.");
            setIsLoading(false); // Hata durumunda da yükleme durumu false yapılıyor
        }
    };

    // Yükleme durumunda LoadingSpinner gösterilmesi
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="header"
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
             }}>
            <MDBContainer fluid className="pt-24">
                <MDBRow className='justify-content-center align-items-center m-5'>
                    <MDBCard>
                        <MDBCardBody className='px-4'>
                            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Kayıt Formu</h3>
                            <form onSubmit={handleSubmit}>
                                <MDBRow>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='Ad' size='lg' id='form1' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    </MDBCol>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='Soyad' size='lg' id='form2' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='Doğum Tarihi' size='lg' id='form3' type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                                    </MDBCol>
                                    <MDBCol md='6' className='mb-4'>
                                        <h6 className="fw-bold">Cinsiyet: </h6>
                                        <MDBRadio name='inlineRadio' id='inlineRadio1' value='Female' label='Kadın' inline onChange={(e) => setGender(e.target.value)} required />
                                        <MDBRadio name='inlineRadio' id='inlineRadio2' value='Male' label='Erkek' inline onChange={(e) => setGender(e.target.value)} required />
                                        <MDBRadio name='inlineRadio' id='inlineRadio3' value='Other' label='Diğer' inline onChange={(e) => setGender(e.target.value)} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='E-posta' size='lg' id='form4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </MDBCol>
                                    <MDBCol md='6'>
                                        <MDBInput wrapperClass='mb-4' label='Telefon Numarası' size='lg' id='form5' type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBBtn className='mb-4' size='lg' type="submit">Gönder</MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Register;
