import React from 'react';
import './Home.scss';

const Home = () => (
  <section className="promo">
    <div className="promo__container">
      <div className="promo__wrap">
        <h1 className="promo__title">Собака — это не просто домашнее животное</h1>
        <p className="promo__text">Другу, который дает нам так много, хочется отдать столько же</p>
      </div>
      <img className="promo__img" src="./img/dogs.jpg" width="2191" height="913" alt="dogs" />
      <img className="promo__img promo__img_dark" src="./img/dog-dark.jpg" width="2191" height="913" alt="dogs" />
    </div>
  </section>
);

export default Home;
