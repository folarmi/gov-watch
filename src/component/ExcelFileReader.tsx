/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as XLSX from "xlsx";

function ExcelFileReader({ data, setData }: any) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Assuming you want to read the first sheet in the workbook
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet into a JSON object
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // header: 1 gives arrays of arrays
        setData(jsonData); // Save the data in the state
      };
      reader.readAsArrayBuffer(file); // Read the file as a binary string
    }
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
      <div className="mt-4 flex items-center">
        <h3>Data from Excel File:</h3>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {data[0].map((heading: any, index: any) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row: any, rowIndex: any) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data loaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default ExcelFileReader;
