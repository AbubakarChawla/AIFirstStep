import React, { useEffect, useState } from 'react';
import { getPhones, deletePhone } from '../phoneService';
import AddPhoneForm from './AddPhoneForm';

function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    const data = await getPhones();
    setPhones(data);
  };

  const handleDelete = async (id) => {
    await deletePhone(id);
    fetchPhones(); // Refresh the phone list after deletion
  };

  const handlePhoneAdded = () => {
    fetchPhones(); // Refresh the list after adding a phone
  };

  const filterPhones = () => {
    return phones.filter(phone =>
      phone.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Mobile Phone Listings</h1>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search phones..."
        />
      </div>

      {/* Phone Listings */}
      <div className="row">
        {filterPhones().map((phone) => (
          <div key={phone.id} className="col-md-4 mb-4">
            <div className="card">
              {/* Make sure the image path is correct */}
              <img
                src={`http://localhost:5000${phone.image}`}
                className="card-img-top"
                alt={phone.name}
              />
              <div className="card-body">
                <h5 className="card-title">{phone.name}</h5>
                <p className="card-text">Brand: {phone.brand}</p>
                <p className="card-text">Price: ${phone.price}</p>
                <p className="card-text">Specs: {phone.specs}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(phone.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Phone Form */}
      <AddPhoneForm onPhoneAdded={handlePhoneAdded} />
    </div>
  );
}

export default PhoneList;
