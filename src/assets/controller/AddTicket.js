import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

function AddTicket() { 
  const [place, setPlace] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [spots, setSpots] = useState('');
  const [status, setStatus] = useState('available');
  const [organizer_id, setOrganizerID] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User is not authenticated');
      }

      const formData = {
        place,
        price,
        time,
        spots,
        status,
        organizer_id,
      };

      setTickets([...tickets, formData]);
      setPlace('');
      setPrice('');
      setTime('');
      setSpots('');
      setStatus('available');
      setOrganizerID('');

      const response = await axios.post(
        'http://127.0.0.1:8000/api/User/Ticket',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setMessage('Ticket created successfully');
      setError('');

    } catch (err) {
      console.log(err.response?.data);
      alert(err.message);
      setError("Can't create a ticket");
      setMessage('');
    }
  };

  return (
    <>
      <button className='btn btn-dark mt-3' onClick={handleShow}>
        Add Ticket +
      </button>

      <Modal show={show} onHide={handleClose} className='my-4'>
        <Modal.Header closeButton>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Organizer ID"
                name="id"
                value={organizer_id}
                onChange={(e) => setOrganizerID(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event place"
                name="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ticket price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event time (HH:MM)"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSpots">
              <Form.Label>Spots</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter event spots"
                name="spots"
                value={spots}
                onChange={(e) => setSpots(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ticket's status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {message && (
        <div className='alert alert-success fade show w-50 mt-3 text-center' role='alert'>
          <span className='fw-bold'>Success: </span>{message}
          <div className="mt-4" style={{zIndex:'1'}}>
        {tickets.map((ticket, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{ticket.place}</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {ticket.organizer_id}<br />
                <strong>Price:</strong> {ticket.price}<br />
                <strong>Time:</strong> {ticket.time}<br />
                <strong>Spots:</strong> {ticket.spots}<br />
                <strong>Status:</strong> {ticket.status}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
        </div>
        
      )}
      {error && (
        <div className='alert alert-danger mt-3 w-50 text-center'>
          <span className='fw-bold'>Error: </span>{error}
        </div>
      )}
    </>
  );
}

export default AddTicket;
