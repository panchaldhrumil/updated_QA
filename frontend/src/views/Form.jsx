import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Form1 from './Form1';

const Form = () => {




    // const navigate = useNavigate();
    const [showElement, setshowElement] = useState(false);

    const [lotTravellerData, setLotTravellerData] = useState({
        AssemblyLotNumber: '',
        WaferLotNumber: '',
        Quantity: '',
        DateCode: '',
        Marking: ''
    });

    const [boxLabelData, setBoxLabelData] = useState({
        AssemblyLotNumber: '',
        WaferLotNumber: '',
        Quantity: '',
        DateCode: '',
        Marking: ''
    });



    const handleLotTravellerChange = (e) => {
        const { name, value } = e.target;
        setLotTravellerData(prev => ({ ...prev, [name]: value }));
    };

    const handleBoxLabelChange = (e) => {
        const { name, value } = e.target;
        setBoxLabelData(prev => ({ ...prev, [name]: value }));
    };

    const compareData = {
        AssemblyLotNumber: lotTravellerData.AssemblyLotNumber,
        WaferLotNumber: lotTravellerData.WaferLotNumber,
        LotQuantity: lotTravellerData.Quantity,
        Marking: lotTravellerData.Marking,
        AssemblyDateCode: lotTravellerData.DateCode,
        BoxLabelDateCode: boxLabelData.DateCode,
    };

    const handleCompare = async (e) => {
        const mismatches = [];
        // Iterate over keys except 'DateCode'
        Object.keys(lotTravellerData).forEach(key => {
            if (key === 'DateCode') return; // Skip date field

            // Compare trimmed string values to avoid whitespace mismatches
            if (String(lotTravellerData[key]).trim() !== String(boxLabelData[key]).trim()) {
                mismatches.push(key);

            }
        });

        if (mismatches.length > 0) {
            alert(`Mismatch found in: ${mismatches.join(', ')}`);
            return;
        }
        else { setshowElement(true); }
    }

    // const handleSubmit1 = async (e) => {
    //     e.preventDefault();


    //     try {
    //         const Compare = await fetch('http://localhost:3000/api/compare', {
    //             method: 'POST', 
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 AssemblyLotNumber : lotTravellerData.AssemblyLotNumber ,
    //                 WaferLotNumber : lotTravellerData.WaferLotNumber ,
    //                 LotQuantity : lotTravellerData.Quantity ,
    //                 Marking : lotTravellerData.Marking ,
    //                 AssemblyDateCode : lotTravellerData.DateCode ,
    //                 BoxLabelDateCode : boxLabelData.DateCode
    //             })
    //         });

    //         // const res2 = await fetch('http://localhost:3000/api/boxlabel', {
    //         //     method: 'POST',
    //         //     headers: { 'Content-Type': 'application/json' },
    //         //     body: JSON.stringify(boxLabelData)
    //         // });
    //         console.log("compare.ok : ", Compare.ok);
    //         if (Compare.ok) {
    //             alert("Data submitted successfully!");
    //             // navigate('/form1') ;
    //             // Optional: Clear the forms

    //             // setshowElement(true);
    //             console.log("Showing Form1:", showElement);
    //         } else {
    //             alert("Submission failed.");
    //         }
    //     } catch (err) {
    //         console.error("Error submitting data", err);
    //         alert("Error submitting data.");
    //     }
    // };




    const handleSubmit1 = async (e) => {
        e.preventDefault();
        alert('Final submission completed!');
        // Reset form data if needed
        setLotTravellerData({
            AssemblyLotNumber: '',
            WaferLotNumber: '',
            Quantity: '',
            DateCode: '',
            Marking: '',
        });
        setBoxLabelData({
            AssemblyLotNumber: '',
            WaferLotNumber: '',
            Quantity: '',
            DateCode: '',
            Marking: '',
        });
        setshowElement(false) ;
    };



    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f4f6f8',
        fontFamily: 'Arial, sans-serif',
    };

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        // minWidth: '400px',
    };

    const headingStyle = {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#2c3e50',
        textAlign: 'center',
    };

    const formGroupStyle = {

        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#34495e',

    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
        width: '100%',
    };


    return (
        <>
            <div style={{ height: '100%', position: 'relative', backgroundColor: containerStyle.backgroundColor }}>
                <div className='container' style={containerStyle}>
                    <div className='left' style={sectionStyle}>
                        <div>
                            <h2 style={headingStyle}>LOT TRAVELLER VERIFICATION</h2>
                        </div>

                        <form style={formGroupStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>ASSEMBLY LOT NUMBER : </label>
                                <input type="number" name='AssemblyLotNumber' value={lotTravellerData.AssemblyLotNumber}
                                    onChange={handleLotTravellerChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>WAFER LOT NUMBER :</label>
                                <input type="number" name='WaferLotNumber' value={lotTravellerData.WaferLotNumber}
                                    onChange={handleLotTravellerChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>



                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>QUANTITY : </label>
                                <input type="number" name='Quantity' value={lotTravellerData.Quantity}
                                    onChange={handleLotTravellerChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>MARKING : </label>
                                <input type="text" name='Marking' value={lotTravellerData.Marking}
                                    onChange={handleLotTravellerChange}
                                    style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>DATE CODE : </label>
                                <input type="date" name='DateCode' value={lotTravellerData.DateCode}
                                    onChange={handleLotTravellerChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>
                        </form>
                    </div>

                    <div className='right' style={sectionStyle}>
                        <div>
                            <h2 style={headingStyle}>BOX LABEL VERIFICATION</h2>
                        </div>

                        <form style={formGroupStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>ASSEMBLY LOT NUMBER : </label>
                                <input type="number" name='AssemblyLotNumber' value={boxLabelData.AssemblyLotNumber} onChange={handleBoxLabelChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>WAFER LOT NUMBER : </label>
                                <input type="number" name='WaferLotNumber' value={boxLabelData.WaferLotNumber} onChange={handleBoxLabelChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>QUANTITY : </label>
                                <input type="number" name='Quantity' value={boxLabelData.Quantity} onChange={handleBoxLabelChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>MARKING : </label>
                                <input type="text" name='Marking' value={boxLabelData.Marking} onChange={handleBoxLabelChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <label style={{ ...labelStyle, minWidth: '160px' }}>DATE CODE : </label>
                                <input type="date" name='DateCode' value={boxLabelData.DateCode} onChange={handleBoxLabelChange} style={{ ...inputStyle, flex: 1 }} />
                            </div>
                        </form>
                    </div>
                </div>
                <div style={{ backgroundColor: '#f4f6f8', position: 'absolute', top: '85vh', right: '37vw' }}>
                    <button onClick={handleCompare} className='hover' style={{ alignContent: 'center', backgroundColor: 'black', padding: '10px 0px', borderRadius: '12px', width: '25vw', fontSize: '20px', color: 'white' }} >Compare</button>
                </div>
                {/* <input type="submit" value="Submit" className='hover'  style={{ position: 'absolute', top: '80vh', right: '20vw', alignContent: 'center', backgroundColor: 'black', padding: '10px 0px', width: '60vw', fontSize: '20px', color: 'white' }} /> */}
            </div>
            <div style={{ margin: '40px 0px' }}>
                {showElement ?
                    <div style={{ position: 'relative', zIndex: 2, transition: 'all 0.3s ease-in' }}>
                        <Form1 onSubmit1={handleSubmit1} compareData={compareData} />
                    </div>
                    : null}
            </div>
        </>
    );
};

export default Form;
