

import React from 'react';
import ServiceCard from "./ServiceCard";
import { Col, Row } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Stay ahead of the weather and make every day a perfect adventure!",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Discover the world with the best tour guides, making every journey unforgettable!",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Tailor your experience with personalized options to make every moment unique.",
  },
];

const ServiceList = () => {
  return (
    <Row>
      {servicesData.map((item, index) => (
        <Col lg="4" md="6" sm="12" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default ServiceList;
