import React, { useState } from 'react';
import Form from './Form';

const Form1 = ({ onSubmit1 , compareData }) => {
  const [selectedOption, setSelectedOption] = useState('pass');
  const [file, setFile] = useState(null);
    const [section, setSection] = useState('tube'); // State for dropdown selection

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [tubes, setTubes] = useState([
    { id: 1, Unit1: '', Unit2: '', Unit3: '', Quantity: '' }
  ]);
  const [tape, setTape] = useState([
    { id: 1, Unit1: '', Unit2: '', Unit3: '', MPNLabel: '', Quantity: '' }
  ]);

  const handleTubeChange = (id, field, value) => {
    setTubes(prevTubes =>
      prevTubes.map(tube =>
        tube.id === id ? { ...tube, [field]: value } : tube
      )
    );
  };

  const handleTapeChange = (id, field, value) => {
    setTape(prevTape =>
      prevTape.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  };

  const addTube = () => {
    setTubes([...tubes, { id: tubes.length + 1, Unit1: '', Unit2: '', Unit3: '', Quantity: '' }]);
  };

  const removeTube = (idToRemove) => {
    setTubes(tubes.filter(tube => tube.id !== idToRemove));
  };

  const addTape = () => {
    setTape([...tape, { id: tape.length + 1, Unit1: '', Unit2: '', Unit3: '', MPNLabel: '', Quantity: '' }]);
  };

  const removeTape = (idToRemove) => {
    setTape(tape.filter(t => t.id !== idToRemove));
  };


  const [QuantityExpected, setQuantityExpected] = useState('');


  const handleQuantityExpectedchange = (e) => {
    setQuantityExpected(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

   const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

    const handleSubmit2 = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('InspectionQuantityInspected', QuantityExpected); // Match backend field
    formData.append('InspectionResult', selectedOption); // Match backend field
    if (selectedOption === 'fail' && file) {
      formData.append('report', file);
    }
// Append tape data as individual fields with index
  tape.forEach((tapeItem, index) => {
    formData.append(`Tape[${index}][Unit1]`, tapeItem.Unit1);
    formData.append(`Tape[${index}][Unit2]`, tapeItem.Unit2);
    formData.append(`Tape[${index}][Unit3]`, tapeItem.Unit3);
    formData.append(`Tape[${index}][MPNLabel]`, tapeItem.MPNLabel);
    formData.append(`Tape[${index}][Quantity]`, tapeItem.Quantity);
  });

// Append tube data as individual fields with index
  tubes.forEach((tubeItem, index) => {
    formData.append(`Tube[${index}][Unit1]`, tubeItem.Unit1);
    formData.append(`Tube[${index}][Unit2]`, tubeItem.Unit2);
    formData.append(`Tube[${index}][Unit3]`, tubeItem.Unit3);
    formData.append(`Tube[${index}][Quantity]`, tubeItem.Quantity);
  });

// Append compare data
  if (compareData) {
    formData.append('AssemblyLotNumber', compareData.AssemblyLotNumber);
    formData.append('WaferLotNumber', compareData.WaferLotNumber);
    formData.append('LotQuantity', compareData.LotQuantity);
    formData.append('Marking', compareData.Marking);
    formData.append('AssemblyDateCode', compareData.AssemblyDateCode);
    formData.append('BoxLabelDateCode', compareData.BoxLabelDateCode);
  }

    // try {
    //   // Submit all tape entries
    //   const tapePromises = tape.map(async (tapeItem) => {
    //     const res = await fetch('http://localhost:3000/api/tape', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       // body: JSON.stringify(tapeItem)
    //       body: JSON.stringify({
    //         TapeUnit1: tapeItem.Unit1, // Match backend field
    //         TapeUnit2: tapeItem.Unit2,
    //         TapeUnit3: tapeItem.Unit3,
    //         TapeMPNLabel: tapeItem.MPNLabel,
    //         TapeQuantity: tapeItem.Quantity,
    //       })
    //     });
    //     return res.ok;
    //   });

    //   // Submit all tube entries
    //   const tubePromises = tubes.map(async (tubeItem) => {
    //     const res = await fetch('http://localhost:3000/api/tube', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       // body: JSON.stringify(tubeItem)
    //       body: JSON.stringify({
    //         TubeUnit1: tubeItem.Unit1, // Match backend field
    //         TubeUnit2: tubeItem.Unit2,
    //         TubeUnit3: tubeItem.Unit3,
    //         TubeQuantity: tubeItem.Quantity,
    //       })
    //     });
    //     return res.ok;
    //   });

    //   const inspection = await fetch('http://localhost:3000/api/inspection', {
    //     method: 'POST',
    //     // headers: { 'Content-Type': 'application/json' },
    //     // body: JSON.stringify(inspection)
    //     body: formData
    //   });

    //   const tapeResults = await Promise.all(tapePromises);
    //   const tubeResults = await Promise.all(tubePromises);

    //   if (tapeResults.every(result => result) && tubeResults.every(result => result) && inspection.ok) {
    //     alert("Data submitted successfully!");
    //     // Call handleSubmit1 from Form.jsx
    //     if (onSubmit1) {
    //       await onSubmit1(e); // Pass the event if needed, or modify as per your logic
    //     }
    //     setTape([{ id: 1, Unit1: '', Unit2: '', Unit3: '', MPNLabel: '', Quantity: '' }]);
    //     setTubes([{ id: 1, Unit1: '', Unit2: '', Unit3: '', Quantity: '' }]);
    //     setQuantityExpected('');
    //     setSelectedOption('');
    //     setFile(null);
    //   } else {
    //     alert("Submission failed for some entries.");
    //   }
    // } catch (err) {
    //   console.error("Error submitting data", err);
    //   alert("Error submitting data.");
    // }

    // Log FormData entries for debugging
  console.log('FormData entries:');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

    try {
      const response = await fetch('http://192.168.1.100:3000/api/submitAll', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Data submitted successfully!');
        if (onSubmit1) {
          await onSubmit1(e);
        }
        // Reset form fields
        setTape([
          { id: 1, Unit1: '', Unit2: '', Unit3: '', MPNLabel: '', Quantity: '' },
        ]);
        setTubes([
          { id: 1, Unit1: '', Unit2: '', Unit3: '', Quantity: '' },
        ]);
        setQuantityExpected('');
        setSelectedOption('pass');
        setFile(null);
      } else {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        alert('Submission failed: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error submitting data:', err);
      alert('Error submitting data: ' + err.message);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit2}
        method='POST' encType='multipart/form-data'>
        <div>
          <h1>PHYSICAL-LOT</h1>

          <div
            className="container"
            style={{
              display: 'flex',
              backgroundColor: '#f4f6f8',
              margin: '10px 0px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
                      <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <label>Select Section: </label>
            <select value={section} onChange={handleSectionChange} style={{ margin: '5px', padding: '5px' }}>
              <option value="tube">Tube</option>
              <option value="tape">Tape/Reel</option>
            </select>
          </div>
     {section === 'tube' && (
               <div
              className="container1"
              style={{
                margin: '5px',
                padding: '10px',
                border: '2px solid black',
                width: '90vw',
                backgroundColor: 'wheat',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  margin: '5px',
                  padding: '10px',
                  width: '90vw',
                  backgroundColor: 'wheat',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}
              >
                {tubes.map((tube) => (
                  <div
                    key={tube.id}
                    className="subcontainer"
                    style={{
                      margin: '5px',
                      padding: '10px',
                      border: '2px solid black',
                      backgroundColor: 'whitesmoke',
                      width: '80vw',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center'
                    }}
                  >
                    <div>TUBE {tube.id} :</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>MARKING BASED ON 3 UNITS</label>
                      <input type="text" value={tube.Unit1} onChange={e => handleTubeChange(tube.id, 'Unit1', e.target.value)} />
                      <input type="text" value={tube.Unit2} onChange={e => handleTubeChange(tube.id, 'Unit2', e.target.value)} />
                      <input type="text" value={tube.Unit3} onChange={e => handleTubeChange(tube.id, 'Unit3', e.target.value)} />
                    </div>
                    <div>
                      <label>QUANTITY:</label>
                      <input type="text" value={tube.Quantity} onChange={e => handleTubeChange(tube.id, 'Quantity', e.target.value)} />
                    </div>
                    <div>
                      {tube.id !== 1 && <button onClick={() => removeTube(tube.id)}>Remove</button>}
                    </div>
                  </div>
                ))}
              </div>
              <button type='button' onClick={addTube}>ADD</button>
            </div> ) }

       {section === 'tape' && (
            <div
              className="container2"
              style={{
                margin: '5px',
                padding: '10px',
                border: '2px solid black',
                width: '90vw',
                backgroundColor: 'wheat',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  margin: '5px',
                  padding: '10px',
                  width: '90vw',
                  backgroundColor: 'wheat',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}
              >
                {tape.map((t) => (
                  <div
                    key={t.id}
                    className="subcontainer"
                    style={{
                      margin: '5px',
                      padding: '10px',
                      border: '2px solid black',
                      backgroundColor: 'whitesmoke',
                      width: '80vw',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center'
                    }}
                  >
                    <div>TAPE/REELS :</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>MARKING BASED ON 3 UNITS</label>
                      <input type="text" value={t.Unit1} onChange={e => handleTapeChange(t.id, 'Unit1', e.target.value)} />
                      <input type="text" value={t.Unit2} onChange={e => handleTapeChange(t.id, 'Unit2', e.target.value)} />
                      <input type="text" value={t.Unit3} onChange={e => handleTapeChange(t.id, 'Unit3', e.target.value)} />
                    </div>
                    <div>
                      <label>MPN LABEL DEVICE INFO:</label>
                      <input type="text" value={t.MPNLabel} onChange={e => handleTapeChange(t.id, 'MPNLabel', e.target.value)} />
                    </div>
                    <div>
                      <label>QUANTITY:</label>
                      <input type="text" value={t.Quantity} onChange={e => handleTapeChange(t.id, 'Quantity', e.target.value)} />
                    </div>
                    <div>
                      {t.id !== 1 && <button type='button' onClick={() => removeTape(t.id)}>Remove</button>}
                    </div>
                  </div>
                ))}
              </div>
              <button type='button' onClick={addTape}>ADD</button>
            </div>
       )}

          </div>
        </div>

        {/* <div style={{ backgroundColor: '#f4f6f8', position: 'absolute', top: '85vh', right: '37vw' }}>
        <button onClick={handleSubmit2} className='hover' style={{ alignContent: 'center', backgroundColor: 'black', padding: '10px 0px', borderRadius: '12px', width: '25vw', fontSize: '20px', color: 'white' }} >Submit</button>
      </div> */}

        {/* Uncomment and balance this section if needed later */}


        <h1>100% INSPECTION</h1>
        <div className="conatiner" style={{ display: 'flex', backgroundColor: '#f4f6f8', paddingTop: '30px', margin: '20px 0px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


          <div className="container1"
            style={{
              margin: '5px',
              padding: '15px',
              border: '2px solid black',
              width: '90vw',
              backgroundColor: 'wheat',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <div>AMPLE TUBE/REEL : </div>
            <div>
              <label>QUANTITY INSPECTED : </label>
              <input type="text" name='QuantityExpected' value={QuantityExpected} onChange={handleQuantityExpectedchange} />
            </div>
            <div >
              <label  >RESULT : </label>
              <div>

                <select style={{ margin: '5px' }} name='select' value={selectedOption} onChange={handleChange}>
                  <option value="">Select an option...</option>
                  <option value="pass">PASS</option>
                  <option value="fail">FAIL</option>

                </select>
                <p>Selected Option: {selectedOption}</p>
              </div>
            </div>
          </div>

          <div>
            {selectedOption == "pass" ?
              null :
              <div className="conatiner2" style={{
                margin: '5px',
                padding: '15px',
                border: '2px solid black',
                width: '90vw',
                backgroundColor: 'wheat',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>


                <label >FAILURE REPORT : </label>
                <input type="file" name='report' onChange={handleFileChange} />

              </div>
            }

          </div>

        </div>
        <div style={{ backgroundColor: '#f4f6f8' }}>
          <button className='hover' style={{ alignContent: 'center', backgroundColor: 'black', padding: '10px 0px', borderRadius: '12px', width: '25vw', fontSize: '20px', color: 'white' }} >Submit</button>
        </div>

      </form>


    </div>
  );
};

export default Form1;


