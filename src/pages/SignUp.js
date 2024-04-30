import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    id: 10,
    pass: '',
    f_name: '',
    l_name: '',
    location_id: '',
    email: '',
    phone: '',
    dob: '',
    blood_type: '',
    role_name: 'patient',
    image: ''
  });
  

  const [existingLocations, setExistingLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing locations from your API
    axios.get('http://localhost:3001/api/locations')
      .then((response) => {
        setExistingLocations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching existing locations:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'locationSelect') {
      const selectedLocation = existingLocations.find(loc => loc._id === value);
      console.log('Selected Location:', selectedLocation);
      setSelectedLocation(selectedLocation);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value || ''
      }));
    }
  };
  
  const handleNextStep = (e) => {
    e.preventDefault();
  
    if (step === 1 && selectedLocation) {
      console.log('Selected Location ID:', selectedLocation._id);
    }
  
    if (step === 2 && selectedLocation) {
      // Update formData with the selected location
      setFormData((prevData) => ({
        ...prevData,
        location_id: selectedLocation._id,
        // Include other form data updates if needed
      }));
  
      // Now log the updated formData after the state update
      console.log('Updated FormData:', {
        ...formData,
        location_id: selectedLocation._id // Ensure location_id is correctly updated
      });
    }
  
    setStep((prevStep) => prevStep + 1);
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users', formData);
      console.log('User created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
          <div className="mb-3">
              <label htmlFor="locationSelect" className="form-label">Select Existing Location</label>
              <select className="form-select" id="locationSelect" name="locationSelect" onChange={handleChange}>
              <option value="">Choose location...</option>
              {existingLocations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.city}, {location.street}, {location.address1}, {location.address2}
                </option>
              ))}
            </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">-----------------------------OR-----------------------------</label>
            </div>

            <div className="mb-3">
              <button className="btn btn-primary"> <Link to="/addlocation" className="text-white" >Add New Location</Link></button>
            </div>

          </>
        );

        
      case 2:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="f_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="f_name" name="f_name" value={formData.f_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="l_name" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="l_name" name="l_name" value={formData.l_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="blood_type" className="form-label">Blood Type</label>
              <select className="form-select" id="blood_type" name="blood_type" value={formData.blood_type} onChange={handleChange}>
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">Password</label>
              <input type="password" className="form-control" id="pass" name="pass" value={formData.pass} onChange={handleChange} />
            </div>
            
          </>
        );
      case 3:
        return (
          <>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Profile Picture</label>
              <input type="file" className="form-control" id="image" name="image" onChange={handleChange} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {renderStep()}
            {step !== 3 && (
               <button className="btn btn-primary" onClick={handleNextStep}>Next</button>
          
            )}
            {step === 3 && (
              <button type="submit" className="btn btn-primary">Sign Up</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
