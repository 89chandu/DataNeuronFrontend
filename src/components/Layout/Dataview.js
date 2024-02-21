// src/components/ResizableLayout/DataviewComponent.js
import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles
import '../Styles/ResizableLayout.css';

const DataviewComponent = ({ width, height, onResize, apiCount, data }) => {
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [updateData, setUpdateData] = useState({ name: '', value: '', _id: null });

  const handleUpdateItem = (entry) => {
    setUpdateData({ name: entry.name, value: entry.value, _id: entry._id });
  };

  const handleUpdate = () => {
    // Call your backend API to update data for the DataView component
    fetch('https://dataneuron-nu8i.onrender.com/api/add-edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updateData.name, value: updateData.value, _id: updateData._id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFeedbackMessage({ type: 'success', message: data.message });
        setUpdateData({ name: '', value: '', _id: null }); // Clear update data
        // Update API count
        // setApiCount(prevCount => ({ ...prevCount, updateCount: prevCount.updateCount + 1 }));
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
        <div>
          <h2>View</h2>
          <ul>
            {data.map(entry => (
              <li key={entry._id}>
                <strong>{entry.name}:</strong> {entry.value}
                <button type="button" onClick={() => handleUpdateItem(entry)}>
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
        {updateData._id && (
          <div>
            <form>
              <label>
                Name:
                <input type="text" value={updateData.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} />
              </label>
              <label>
                Value:
                <input type="text" value={updateData.value} onChange={(e) => setUpdateData({ ...updateData, value: e.target.value })} />
              </label>
              <button type="button" onClick={handleUpdate}>
                Update Item
              </button>
            </form>
          </div>
        )}
        {feedbackMessage && (
          <div className={feedbackMessage.type}>
            {feedbackMessage.message}
          </div>
        )}
      </div>
    </ResizableBox>
  );
};

export default DataviewComponent;
