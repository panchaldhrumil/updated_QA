import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;


    try {
      const response = await fetch('http://192.168.1.100:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // console.log("response.ok:", response.ok);


      if (response.ok) {
        const message = await response.text();
        alert("Login successful: " + message);
        // You can redirect to home/dashboard page here if needed
        navigate('/form'); // 2. Redirect to Form.jsx route
      } else {
        const error = await response.text();
        alert("Login failed: " + error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("Something went wrong");
    }
  };


  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

        <h1>QA MANAGEMENT</h1>


        <form style={{ display: 'flex', gap: '30px', flexDirection: 'column' }} onSubmit={handleSubmit} >



          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            <label style={{ fontSize: '20px', fontWeight: 'bold', width: '100px' }}>Email :</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your E-mail"
              style={{
                padding: '8px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '250px',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#007BFF'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>


          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <label style={{ fontSize: '20px', fontWeight: 'bold', width: '100px' }}>Password :</label>
              <input
                type="password"
                name="password"
                placeholder="Enter The Password"
                style={{
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  width: '250px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              />
            </div>

            {/* <div className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline' }} >
              <Link to="/forget" className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline', fontWeight: 'bold' }} > Forget password </Link>
            </div> */}
          </div>

          <div className="signup" style={{ display: 'flex', gap: '8px',justifyContent:'center', alignItems: 'center', marginTop: '20px', fontSize: '16px' }}>
            <div>If you don't have an account</div>
            <div>
              <Link
                to="/signup"
                style={{
                  color: '#007BFF',
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                onMouseLeave={(e) => e.target.style.color = '#007BFF'}
              >
                Sign Up
              </Link>
            </div>
          </div>



          <input
            type="submit"
            value="Submit"
            style={{
              backgroundColor: '#000',
              padding: '10px 20px',
              fontSize: '18px',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
          />


        </form>
      </div>
    </div>
  )
}

export default Login