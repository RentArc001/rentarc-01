import React from 'react'
import './Hero.css'
import store from './Buy at online shop - 2004x1500 1.png'
function Hero() {
  return (
    <div className='hero'>
        <div className='hero__content'>
                <p className='heading'>A Complete Rental Website for you</p>
                <img className='store' src={store} alt="" />
                <p className='description'>RentArc enables one to rent different products near them . We also provide functionality to give your products for rent to others </p>
                <button className='rent'>Rent Now</button>
                <button className='give'>Give for rent</button>
        </div>    
      
    </div>
  )
}

export default Hero
