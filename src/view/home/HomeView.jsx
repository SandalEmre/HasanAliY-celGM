import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import AnnouncementSlider from "../../components/AnnouncementSlider";
import CourseCard from "../../components/CourseCard";
import ServiceCard from "../../components/ServiceCard";
import { db } from "../../firebase/Firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import logoata from '../../assets/images/atakum.png'; // Ensure the path to the image is correct

function HomeView() {
    const [courses, setCourses] = useState([]);
    const [services, setServices] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const coursesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCourses(coursesData);
        };

        const fetchServices = async () => {
            const querySnapshot = await getDocs(collection(db, "services"));
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesData);
        };
        const fetchAnnouncements = async () => {
            const querySnapshot = await getDocs(collection(db, "announcements"));
            const announcementsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAnnouncements(announcementsData);
        };
        fetchAnnouncements();
        fetchCourses();
        fetchServices();
    }, []);

    const backgroundImageUrl = 'https://hasanaliyucel.atakum.bel.tr/img/slider/background.png';
    const yucelImageUrl = 'https://th.bing.com/th/id/OIP.1ZBalUq6cgI8Yfbxj1kmkQAAAA?rs=1&pid=ImgDetMain';

    const handleRegisterClick = (courseId, title) => {
        console.log(courseId); // courseId'yi konsola logla, doğru değer alınıp alınmadığını kontrol et
        navigate(`/register?id=${courseId}&${title}`);
    };

    return (
        <div>
            <div className="main-content">
                <div
                    className="header"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative' // Ensure relative positioning for absolute child
                    }}
                >
                    <AnnouncementSlider announcements={announcements}/>
                    <div className="logo-container relative">


                </div>
            </div>
            <div className="container mx-auto mt-10 px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Hasan Ali Yücel Kimdir?</h2>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8 flex">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-grow">
                            <img
                                className="w-full h-full object-cover"
                                    src={yucelImageUrl}
                                    alt="Hasan Ali Yücel"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-8 flex">
                            <div className="bg-white shadow-lg rounded-lg p-6 flex-grow">
                                <p className="text-gray-700">
                                    Hasan Ali Yücel (1897-1961), Türkiye'nin önemli eğitimcilerinden ve yazarlarından biridir.
                                    İstanbul Üniversitesi Edebiyat Fakültesi Felsefe Bölümü'nden mezun olduktan sonra çeşitli okullarda öğretmenlik yapmıştır.
                                    1938-1946 yılları arasında Milli Eğitim Bakanı olarak görev yapmıştır.
                                    Bakanlığı döneminde Köy Enstitüleri'nin kurulmasına öncülük etmiş ve Türkiye'de eğitimin modernleşmesine büyük katkılarda bulunmuştur.
                                    <br /><br />
                                    Hasan Ali Yücel, kültürel alanda da önemli çalışmalar yapmış, Türk klasiklerinin yanı sıra dünya edebiyatından pek çok eserin Türkçeye kazandırılmasını sağlamıştır.
                                    Kendisi de pek çok eser kaleme almış, eğitim ve kültür alanında derin izler bırakmıştır.
                                    <br /><br />
                                    1961 yılında vefat eden Hasan Ali Yücel, arkasında büyük bir kültürel miras ve eğitim alanında yapılan reformlarla hatırlanmaktadır.
                                    <br /><br />
                                    Hasan Ali Yücel Gençlik Merkezi, onun adını taşıyan bir kültür ve eğitim merkezi olarak Atakum belediyesi tarafından gençlere hizmet vermektedir.
                                </p>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4 text-center mt-12 text-gray-800">HASAN ALİ YÜCEL EĞİTİM MERKEZİ</h2>
                    <h3 className="text-2xl font-semibold mb-4 text-center text-gray-600">HASAN ALİ YÜCEL GENÇLİK BİLİM VE SANAT MERKEZİ'NDE YOK YOK!</h3>
                    <p className="text-lg text-center mb-8 text-gray-700">
                        Atakum'da binlerce genci eğitim, sanat ve teknolojiyle buluşturan Hasan Ali Yücel Gençlik Bilim ve Sanat Merkezi, çeşitli hizmetler veriyor.
                    </p>
                    <div className="flex flex-wrap -mx-4">
                        {courses.map((course, index) => (
                            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                                <CourseCard
                                    id={course.id}
                                    image={course.image}
                                    title={course.title}
                                    description={course.description}
                                    onRegisterClick={() => handleRegisterClick(course.id, course.title)}
                                />
                            </div>
                        ))}
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4 text-center mt-12 text-gray-800">HASAN ALİ YÜCEL GENÇLİK VE BİLİM MERKEZİ</h2>
                    <h3 className="text-2xl font-semibold mb-4 text-center text-gray-600">HİZMETLERİMİZ</h3>
                    <div className="flex flex-wrap -mx-4">
                        {services.map((service, index) => (
                            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                                <ServiceCard
                                    image={service.image}
                                    title={service.title}
                                    description={service.description}
                                    buttonText={service.buttonText}
                                    buttonLink={service.buttonLink}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 flex flex-wrap items-start">
                        <div className="w-full md:w-1/2 px-4">
                            <div className="shadow-lg rounded-lg overflow-hidden mb-8">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7414435409883!2d36.263279976637364!3d41.33623537130645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4088793b14aa0be5%3A0x915be816a99309a9!2sHasan%20Ali%20Y%C3%BCcel%20Gen%C3%A7lik%20Bilim%20ve%20Sanat%20Merkezi!5e0!3m2!1str!2str!4v1721202438542!5m2!1str!2str"                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="flex justify-center space-x-4 mb-8">
                                <a href="https://www.instagram.com/hasanaliyucelgbsm/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" className="text-gray-700 hover:text-gray-900"/>
                                </a>
                                <a href="https://www.facebook.com/hasanaliyucelgbsm" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebook} size="2x" className="text-gray-700 hover:text-gray-900"/>
                                </a>
                                <a href="https://www.youtube.com/channel/UCRwLbOaG9DjI8TE4FBXyfFQ" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faYoutube} size="2x" className="text-gray-700 hover:text-gray-900"/>
                                </a>
                                <a href="https://twitter.com/hasanaliyucelgb" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} size="2x" className="text-gray-700 hover:text-gray-900"/>
                                </a>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <div className="shadow-lg rounded-lg overflow-hidden mb-8">
                                <div className="bg-gray-800 text-white p-4">
                                    <h3 className="text-lg font-semibold mb-2">Adres</h3>
                                    <p className="text-sm">Hasan Ali Yücel Gençlik Bilim ve Sanat Merkezi</p>
                                    <p className="text-sm">Atakum, Samsun</p>
                                    <h3 className="text-lg font-semibold mt-4 mb-2">İletişim</h3>
                                    <p className="text-sm">Telefon: 0362 311 11 11</p>
                                    <p className="text-sm">E-posta: info@hasanaliyucelgbm.com.tr</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
