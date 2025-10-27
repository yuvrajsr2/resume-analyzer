import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

import axios from 'axios'




// fix the styling for the page : todo today fix stlying 
// cnat think anything right now : do later

// also need to implement some security fixes like : not being able to analyze until we have one or the other 
// to save api calls





const HomePage = () => {


    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
    const [resumeText, setResumeText] = useState('');
    const [jobDescriptionText, setJobDescriptionText] = useState('');
    const [results, setResults] = useState(null);

    const navigate = useNavigate();


    const handleResumeFileChange = (e) => {
        setResumeFile(e.target.files[0])
    }

    const handleJobDescriptionFileChange = (e) => {
        setJobDescriptionFile(e.target.files[0])
    }

    const handleResumeTextChange = (e) => {
        setResumeText(e.target.value)
    }

    const handleJobDescriptionTextChange = (e) => {
        setJobDescriptionText(e.target.value)
    }

    const handleAnalyze = async () => {
        const data = new FormData();

        if (resumeFile) data.append("resume", resumeFile);
        if (jobDescriptionFile) data.append("jobDescription", jobDescriptionFile);
        if (resumeText.trim()) data.append("resumeText", resumeText);
        if (jobDescriptionText.trim()) data.append("jobDescriptionText", jobDescriptionText);

        try {
            const res = await axios.post("http://localhost:5001/api/analyze", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResults(res.data);


            navigate("/analyze", {state: {results: res.data}});

            
        } catch (err) {
            console.error("Error analyzing:", err);
            alert("Error analyzing resume. Please try again.");
        }

        
    };




    return (
        <div className="flex flex-col h-screen">
            <header className="flex justify-center items-center bg-sky-900 py-4">
                <h1 className="text-3xl font-bold text-amber-500">Resume Analyzer</h1>
            </header>
            <main className="flex grow flex-col justify-center items-center bg-amber-50">
                <div className="mb-4">
                    <label htmlFor="resume-file" className="block text-lg font-medium mb-2">
                        Upload Resume:
                    </label>
                    <input
                        type="file"
                        id="resume-file"
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleResumeFileChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="job-description-file" className="block text-lg font-medium mb-2">
                        Upload Job Description:
                    </label>
                    <input
                        type="file"
                        id="job-description-file"
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleJobDescriptionFileChange}
                    />
                </div>

                <div className='mb-5 text-3xl text-green-400 font-bold'> OR </div>

                <div className="mb-4">
                    <label htmlFor="resume-text" className="block text-lg font-medium mb-2">
                        Enter Resume Text:
                    </label>
                    <textarea
                        id="resume-text"
                        className="block w-lg p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={resumeText}
                        onChange={handleResumeTextChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="job-description-text" className="block text-lg font-medium mb-2">
                        Enter Job Description Text:
                    </label>
                    <textarea
                        id="job-description-text"
                        className="block w-lg p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={jobDescriptionText}
                        onChange={handleJobDescriptionTextChange}
                    />
                </div>
                <button
                    onClick={handleAnalyze}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Analyze
                </button>

            </main>
        </div>
    )
}

export default HomePage;
