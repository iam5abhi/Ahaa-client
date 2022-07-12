import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <Link class="navbar-brand" to='/'><b>AHAA Resturant</b></Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="nav navbar-nav justify-content-end" style={{width:"100%"}}>
          <li class="nav-item">
            <Link class="nav-link" to='/'>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default NavBar
