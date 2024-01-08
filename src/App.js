import React, { useState, useEffect } from 'react';
import { numberToWords } from "amount-to-words";
import './App.css';

function App() {
  const [basicSalary, setBasicSalary] = useState('');
  const [dearnessAllowance, setDearnessAllowance] = useState('');
  const [hra, setHra] = useState('');
  const [totalRent, setTotalRent] = useState('');
  const [isMetrocity, setIsMetrocity] = useState(true);
  const [perofsalary, setPerofsalary] = useState('');
  const [rent, setRent] = useState('');
  const [exemptedhra, setExemptedhra] = useState('');
  const [highlightedInput, setHighlightedInput] = useState(null);

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
    if (basicSalary && dearnessAllowance && totalRent) {
      const numericBasicSalary = parseFloat(basicSalary.replace(/,/g, '')) || 0;
      const numericDearnessAllowance = parseFloat(dearnessAllowance.replace(/,/g, '')) || 0;
      const numericTotalRent = parseFloat(totalRent.replace(/,/g, '')) || 0;
      const numericHRA = parseFloat(hra.replace(/,/g, '')) || 0;

      console.log("console", numericBasicSalary, numericDearnessAllowance, numericTotalRent, numericHRA);

      let salary;
      if (isMetrocity) {
        salary = 0.5 * (numericBasicSalary + numericDearnessAllowance);
      } else {
        salary = 0.4 * (numericBasicSalary + numericDearnessAllowance);
      }

      setPerofsalary(salary.toLocaleString('en-IN'));

      const rentValue = numericTotalRent - 0.1 * (numericBasicSalary + numericDearnessAllowance);
      setRent(Math.max(0, rentValue).toLocaleString('en-IN'));

      const exehra = Math.min(numericHRA, rentValue, salary);
      console.log("values of execha", salary, rentValue, numericHRA);
      console.log("exehra", exehra);
      setExemptedhra(Math.max(0, exehra).toLocaleString('en-IN'));
      setHighlightedInput(exehra === salary ? 'basicSalary' : exehra === rentValue ? 'totalRent' : 'hra');

      setHra(numericHRA.toLocaleString('en-IN'));
      console.log("format numbers", basicSalary, dearnessAllowance, hra, totalRent);
    }
  }, [basicSalary, dearnessAllowance, hra, totalRent, isMetrocity, perofsalary]);

  console.log("hra", typeof (hra));

  // function formatNumber(number) {
  //   const parsedNumber = parseFloat(number.replace(/,/g, '')) || '';
  //   if (isNaN(parsedNumber)) {
  //     return '';
  //   }
  //   return parsedNumber.toLocaleString('en-IN');
  // }

  const handleInputChange = (value, setValue) => {
    const numericValue = parseFloat(value.replace(/,/g, '')) || 0;
    if (!isNaN(numericValue)) {
      setValue(numericValue.toLocaleString('en-IN'));
    }
    else {
      setValue('');
    }
  };

  return (
    <>
      <h2 className="header">HRA Calculator</h2>
      <div className="container">
        <div className='row'>
          <div className='column'>
            <form className="form">
              <label>Basic salary received (per annum)</label>
              <input
                className="input"
                type="text"
                placeholder="Enter Basic salary"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                onBlur={() => handleInputChange(basicSalary, setBasicSalary)}
              />
              {basicSalary && (
                <p className='words'>{numberToWords(parseFloat(basicSalary.replace(/,/g, '')))}</p>
              )}
              <label>Dearness Allowance received</label>
              <input
                className="input"
                type="text"
                placeholder="Enter Dearness allowance"
                value={dearnessAllowance}
                onChange={(e) => setDearnessAllowance(e.target.value)}
                onBlur={() => handleInputChange(dearnessAllowance, setDearnessAllowance)}
              />
              {dearnessAllowance && (
                <p className='words'>{numberToWords(parseFloat(dearnessAllowance.replace(/,/g, '')))}</p>
              )}
              <label>HRA received (per annum)</label>
              <input
                className="input"
                type="text"
                placeholder="Enter HRA"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
                onBlur={() => handleInputChange(hra, setHra)}
              />
              {hra && (
                <p className='words'>{numberToWords(parseFloat(hra.replace(/,/g, '')))}</p>
              )}
              <label>Total rent paid</label>
              <input
                className="input"
                type="text"
                placeholder="Enter rent"
                value={totalRent}
                onChange={(e) => setTotalRent(e.target.value)}
                onBlur={() => handleInputChange(totalRent, setTotalRent)}
              />
              {totalRent && (
                <p className='words'>{numberToWords(parseFloat(totalRent.replace(/,/g, '')))}</p>
              )}
              <p>Do you live in a metro city?(Delhi, Mumbai, Kolkata, Chennai)</p>
              <div>
                <input type="radio" id="city1" value="yes" name="city" onChange={() => setIsMetrocity(true)} />
                <label htmlFor="city1">Yes</label>
                <input type="radio" id="city2" value="no" name="city" onChange={() => setIsMetrocity(false)} />
                <label htmlFor="city2">No</label>
              </div>
              <button className='calbtn' onClick={handleSubmit}>Clear form</button>
            </form>
          </div>
          <div className='column'>
            <form className="form1">
              <label>Actual HRA Received</label>

              <input className={`input1 ${highlightedInput === 'hra' ? 'highlighted' : ''}`} type="text" value={hra} readOnly />
              {hra && (
                <p className='words'>{numberToWords(parseFloat(hra.replace(/,/g, '')))}</p>
              )}
              <label>Rent paid in excess of 10% of salary (Actual rent paid minus 10% of (Basic salary + Dearness allowance))</label>
              <input className={`input1 ${highlightedInput === 'totalRent' ? 'highlighted' : ''}`} type="text" value={rent} readOnly />
              {rent && (
                <p className='words'>{numberToWords(parseFloat(rent.replace(/,/g, '')))}</p>
              )}

              {isMetrocity ? <label>50% of Basic salary (For those living in metro cities)</label> : <label>40% of Basic salary (For those living in non-metro cities)</label>}
              <input className={`input1 ${highlightedInput === 'basicSalary' ? 'highlighted' : ''}`} type="text" value={perofsalary} readOnly />
              {perofsalary && (
                <p className='words'>{numberToWords(parseFloat(perofsalary.replace(/,/g, '')))}</p>
              )}
              <hr></hr>
              <div className='output'>
                <label>Amount of Exempted HRA</label>
                <input className="input1" type="text" value={exemptedhra} readOnly />
                {exemptedhra && (
                  <p className='words1'>{numberToWords(parseFloat(exemptedhra.replace(/,/g, '')))}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
