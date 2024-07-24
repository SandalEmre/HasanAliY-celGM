import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../../firebase/Firebase";

function JobApplication() {
    const backgroundImageUrl = 'https://hasanaliyucel.atakum.bel.tr/img/slider/background.png';
    const [jobListings, setJobListings] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'jobListings'));
                const jobs = [];
                querySnapshot.forEach((doc) => {
                    jobs.push({ id: doc.id, ...doc.data() }); // id burada documentId
                });
                setJobListings(jobs);
            } catch (error) {
                console.error("Error fetching job listings: ", error);
            }
        };


        fetchJobListings();
    }, []);

    const handleApply = () => {
        console.log('Selected Job:', selectedJob); // Hata ayıklama
        navigate('/apply', { state: { job: selectedJob } });
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-6">İş İlanları</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <ul>
                            {jobListings.map((job) => (
                                <li
                                    key={job.id}
                                    className="bg-white p-4 mb-4 rounded-lg shadow cursor-pointer hover:shadow-lg"
                                    onClick={() => setSelectedJob(job)}
                                >
                                    <h2 className="text-xl font-semibold">{job.title}</h2>
                                    <p>{job.company} - {job.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        {selectedJob ? (
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                                <h3 className="text-xl mb-4">{selectedJob.company}</h3>
                                <p className="mb-2"><strong>Lokasyon:</strong> {selectedJob.location}</p>
                                <p>{selectedJob.description}</p>
                                <button
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    onClick={handleApply}
                                >
                                    Başvur
                                </button>
                            </div>
                        ) : (
                            <p>Bir iş ilanı seçiniz.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobApplication;


