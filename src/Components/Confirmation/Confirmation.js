import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Confirmation.css';

function Confirmation() {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [rentedPeriod, setRentedPeriod] = useState({
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    const productId = localStorage.getItem('productId');
    if (productId) {
      fetchProductDetails(productId);
    }
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:3000/Confirmation/${productId}`);
      setProduct(response.data.product);
      setName(`${response.data.renter.Firstname} ${response.data.renter.Lastname}`);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleFromDateChange = (e) => {
    setRentedPeriod((prevPeriod) => ({
      ...prevPeriod,
      fromDate: e.target.value,
    }));
  };

  const handleToDateChange = (e) => {
    setRentedPeriod((prevPeriod) => ({
      ...prevPeriod,
      toDate: e.target.value,
    }));
  };

  const calculateTotalPrice = () => {

    if (product && rentedPeriod.fromDate && rentedPeriod.toDate) {
      const { fromDate, toDate } = rentedPeriod;
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
  
      return product.price * days;
    }
    return 0;
  };

  return (
    <div>
      <div className="confirm">
        <div className="confirmation-page-main">
          <h1>Product Confirmation</h1>
          {product && (
            <div className="confirmation-page">
              <div className="confirmation-product-details">
                <div className="product-image-container-confirm">
                  <img src={product.images[0].url} alt="" className="product-image-confirm" />
                </div>
                <div className="product-info-main-confirm">
                  <div className="product-info-confirm">
                    <h2 className="product-name-confirm">{product.brand}</h2>
                    <h3 className="product-title-confirm">{product.title}</h3>
                    <p className="rent-per-day-confirm">{`Rent per Day: Rs.${product.price}`}</p>
                    <p className="owner-confirm">Owner: {name}</p>
                    <p className="location-confirm">Location: {`${product.place}, ${product.district}`}</p>
                    <div className="rented-period-confirm">
                      <label htmlFor="fromDate">From Date:</label>
                      <input
                        type="date"
                        id="fromDate"
                        value={rentedPeriod.fromDate}
                        onChange={handleFromDateChange}
                      />
                      <label htmlFor="toDate">To Date:</label>
                      <input
                        type="date"
                        id="toDate"
                        value={rentedPeriod.toDate}
                        onChange={handleToDateChange}
                      />
                    </div>
                  </div>
                </div>
                <p className="total-price-confirm" >{`Total Price: Rs.${calculateTotalPrice()}`}</p>
                <div className="confirmation-butt">
                  <button>Confirm & Pay</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Confirmation;