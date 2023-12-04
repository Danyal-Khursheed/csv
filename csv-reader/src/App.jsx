import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';

// Replace 'your-firebase-config' with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOyAqU-Iyl8BQ4TXYOVOQJuwL9YZ0KKVU",
  authDomain: "csv-proejct.firebaseapp.com",
  projectId: "csv-proejct",
  storageBucket: "csv-proejct.appspot.com",
  messagingSenderId: "254827264424",
  appId: "1:254827264424:web:2bd8f4ebfe69e5b5ddc59d",
  measurementId: "G-BB9QSYDCR4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {
  const [data, setData] = useState([]);
  const [colum, setColum] = useState([]);
  const [value, setValue] = useState([]);

  const handleFile = async (e) => {
  console.log('File selected');

  const file = e.target.files[0];

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async function (result) {
      console.log('CSV data parsed:', result.data);

      const columArray = Object.keys(result.data[0]);
      const valueArray = result.data.map((d) => Object.values(d));

      setData(result.data);
      setColum(columArray);
      setValue(valueArray);

      const storageRef = ref(storage, file.name);

      // Convert CSV data to a Blob
      const csvBlob = new Blob([Papa.unparse(result.data)], { type: 'text/csv' });

      console.log('Uploading CSV data:', csvBlob);

      await uploadString(storageRef, csvBlob, 'data/csv');

      console.log('File uploaded successfully');
    },
  });
};

  
  

  const uploadFile = () => {
    // Add any additional logic for file upload if needed
    console.log('Upload button clicked');
  };

  return (
    <div className="container">
      <div className="modal">
        {/* ... Modal code ... */}
        <div className="modal-body">
          <h2 className="modal-title">Upload a file</h2>
          <p className="modal-description">Attach the file below</p>
          <input type="file" name="file" accept=".csv" onChange={handleFile} />
        </div>
        <div className="modal-footer">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary" onClick={uploadFile}>Upload File</button>
        </div>
      </div>

      <table style={{ borderCollapse: "collapse", border: "1px solid black", margin: "5px auto" }}>
        <thead>
          <tr>
            {colum.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((v, i) => (
            <tr key={i}>
              {v.map((value, j) => (
                <td key={j}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
