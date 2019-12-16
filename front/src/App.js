import React from 'react';
import './style.css'
import UploadForm from './components/UploadForm';

const App = () => {
  return (
    <div className="App">
      <div className="container my-5">
        <UploadForm />
      </div>
    </div>
  );
}

export default App;