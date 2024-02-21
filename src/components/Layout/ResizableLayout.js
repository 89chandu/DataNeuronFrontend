// src/components/ResizableLayout/ResizableLayout.js
import React, { useState, useEffect } from 'react';
import ResizableComponent from './ResizableComponent';
import DataviewComponent from './Dataview';
import DuplicatedResizableComponent from './ApiCount';
import '../Styles/ResizableLayout.css';

const ResizableLayout = () => {
  const [sizes, setSizes] = useState([200, 200, 200]);
  const [data, setData] = useState([]);
  const [apiCount, setApiCount] = useState({ addCount: 0, updateCount: 0 });

  const handleResize = (index) => (event, { size }) => {
    const newSizes = [...sizes];
    newSizes[index] = size.width;
    setSizes(newSizes);
  };

  useEffect(() => {
    // Fetch data from the backend API
    fetch('https://dataneuron-nu8i.onrender.com/api/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Fetch API count from the backend API
    fetch('https://dataneuron-nu8i.onrender.com/api/count')
      .then(response => response.json())
      .then(apiCount => {
        console.log(apiCount);
        setApiCount(apiCount);
      })
      .catch(error => {
        console.error('Error fetching API count:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div className="resizable-layout">
      <ResizableComponent width={sizes[0]} height={300} onResize={handleResize(0)}>
        {/* Content for the first component */}
        <div>
          <h2>Add/Update</h2>
          <form>
            {/* Add your input fields for add/update here */}
            {/* For example:
         
            */}
            <button type="button">Add/Update</button>
          </form>
        </div>
      </ResizableComponent>

      

      <DataviewComponent width={sizes[2]} height={300} onResize={handleResize(2)} data={data} />



      <DuplicatedResizableComponent width={sizes[2]} height={300} onResize={handleResize(2)} apiCount={apiCount} />

 
    </div>
  );
};

export default ResizableLayout;
