// Function to show the content section when a button is clicked
function showSection(sectionId) {
    // Hide all content sections by removing the 'active-section' class
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active-section');
    });

    // Show the selected content section by adding the 'active-section' class
    document.getElementById(sectionId).classList.add('active-section');
}

// The following code defines the React components for different sections:

function TimeTable() {
    const [teachers, setTeachers] = React.useState([{ name: "", day: "", time: "" }]);
    const [timeTable, setTimeTable] = React.useState([]);

    const handleInputChange = (index, field, value) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[index][field] = value;
        setTeachers(updatedTeachers);
    };

    const addTeacherInput = () => {
        setTeachers([...teachers, { name: "", day: "", time: "" }]);
    };

    const generateTimeTable = () => {
        const generatedTable = teachers.map((teacher, index) => ({
            day: teacher.day,
            time: teacher.time,
            teacher: teacher.name,
        }));
        setTimeTable(generatedTable);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Time Table Generator</h5>
                <div>
                    {teachers.map((teacher, index) => (
                        <div className="mb-3" key={index}>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Teacher's Name"
                                value={teacher.name}
                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Day (e.g., Monday)"
                                value={teacher.day}
                                onChange={(e) => handleInputChange(index, "day", e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Time (e.g., 10:00 AM)"
                                value={teacher.time}
                                onChange={(e) => handleInputChange(index, "time", e.target.value)}
                            />
                        </div>
                    ))}
                    <button className="btn btn-secondary mb-3" onClick={addTeacherInput}>
                        Add More
                    </button>
                    <button className="btn btn-primary" onClick={generateTimeTable}>
                        Generate Time Table
                    </button>
                </div>
                {timeTable.length > 0 && (
                    <div>
                        <h5 className="mt-4">Generated Time Table</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Teacher</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timeTable.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.day}</td>
                                        <td>{entry.time}</td>
                                        <td>{entry.teacher}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function QnAPlatform() {
    const [questions, setQuestions] = React.useState([
        { id: 1, question: "What are the library hours?", answer: "The library is open from 8 AM to 8 PM on weekdays." },
        { id: 2, question: "How can I register for the upcoming hackathon?", answer: "You can register through the college portal under the Events section." }
    ]);
    const [newQuestion, setNewQuestion] = React.useState("");

    const handleAskQuestion = () => {
        if (newQuestion.trim() !== "") {
            setQuestions([...questions, { id: questions.length + 1, question: newQuestion, answer: "Answer coming soon..." }]);
            setNewQuestion("");
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <ul className="list-group">
                    {questions.map((q) => (
                        <li key={q.id} className="list-group-item">
                            <strong>Q:</strong> {q.question} <br />
                            <strong>A:</strong> {q.answer}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Ask a new question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                />
                <button className="btn btn-secondary mt-2" onClick={handleAskQuestion}>Ask</button>
            </div>
        </div>
    );
}

function Chatbot() {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");

    const handleSendMessage = () => {
        if (input.trim() !== "") {
            let response;
            if (input.toLowerCase().includes("events")) {
                response = "You can find all upcoming events in the Events section of the dashboard.";
            } else if (input.toLowerCase().includes("canteen")) {
                response = "The canteen serves food from 9 AM to 6 PM.";
            } else if (input.toLowerCase().includes("courses")) {
                response = "You can view your courses and syllabus on the college portal.";
            } else {
                response = "I'm not sure about that. Please check the college website or contact admin.";
            }

            const newMessages = [...messages, { sender: "User", text: input }, { sender: "Bot", text: response }];
            setMessages(newMessages);
            setInput("");
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "10px" }}>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-success mt-2" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

function Events() {
    const events = [
        { id: 1, name: "Hackathon", date: "2024-01-15" },
        { id: 2, name: "Cultural Fest", date: "2024-02-20" }
    ];

    return (
        <div className="card">
            <div className="card-body">
                <ul className="list-group">
                    {events.map((event) => (
                        <li key={event.id} className="list-group-item">
                            {event.name} - {event.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Render the React components inside the corresponding divs
ReactDOM.render(<TimeTable />, document.getElementById('timetable-app'));
ReactDOM.render(<QnAPlatform />, document.getElementById('quora-app'));
ReactDOM.render(<Chatbot />, document.getElementById('chatbot-app'));
ReactDOM.render(<Events />, document.getElementById('events-app'));
