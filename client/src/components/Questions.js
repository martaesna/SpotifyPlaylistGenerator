import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Questions.css';

const questions = [
    { question: '¿Te gusta más la playa o la montaña?', options: [{ text: 'Playa', img: 'beach.jpg' }, { text: 'Montaña', img: 'mountain.jpg' }] },
    { question: '¿Qué prefieres para relajarte?', options: [{ text: 'Leer un libro', img: 'book.jpg' }, { text: 'Ver una película', img: 'movie.jpg' }] },
    { question: '¿Eres más de perros o de gatos?', options: [{ text: 'Perros', img: 'dog.jpg' }, { text: 'Gatos', img: 'cat.jpg' }] },
    { question: '¿Prefieres la música rock o la música pop?', options: [{ text: 'Rock', img: 'rock.jpg' }, { text: 'Pop', img: 'pop.jpg' }] },
    { question: '¿Prefieres la comida dulce o salada?', options: [{ text: 'Dulce', img: 'sweet.jpg' }, { text: 'Salada', img: 'salt.jpg' }] },
    { question: '¿Te gusta más la ciudad o el campo?', options: [{ text: 'Ciudad', img: 'city.jpg' }, { text: 'Campo', img: 'countryside.jpg' }] },
    { question: '¿Eres más de verano o invierno?', options: [{ text: 'Verano', img: 'summer.jpg' }, { text: 'Invierno', img: 'winter.jpg' }] },
    { question: '¿Eres más de pasar tiempo con amigos o con tu familia?', options: [{ text: 'Amigos', img: 'friends.jpg' }, { text: 'Familia', img: 'family.jpg' }] },
    { question: '¿Prefieres planificar tus actividades o improvisar?', options: [{ text: 'Planificar', img: 'plan.jpg' }, { text: 'Improvisar', img: 'improvise.jpg' }] },
    { question: '¿Te consideras más optimista o realista?', options: [{ text: 'Optimista', img: 'optimist.jpg' }, { text: 'Realista', img: 'realist.jpg' }] }
];

const Questions = ({ token }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const generatePlaylist = async () => {
    try {
      await axios.post('http://localhost:5000/api/playlist', { answers, token }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error generating playlist:', error);
    }
  };

  return (
    <div className="questions-container">
      {currentQuestion < (questions.length - 1) ? (
        <div className="content-container">
          <h1 className="question">{questions[currentQuestion].question}</h1>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="option" onClick={() => handleAnswer(option.text)}>
                <img src={`/assets/images/${option.img}`} alt={option.text} />
                <p>{option.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button className="generate-button" onClick={generatePlaylist}>Generate Playlist</button>
      )}
    </div>
  );
};

export default Questions;
