import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mainlayout({children}) {
  return (
    <div>
        <header>
        <nav className="navbar navbar-light bg-primary">
            <div className='container-fluid'>
                <Link to="/pos" className='navbar-brand'>POS</Link>
                <a class="navbar-brand" href="/order">Order</a>
                <Link to="/new" className='navbar-brand'>New</Link>
            </div>
        </nav>

        </header>
        <main>
            <div className='container mt-3'>
            {children}
            </div>
            <ToastContainer />
          
        </main>
       
    </div>
  )
}

export default Mainlayout