import { useState } from "react";

const App = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  
  const validateStep = () => {
    let newErrors = {};
    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
    }
    if (step === 1) {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email";
      }
      if (!formData.phone) newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh", alignItems: "center", background: "#f3f4f6" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginBottom: "20px" }}>Multi Step Form</h2>

        
        {step === 0 && (
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
        )}

        
        {step === 1 && (
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ display: "block", width: "100%", margin: "8px 0", padding: "8px" }}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>
        )}

        
        {step === 2 && (
          <div>
            <h3>Review</h3>
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
        )}

       
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
          {step > 0 && (
            <button type="button" onClick={handlePrev}>
              Back
            </button>
          )}
          {step < 2 && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}
          {step === 2 && (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
