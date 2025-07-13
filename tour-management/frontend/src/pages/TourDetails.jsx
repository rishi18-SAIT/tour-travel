import React, { useEffect, useRef, useState, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from './../utils/avgRating';

import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from './../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews = [],
    city,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value.trim();

    if (!user || user === undefined || user === null) {
      alert('Please sign in');
      return;
    }

    if (!tourRating) {
      alert('Please select a star rating before submitting.');
      return;
    }

    if (!reviewText) {
      alert('Review cannot be empty.');
      return;
    }

    const reviewObj = {
      username: user.username,
      reviewText,
      rating: tourRating,
    };

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      alert(result.message);

      // Add new review to UI
      const newReview = {
        username: user.username,
        date: new Date(),
        rating: tourRating,
        text: reviewText,
      };

      setAllReviews((prev) => [newReview, ...prev]);
      reviewMsgRef.current.value = '';
      setTourRating(null);
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-s-fill"
                          style={{ color: 'var(--secondary-color)' }}
                        ></i>{' '}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          'Not rated'
                        ) : (
                          <span>({reviews.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-line"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"> {city}</i>
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line">
                          {' '}
                          {price} / per person
                        </i>
                      </span>
                      <span>
                        <i className="ri-group-line"> {maxGroupSize}</i>
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* Reviews Section */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews.length + allReviews.length} total)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setTourRating(star)}
                            className={tourRating === star ? 'active' : ''}
                          >
                            {star} <i className="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {[...reviews, ...allReviews].map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="avatar" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username || 'Anonymous'}</h5>
                                <p>
                                  {new Date(
                                    review.date || Date.now()
                                  ).toLocaleDateString('en-US', options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>
                              {review.text ||
                                review.reviewText ||
                                review.review ||
                                'No review text'}
                            </h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* End Reviews Section */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default TourDetails;
