import React from 'react';
import './home.css';
import carro1 from './photo/carro1.jpg'
import carro2 from './photo/carro2.jpg'
import carro3 from './photo/carro3.jpg'
import Carousel from 'react-bootstrap/Carousel';

const Home = () => (
  <div className="home">
    <h1 className="home-title">Welcome in Universe</h1>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carro1}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carro2}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carro3}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
        <p className="home-description">
      We provide high-quality online education to students worldwide. Our mission is to empower learners with the knowledge and skills they need to succeed in their academic and professional careers.
    </p>
  </div>
);

export default Home;
