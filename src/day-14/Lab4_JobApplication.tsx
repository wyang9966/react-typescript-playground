/**
 * ╔══════════════════════════════════════╗
 * ║  ✅ EDITABLE - EDIT THIS FILE ✅      ║
 * ╚══════════════════════════════════════╝
 */

import { useState } from "react";

/**
 * 🔴 TODO: BUILD A COMPLETE JOB APPLICATION FORM FROM SCRATCH
 *
 * Requirements:
 * 1. Form fields:
 *    - Full Name (text)
 *    - Years of Experience (number)
 *    - Preferred Framework (select: React, Vue, Angular)
 *    - Cover Letter (textarea)
 * 2. Use a single Object State to manage all fields.
 * 3. Add an onSubmit handler that prevents default refresh.
 * 4. Validation: Name must be at least 3 characters. Experience must be > 0.
 * 5. Upon successful submission, hide the form and display: "Application submitted successfully, [Name]!"
 */

export default function Lab4_JobApplication() {

  const [formData, setFormData] = useState({
    fullName: "",
    yearsOfExperience: "",
    preferredFramework: "",
    coverLetter: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // validate the data
    if (formData.fullName.trim().length < 3) newErrors.fullName = "Name must be at least 3 characters.";
    if (!formData.yearsOfExperience || Number(formData.yearsOfExperience) <= 0) newErrors.yearsOfExperience = "Experience must be > 0.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedName(formData.fullName.trim());
      setSubmitted(true);
    }

    if (isSubmitted) {
      return (
        <div>
          <h2>04: Job Application (Final Challenge)</h2>
          <div style={{
            padding: "30px",
            border: "2px solid green",
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#f0fff0"
          }}>
            <h3>✅ Application submitted successfully!</h3>
            <p><strong>{submittedName}</strong>, thank you for applying!</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <h2>04: Job Application (Final Challenge)</h2>
      {/* Your code here. No safety nets. Good luck! */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div style={{
          marginBottom: "15px"
        }}>
          <label>Full Name:</label><br />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{
              width: "100%", padding: "8px"
            }} />
          {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Years Of Experience:</label><br />
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            style={{
              width: "100%", padding: "8px"
            }} />
          {errors.yearsOfExperience && <p style={{ color: "red" }}>{errors.yearsOfExperience}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Preferred Framework:</label><br />
          <select
            name="preferredFramework"
            value={formData.preferredFramework}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Cover Letter:</label><br />
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={6}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button 
          type="submit"
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit Application
        </button>

      </form>
    </div>
  );
}


