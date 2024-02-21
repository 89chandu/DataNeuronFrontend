// src/components/ResizableLayout/DuplicatedResizableComponent.js
import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles
import '../Styles/ResizableLayout.css';

// DuplicatedResizableComponent functional component
const DuplicatedResizableComponent = ({ width, height, onResize, apiCount }) => {
  // State for input fields and feedback message
  const [itemName, setItemName] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Function to handle adding an item
  const handleAddItem = () => {
    // Call your backend API to add data for the duplicated component
    fetch('https://dataneuron-nu8i.onrender.com/api/add-edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: itemName, value: itemValue }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedbackMessage({ type: 'success', message: data.message });
        // Clear input fields after adding
        setItemName('');
        setItemValue('');
        // Update API count (commented out for now)
        // setApiCount(prevCount => ({ ...prevCount, addCount: prevCount.addCount + 1 }));
      })
      .catch(error => {
        console.error('Error:', error);
        setFeedbackMessage({ type: 'error', message: 'An error occurred while adding data.' });
      });
  };

  // Function to handle updating an item
  const handleUpdateItem = () => {
    // Call your backend API to update data for the duplicated component
    fetch('https://dataneuron-nu8i.onrender.com/api/add-edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: itemName, value: itemValue }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedbackMessage({ type: 'success', message: data.message });
        // Clear input fields after updating
        setItemName('');
        setItemValue('');
        // Update API count (commented out for now)
        // setApiCount(prevCount => ({ ...prevCount, updateCount: prevCount.updateCount + 1 }));
      })
      .catch(error => {
        console.error('Error:', error);
        setFeedbackMessage({ type: 'error', message: 'An error occurred while updating data.' });
      });
  };

  // JSX structure for the resizable component
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
        <div>
          {/* API Count display */}
          <h2>API Count</h2>
          <p>API Add Count: {apiCount.addCount}</p>
          <p>API Update Count: {apiCount.updateCount}</p>
        </div>

        {/* Display feedback message if present */}
        {feedbackMessage && (
          <div className={feedbackMessage.type}>
            {feedbackMessage.message}
          </div>
        )}
      </div>
    </ResizableBox>
  );
};

export default DuplicatedResizableComponent;
