/**
 * ╔══════════════════════════════════════╗
 * ║  ✅ EDITABLE - EDIT THIS FILE ✅      ║
 * ╚══════════════════════════════════════╝
 */

import { useState, type ChangeEvent } from "react";

/**
 * 🔴 TODO: BUILD A COMPLETE EVENT REGISTRATION FORM
 *
 * Requirements:
 * 1. Form fields:
 *    - Full Name (text)
 *    - Email (email)
 *    - Event Type (select: Workshop, Conference, Meetup, Webinar)
 *    - Date (date input)
 *    - Number of Tickets (number, min 1, max 5)
 *    - Special Requests (textarea)
 *    - Subscribe to Newsletter (checkbox)
 *
 * 2. Use a SINGLE object state (`formData`) for all fields.
 * 3. Create one universal `handleChange` that works for text, select, date, number, and checkbox.
 * 4. Add validation on submit:
 *    - Name must be at least 2 characters
 *    - Email must contain "@"
 *    - Tickets must be between 1 and 5
 * 5. On successful submission, hide the form and show a success message with the name and number of tickets.
 * 6. Add a "Reset Form" button after successful submission.
 */

export default function Lab5_EventRegistration() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        type: "Workshop",
        date: "",
        numberOfTickets: "1",
        specialRequests: "",
        subscribeToNews: false
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState("");

    const [registrations, setRegistrations] = useState<any[]>([]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const el = e.target;
        const { name } = el;
        const nextValue =
            el instanceof HTMLInputElement && el.type === "checkbox"
                ? el.checked
                : el.value;

        setFormData((prev) => ({
            ...prev,
            [name]: nextValue,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name]
                return newErrors;
            })
        }
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {}

        // validate the data
        // *    - Name must be at least 2 characters
        // *    - Email must contain "@"
        // *    - Tickets must be between 1 and 5
        if (formData.fullName.trim().length < 2) newErrors.fullName = "Name must be at least 2 characters";
        if (!formData.email.includes('@')) newErrors.email = "Email must contain @";
        if (Number(formData.numberOfTickets) < 1 || Number(formData.numberOfTickets) > 5) newErrors.numberOfTickets = "Tickets must be between 1 and 5";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // console.log("✅ Registration Successful!", formData);
            // setSubmittedName(formData.fullName.trim())
            // setSubmitted(true);
            const emailExists = registrations.some(reg => reg.email === formData.email);

            if(emailExists) {
                newErrors.email = "Email Already Exists"
                return;
            }

            const newRegistration = { ...formData, submittedAt: new Date().toLocaleString() };
            setRegistrations(prev => [...prev, newRegistration])
            console.log("✅ Registration Successful!", newRegistration);

            setSubmittedName(formData.fullName.trim());
            setSubmitted(true);
        }

        const resetForm = () => {
            setFormData({
                fullName: "",
                email: "",
                type: "Workshop",
                date: "",
                numberOfTickets: "1",
                specialRequests: "",
                subscribeToNews: false,
            });
            setErrors({});
            setSubmitted(false);
            setSubmittedName("");
        };

        // success
        if (isSubmitted) {
            return (
                <div>
                    <h2>05: Event Registration Form</h2>
                    <div style={{
                        padding: "30px", border: "2px solid green", borderRadius: "10px", textAlign: "center", backgroundColor: "#f0fff0"
                    }}>
                        <h3>🎉 Registration Successful!</h3>
                        <p><strong>{submittedName}</strong>, you have registered for <strong>{formData.numberOfTickets}</strong> ticket(s)!</p>
                        <button onClick={resetForm} style={{
                            padding: "20px", marginTop: "15px"
                        }}>Register for Another Event</button>
                    </div>

                    {/* Registration List */}
                    <h3>Registered Participants ({registrations.length})</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {registrations.map((reg) => (
                            <li key={reg.email} style={{
                                padding: "15px",
                                marginBottom: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9"
                            }}>
                                <strong>{reg.fullName}</strong> - {reg.email} <br />
                                {reg.type} • {reg.date} • {reg.numberOfTickets} ticket(s)
                            </li>
                        ))}

                    </ul>
                </div>

            )
        }

    }

    return (
        <div>
            <h2>05: Event Registration Form</h2>
            {/* Your code here. No safety nets. Good luck! */}
            <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
                <div style={{
                    marginBottom: "15px",
                }}>
                    <label>Full Name:</label><br />
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{
                            width: "100%", padding: "8px"
                        }}
                    />
                    {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
                </div>

                <div style={{
                    marginBottom: "15px",
                }}>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: "100%", padding: "8px"
                        }}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div style={{
                    marginBottom: "15px",
                }}>
                    <label>Event Type:</label><br />
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{
                            width: "100%", padding: "8px"
                        }}
                    >
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Meetup">Meetup</option>
                        <option value="Webinar">Webinar</option>
                    </select>
                </div>

                <div style={{
                    marginBottom: "15px",
                }}>
                    <label>Date:</label><br />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        style={{
                            width: "100%", padding: "8px"
                        }}
                    />
                </div>

                <div style={{
                    marginBottom: "15px",
                }}>
                    <label>Number of Tickets:</label><br />
                    <input
                        type="number"
                        name="numberOfTickets"
                        value={formData.numberOfTickets}
                        min="1"
                        max="5"
                        onChange={handleChange}
                        style={{
                            width: "100%", padding: "8px"
                        }}
                    />
                    {errors.numberOfTickets && <p style={{ color: "red" }}>{errors.numberOfTickets}</p>}
                </div>

                <div style={{
                    marginBottom: "15px",
                }}>
                    <label>Special Reuqest:</label><br />
                    <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        style={{
                            width: "100%", padding: "8px"
                        }}
                    />
                </div>

                <div style={{
                    marginBottom: "15px",
                }}>
                    <label> Subscribe to Newsletter
                        <input
                            type="checkbox"
                            name="subscribeToNews"
                            checked={formData.subscribeToNews}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}>
                    Register
                </button>

            </form>

            {registrations.length > 0 && (
                <div style={{
                    marginTop: "40px"
                }}>
                    <h3>Registered Participants ({registrations.length})</h3>
                    <ul style={{
                        listStyle: "none",
                        padding: 0
                    }}>
                        {registrations.map((reg) => (
                            <li key={reg.email} style={{ padding: "12px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
                                <strong>{reg.fullName}</strong> — {reg.email}<br />
                                {reg.type} • {reg.date} • {reg.numberOfTickets} ticket(s)
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </div>
    );
}