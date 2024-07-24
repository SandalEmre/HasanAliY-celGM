import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../../firebase/Firebase";

function Apply() {
    const location = useLocation();
    const navigate = useNavigate();
    const { job } = location.state || { job: {} };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        birthDate: '', // Yeni eklenen alan
        resumeFile: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume' && files) {
            setFormData((prevData) => ({
                ...prevData,
                resumeFile: files[0]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (job && job.id && formData.resumeFile) {
                const jobId = String(job.id);
                const applicationsRef = collection(db, 'jobListings', jobId, 'applications');

                // Upload resume file to Firebase Storage
                const resumeRef = ref(storage, `resumes/${jobId}/${formData.resumeFile.name}`);
                await uploadBytes(resumeRef, formData.resumeFile);

                // Get the download URL of the uploaded resume
                const resumeURL = await getDownloadURL(resumeRef);

                // Add the application data to Firestore
                await addDoc(applicationsRef, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    gender: formData.gender,
                    birthDate: formData.birthDate, // Doğum tarihini ekleme
                    resume: resumeURL // Save the resume URL
                });

                alert('Başvurunuz alındı!');
                navigate('/'); // Redirect to the homepage
            } else {
                alert('Başvuru için bir iş ilanı seçmediniz veya özgeçmiş dosyasını seçmediniz.');
            }
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Başvuru sırasında bir hata oluştu.');
        }
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
                                <label className="block text-left mb-2 font-semibold" htmlFor="firstName">Adınız:</label>
                                <input
                                    className="w-full p-2 border rounded"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="lastName">Soyadınız:</label>
                                <input
                                    className="w-full p-2 border rounded"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="email">E-posta Adresiniz:</label>
                                <input
                                    className="w-full p-2 border rounded"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="gender">Cinsiyet:</label>
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
                                <label className="block text-left mb-2 font-semibold" htmlFor="birthDate">Doğum Tarihi:</label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-left mb-2 font-semibold" htmlFor="resume">Özgeçmiş:</label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
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
