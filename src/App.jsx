import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './App.css';
import { useState } from 'react';

function App() {

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  const [isPriceInputValid, setIsPriceInputValid] = useState(false);
  const [isDiscountInputValid, setIsDiscountInputValid] = useState(false);

  const handleValidation = (tag) => {
    const { name, value } = tag;

    if (!!value.match(/^[0-9]*.?[0-9]+$/)) {
      // valid input
      if (name === "price") {
        setPrice(value);
        setIsPriceInputValid(false);
      } else if (name === "discount") {
        setDiscount(value);
        setIsDiscountInputValid(false);
      }
    } else {
      // invalid input
      if (name === "price") {
        setPrice(value);
        setIsPriceInputValid(true);
      } else if (name === "discount") {
        setDiscount(value);
        setIsDiscountInputValid(true);
      }
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const discountAmount = (price * discount) / 100;
    setFinalPrice(price - discountAmount);
  };

  const handleReset = () => {
    setPrice("");
    setDiscount("");
    setFinalPrice(0);
    setIsPriceInputValid(false);
    setIsDiscountInputValid(false);
  };

  return (
    <>
      <div id='all' style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center'>
        <div className='box bg-warning p-5 rounded'>
          <h2 className='text-center text-danger fw-bolder' style={{ textDecoration: 'underline' }}>Discount Calculator</h2>

          <div className="d-flex justify-content-center align-items-center p-5 rounded bg-success">
            <h1 className='text-info'>&#8377;{finalPrice.toFixed(2)}</h1>
          </div>

          <div className='container mt-5'>
            <form className='border rounded p-3 d-flex flex-column p-3'>
              <TextField 
                id="price" 
                name='price' 
                value={price} 
                label="Original Price" 
                variant="outlined" 
                onChange={e => handleValidation(e.target)} 
              />
              {isPriceInputValid && <div className="mb-2 text-danger fw-bolder">*Invalid Input</div>}

              <TextField 
                id="discount" 
                name='discount' 
                value={discount} 
                label="Discount Percentage" 
                variant="filled" 
                onChange={e => handleValidation(e.target)} 
              />
              {isDiscountInputValid && <div className="mb-2 text-danger fw-bolder">*Invalid Input</div>}
            </form>
          </div> 

          <div className='mt-3 d-flex justify-content-between'>
            <Button variant="contained" onClick={handleCalculate}>Calculate</Button>
            <Button variant="outlined" onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
