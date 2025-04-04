import React, { useState } from 'react';
import './AddPhoneForm.css'; // Custom CSS for additional styling

function AddPhoneForm({ onPhoneAdded }) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [specs, setSpecs] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !brand || !price || !specs || !image) {
      setError('Please fill out all fields and select an image.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('specs', specs);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/phones', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onPhoneAdded();
        setName('');
        setBrand('');
        setPrice('');
        setSpecs('');
        setImage(null);
        setError('');
        alert('Phone added successfully!');
        setShowModal(false);
      } else {
        setError('Failed to add phone. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <>
      {/* Button to trigger modal */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowModal(true)}
      >
        Add Phone
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addPhoneModal"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content rounded-3 shadow">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="addPhoneModal">
                Add New Phone
              </h5>
              <button
  type="button"
  className="btn-close btn-close-white"
  aria-label="Close"
  onClick={() => setShowModal(false)}
>
  <span className="visually-hidden">Close</span> {/* For screen readers */}
  <span style={{ marginLeft: '8px', color: 'black' }}>Close</span> {/* Visible text */}
</button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="name" className="form-label">Phone Name</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter phone name"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="brand" className="form-label">Brand</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="brand"
                          className="form-control"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          placeholder="Enter phone brand"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="price" className="form-label">Price</label>
                      </td>
                      <td>
                        <input
                          type="number"
                          id="price"
                          className="form-control"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Enter phone price"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="specs" className="form-label">Specs</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="specs"
                          className="form-control"
                          value={specs}
                          onChange={(e) => setSpecs(e.target.value)}
                          placeholder="Enter phone specifications"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="image" className="form-label">Upload Image</label>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="image"
                          className="form-control"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Add Phone'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop (modal overlay) */}
      {showModal && (
        <div
          className="modal-backdrop fade show custom-backdrop"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </>
  );
}

export default AddPhoneForm;
