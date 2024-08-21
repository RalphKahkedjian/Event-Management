import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../assets/style.css';
import Menu from '../assets/images/menu.png';
import AddTicket from '../assets/controller/AddTicket';

function Ticket() {

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const showSide = ()=> {
    setShow(!show);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedUser && storedEmail) {
      setUser(JSON.parse(storedUser));
      setEmail(storedEmail);
      setPassword(storedPassword);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const welcomeMessage = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return <h3 className='font-weight-light text-center'>Good Morning</h3>;
    } else if (hours >= 12 && hours < 18) {
      return <h3 className='font-weight-normal text-center'>Good Afternoon</h3>;
    } else {
      return <h3 className='font-weight-normal text-center'>Good Evening</h3>;
    }
  };


  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='container-fluid ' style={{ minHeight: '100vh', backgroundColor :'#E4E3E3', height:'auto'}}>
      <div
        id="sidebar"
        className="sidebar d-flex flex-column p-3 bg-dark"
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: show ? '0' : '-100%' ,
          transition :'left 0.5s ease-in-out',
          backdropFilter: 'blur(10px)',
          zIndex : 1000
        }}
      >
        <div className='mt-5 text-center font-weight-normal text-light'>
          {welcomeMessage()} <span className='font-weight-bold'><h2 className='my-3'>{user?.name}</h2></span>
        </div>
        <hr style={{ borderTop: '3px solid white', margin: '1rem 0' }} />
        <ul className="nav flex-column d-flex align-items-center mt-5">
          <li className="nav-item mb-2">
            <Link className="nav-link text-light font-weight-bold" to="/home">
              Profile
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-light font-weight-bold" to="/ticket">
              Tickets
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-light font-weight-bold" to="/booking">
              Bookings
            </Link>
          </li>
          <li className="nav-item mb-2">
            <button className="nav-link text-light font-weight-bold btn btn-link p-0" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
        <p className='text-center text-light' style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
          &copy; 2024 . All rights reserved
          <br />
          Ralph Kahkedjian
        </p>
      </div>
      <div className='container-fluid w-100 bg-dark d-flex justify-content-between align-items-center' style={{position:'fixed', left:0, height: '6vh', zIndex :1200}}>
        <button className='btn' onClick={showSide} style={{}}>
        <img src={Menu} style={{width:'45px'}}></img>
        </button>
        <h5 className='text-light' style={{transform: 'translateY(4px) translateX(-20px)'}}>Ralph Events</h5>
      </div>
      <div
        className="content"
        style={{
          marginLeft: show ? '150px' : '0px',
          padding: '20px',
          transition :'all 0.5s ease-in-out',
        }}
      >
        <div className='container d-flex flex-column align-items-center'>
          <h1 className='text-center text-dark' style={{marginTop :'140px'}}>
            Your Tickets
          </h1>
          <p className='text-center text-dark my-1'>
            Create your tickets here!
          </p>
          <AddTicket />
        </div>
      </div>
    </div>
  );
}

export default Ticket;
