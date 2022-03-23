import React, { useState, useEffect } from 'react'

import Thoughts from './components/Thoughts.js';
import Form from './components/Form.js';

export const App = () => {

  const [newThought, setNewThought] = useState('');
  const [loading, setLoading] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then(res => res.json())
      .then(thoughts => setThoughts(thoughts))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  const handleNewThoughtChange = (event) => {
    setNewThought(event.target.value)
  }
  
  const onFormSubmit = (event) => {
    event.preventDefault();

    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newThought })
    })
      
    .then(res => res.json())
    .then(() => fetchThoughts())
    .then((newThought) => console.log(newThought))
    .finally(() => setNewThought(''));
  };

  return (
    <div>
      <Form 
        newThought={newThought} 
        onFormSubmit={onFormSubmit} 
        onNewThoughtChange={handleNewThoughtChange}
      />
      <Thoughts 
        loading={loading}
        thoughts={thoughts} 
      />
    </div>
  )
}
