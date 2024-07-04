import React from 'react';
import Papa from 'papaparse';

const CSVUpload = ({ onDataParsed }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => onDataParsed(result.data),
      });
    }
  };

  return (
    <div className="CSVUpload">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        aria-label="Upload your Goodreads CSV file"
      />
    </div>
  );
};

export default CSVUpload;
