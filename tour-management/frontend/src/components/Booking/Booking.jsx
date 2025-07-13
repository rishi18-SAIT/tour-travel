import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '',
    totalPrice: 0,  // 🔥 Added totalPrice
  });

  const serviceFee = 10;

  const handleChange = e => {
    const { id, value } = e.target;

    // Automatically update totalPrice if guestSize changes
    if (id === 'guestSize') {
      const guestCount = Number(value);
      const newTotal = price * guestCount + serviceFee;

      setBooking(prev => ({
        ...prev,
        [id]: guestCount,
        totalPrice: newTotal,  // 🔥 update total price dynamically
      }));
    } else {
      setBooking(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleClick = async e => {
    e.preventDefault();

    try {
      if (!user) {
        return alert('Please sign in first!');
      }

      // ⚡ Always update totalPrice before sending in case guestSize is not updated yet
      const calculatedTotal = Number(price) * Number(booking.guestSize) + serviceFee;
      const bookingData = { ...booking, totalPrice: calculatedTotal };

      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(bookingData)  // ⬅️ Send totalPrice also
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      navigate("/thank-you");
    } catch (err) {
      console.error('Booking Error:', err.message);
      alert(err.message);
    }
  };

  const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee;

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price}<span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ========= Booking Form =========== */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input 
              type="text" 
              placeholder="Full Name" 
              id="fullName" 
              required 
              onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup>
            <input 
              type="number" 
              placeholder="Phone" 
              id="phone" 
              required 
              onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input 
              type="date" 
              id="bookAt" 
              required 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              placeholder="Guest" 
              id="guestSize" 
              min="1"
              required 
              onChange={handleChange} 
            />
          </FormGroup>

          <Button type="submit" className="btn primary__btn w-100 mt-4">
            Book Now
          </Button>
        </Form>
      </div>

      {/* ========= Booking Summary =========== */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> {booking.guestSize} {booking.guestSize > 1 ? 'people' : 'person'}
            </h5>
            <span>${Number(price) * Number(booking.guestSize)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
