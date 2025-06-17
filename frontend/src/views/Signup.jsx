import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'


const Signup = () => {

   const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
 

  try {
    const response = await fetch('http://192.168.1.100:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("response.ok:", response.ok);

    if (response.ok) {
      const data = await response.text(); // or .json() if your backend sends JSON
      alert("Registration successful: " + data);
      // Redirect to login or home page if needed
       navigate('/'); // 2. Redirect to Form.jsx route
    } else {
      const error = await response.text();
      alert("Registration failed: " + error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert("Something went wrong");
  }
};


  return (
         <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-evenly' , alignItems: 'center' }}>

          <h1>QA MANAGEMENT</h1>

          <form style={{ display: 'flex', gap: '30px', flexDirection: 'column' }} onSubmit={handleSubmit}>

<div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
  <label style={{ fontSize: '20px', fontWeight: 'bold', width: '100px' }}>Name:</label>
  <input
    type="text"
    name="name"
    placeholder="Enter Your Name"
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


          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
  <label style={{ fontSize: '20px', fontWeight: 'bold', width: '100px' }}>Email:</label>
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

<div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
  <label style={{ fontSize: '20px', fontWeight: 'bold', width: '100px' }}>Password:</label>
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


<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '20px', fontSize: '16px' }}>
  <div>If you already have an account</div>
  <div>
    <Link
      to="/"
      style={{
        color: '#007BFF',
        textDecoration: 'underline',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => e.target.style.color = '#0056b3'}
      onMouseLeave={(e) => e.target.style.color = '#007BFF'}
    >
      Login
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
            {/* <button type="submit"  >Submit</button> */}

          </form>
        </div>
      </div>
  )
}

export default Signup