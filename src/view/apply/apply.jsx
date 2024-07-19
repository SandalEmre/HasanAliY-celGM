import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Apply() {
    const location = useLocation();
    const { job } = location.state || { job: {} };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        resume: '',
        resumeFile: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume' && files) {
            setFormData((prevData) => ({
                ...prevData,
                resume: URL.createObjectURL(files[0]),
                resumeFile: files[0]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form verilerini işleme kodu burada yer alacak
        console.log('Başvuru verileri:', formData);
        alert('Başvurunuz alındı!');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-6">Başvuru Formu</h1>
                {job ? (
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                        <h3 className="text-xl mb-4">{job.company}</h3>
                        <p className="mb-2"><strong>Lokasyon:</strong> {job.location}</p>
                        <p>{job.description}</p>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="name">Adınız:</label>
                                <input className="w-full p-2 border rounded" type="text" id="name" name="name"/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="surname">Soyadınız:</label>
                                <input className="w-full p-2 border rounded" type="text" id="surname" name="surname"/>
                            </div>

                            <div className="mb-4">

                                <label className="block text-left mb-2 font-semibold" htmlFor="age">Yaşınız:</label>
                                <input className="w-full p-2 border rounded" type="number" id="age" name="age"/><br/>

                            </div>
                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="email">E-posta
                                    Adresiniz:</label>
                                <input className="w-full p-2 border rounded" type="email" id="email" name="email"/><br/>

                            </div>
                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold"
                                       htmlFor="gender">Cinsiyet:</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="erkek">Erkek</option>
                                    <option value="kadın">Kadın</option>
                                    <option value="diğer">Diğer</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold"
                                       htmlFor="resume">Özgeçmiş:</label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                {formData.resume && (
                                    <div className="mt-2">
                                        <a href={formData.resume} target="_blank" rel="noopener noreferrer">
                                            Özgeçmişi Görüntüle
                                        </a>
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>
                ) : (
                    <p>Başvuru için bir iş ilanı seçmediniz.</p>
                )}
            </div>
        </div>
    );
}

export default Apply;