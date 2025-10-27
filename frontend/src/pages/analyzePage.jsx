import React, { use } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'


//Analyze page component
// things to build here: display analysis results, provide options to download or share results
// styling and layout with ResumeAnalyzer theme and header on top
// maybe a back button to go back to home page


// todo: fix res(state) styling today

const AnalyzePage = () =>{
    const location = useLocation();
    const navigate = useNavigate();

    const res = location.state?.results;

    if (!res) return(
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <p>No results found, Please try again</p>

            <button onClick={()=>navigate("/")} className='mt-4 bg-blue-600 text-white px-4 py-2 rounded'>Go Back</button>
        </div>
    )

    return(
        <div>
            Analyze page

        </div>
    )
}

export default AnalyzePage
