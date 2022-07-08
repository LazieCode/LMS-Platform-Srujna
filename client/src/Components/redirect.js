// import React from 'react'
// import {useNavigate} from "react-router-dom";
// const redirect = () => {

//     return (

//     )
// }

// export default redirect

import React from 'react';
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>redirect
                <button type="submit" onClick={() => navigate("/")} />
            </div>
        </>
    )
};

export default Home;