import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function header() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"> ReactJs </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        {/* <NavLink exact to="/" className="nav-link"> Home </NavLink> */}
                        <Link className="nav-link" to="/"> Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-student"> Add Student </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/list-student"> View List </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/parent"> Parent </Link>
                    </li>
                </ul>
                <span className="navbar-text">
                    PHP ReactJs Crud Application Using MySql
                </span>
                </div>
            </div>
        </nav>
    );
}