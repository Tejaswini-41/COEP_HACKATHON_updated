import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/ask', {
                question: question,
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleQuestionSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default Chatbot;
