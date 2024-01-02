import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [basicSalary, setBasicSalary] = useState('');
  const [dearnessAllowance, setDearnessAllowance] = useState('');
  const [hra, setHra] = useState('');
  const [totalRent, setTotalRent] = useState('');
  const [isMetrocity, setIsMetrocity] = useState();
  const [perofsalary, setPerofsalary] = useState('');
  const [rent, setRent] = useState('');
  const [exemptedhra, setExemptedhra] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
    setBasicSalary('');
    setDearnessAllowance('');
    setHra('');
    setTotalRent('');
    setIsMetrocity('');
    setPerofsalary('');
    setRent('');
    setExemptedhra('');
  }

  useEffect(() => {
    if (isMetrocity) {
      const add = parseInt(basicSalary) + parseInt(dearnessAllowance);
      const salary = 0.5 * (parseInt(basicSalary) + parseInt(dearnessAllowance));
      setPerofsalary(salary);
    }
    if (isMetrocity == false) {
      const salary = 0.4 * (parseInt(basicSalary) + parseInt(dearnessAllowance));
      setPerofsalary(salary);
    }
    if (totalRent) {
      const rent = totalRent - (0.1 * (parseInt(basicSalary) + parseInt(dearnessAllowance)));
      setRent(rent);
    }
    if (perofsalary && rent && hra) {
      const exehra = Math.min(perofsalary, rent, hra);
      setExemptedhra(exehra);
    }
  }, [basicSalary, dearnessAllowance, hra, totalRent, isMetrocity, perofsalary, rent])

  return (
    <>
      <div className="container">
        <div className='row'>
          <div className='column'>
            <form className="form">
              <h2 className="header">HRA Calculator</h2>
              <label>Basic salary recieved (per annum)</label>
              <input className="input" type="number" placeholder="Enter Basic salary" onChange={(e) => setBasicSalary(e.target.value)} />
              <label>Dearness Allowance recieved</label>
              <input className="input" type="number" placeholder="Enter Dearness allowance" onChange={(e) => setDearnessAllowance(e.target.value)} />
              <label>HRA recieved (per annum)</label>
              <input className="input" type="number" placeholder="Enter HRA" onChange={(e) => setHra(e.target.value)} />
              <label>Total rent paid</label>
              <input className="input" type="number" placeholder="Enter rent" onChange={(e) => setTotalRent(e.target.value)} />
              <p>Do you live in metro city?(Delhi, Mumbai, Kolkata, Chennai)</p>
              <div>
                <input type="radio" id="city1" value="yes" name="city" onChange={(e) => setIsMetrocity(true)}></input>
                <label htmlFor="city1">Yes</label>
                <input type="radio" id="city2" value="no" name="city" onChange={(e) => setIsMetrocity(false)}></input>
                <label htmlFor="city2">No</label>
              </div>

            </form>
          </div>
          <div className='column'>
            <form className="form1">
              <label>Actual HRA Received</label>
              <input className="input1" type="number" value={hra} readOnly />
              <label>Rent paid in excess of 10% of salary</label>
              <input className="input1" type="number" value={rent} readOnly />
              {isMetrocity ? <label>40% of Basic salary(For those living in metro cities)</label> : <label>50% of Basic salary(For those living in non metro cities)</label>}
              <input className="input1" type="number" value={perofsalary} readOnly />
              <label>Amount of Exempted HRA(Actual rent paid minus 10% of (Basic salary + Dearness allowance))</label>
              <input className="input1" type="number" value={exemptedhra} readOnly />
              <button className='calbtn' onClick={handleSubmit}>Calculate Again</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
