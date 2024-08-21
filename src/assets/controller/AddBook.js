import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddBooking() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTickets();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.get('http://127.0.0.1:8000/api/User/Ticket', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ticketsWithStatus = response.data.tickets.map(ticket => ({
        ...ticket,
        booked: ticket.booked
      }));

      setTickets(ticketsWithStatus);
      setLoading(false);

    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const bookTicket = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.post('http://127.0.0.1:8000/api/User/Booking', {
        ticket_id: ticketId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === ticketId
            ? { ...ticket, spots: ticket.spots - 1, booked: true, status: ticket.spots - 1 <= 0 ? "Booked" : ticket.status }
            : ticket
        )
      );

      console.log(response.data);
    } catch (err) {
      console.error('An error occurred:', err.response ? err.response.data : err.message);
    }
  }

  return (
    <>
      {loading ? (
        <div className="mt-5 text-dark" style={{ height: '100vh' }}>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='card bg-dark text-light w-75 text-center my-5'>
          <h3 className='mt-3 mb-4'>Available Tickets:</h3>
          {tickets.length > 0 ? (
            <ul>
              {tickets.map(ticket => (
                <li key={ticket.id} className='mb-4 justify-content-between list-unstyled'>
                  Ticket ID: {ticket.id} - Place: {ticket.place} - Time: {ticket.time} - Price: {ticket.price} - Spots: {ticket.spots} - Status: {ticket.status}
                  <br></br>
                  {ticket.booked ? 
                  <button 
                    className='btn btn-light text-dark float-center p-n5 my-3' 
                    style={{ marginRight: '15px', height: '4.5vh' }} 
                    disabled
                  >
                    Booked
                  </button>
                  : 
                  <button 
                    className='btn btn-light text-dark float-center p-n5 my-3' 
                    style={{ marginRight: '15px', height: '4.5vh' }} 
                    onClick={() => bookTicket(ticket.id)}
                  >
                    Book
                  </button>
                    }
                  <hr style={{ border: '4px solid white' }} className='mt-2'></hr>
                </li>
              ))}
            </ul>
          ) : (
            <h7 className='text-light'>
              No tickets available at this moment
            </h7>
          )}
        </div>
      )}
    </>
  );
}

export default AddBooking;
