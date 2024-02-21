// src/components/ResizableLayout/ResizableComponent.js
import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles
import '../Styles/ResizableLayout.css';

const ResizableComponent = ({ width, height, onResize }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const handleAdd = () => {
    // Call your backend API to add data
    fetch('https://dataneuron-nu8i.onrender.com/api/add-edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedbackMessage({ type: 'success', message: data.message });
        // Clear input fields after adding
        setName('');
        setValue('');
      })
      .catch(error => {
        console.error('Error:', error);
        setFeedbackMessage({ type: 'error', message: 'An error occurred while adding data.' });
      });
  };

  const handleUpdate = () => {
    // Call your backend API to update data
    fetch('https://dataneuron-nu8i.onrender.com/api/add-edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedbackMessage({ type: 'success', message: data.message });
        // Clear input fields after updating
        setName('');
        setValue('');
      })
      .catch(error => {
        console.error('Error:', error);
        setFeedbackMessage({ type: 'error', message: 'An error occurred while updating data.' });
      });
  };

  return (
    <ResizableBox
      width={width}
      height={height}
      onResize={onResize}
      minConstraints={[100, 100]}
      axis="both"
    >
      {/* Your content goes here */}
      <div className="resizable-content">
        <form>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Value:
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
          <button type="button" onClick={handleAdd}>Add</button>
          <br />
          <button type="button" onClick={handleUpdate}>Update</button>
        </form>
        {feedbackMessage && (
          <div className={feedbackMessage.type}>
            {feedbackMessage.message}
          </div>
        )}
      </div>
    </ResizableBox>
  );
};

export default ResizableComponent;
