import React from 'react'

const Navbar = (props) => {
    return (
        <div className="row">
            
            <div className="col-md-6">
                <h1 className="title">Weather-App</h1>
            </div>

            <div className="col-md-6">
                <form action="" className="region" onSubmit={e => props.changeWeather(e)}>
                    <input type="text" className="regioninput" placeholder="Enter City" onChange={ e => props.changeRegion(e.target.value)}/>
                </form>
            </div>
            
        </div>
    )
}

export default Navbar
