const fs = require('fs');
const XLSX = require('xlsx');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('postHolder.json', 'utf-8'));

// Convert the JSON data to an Excel worksheet
const ws = XLSX.utils.json_to_sheet(jsonData);

// Create a new workbook and append the worksheet
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

// Write the workbook to an Excel file
XLSX.writeFile(wb, 'scrapped.xlsx');

// const XLSX = require('xlsx');
// const fs = require('fs');

// // Load the Excel file
// const workbook = XLSX.readFile('toconvert.xlsx');

// // Get the first worksheet's name
// const sheet_name = workbook.SheetNames[0];

// // Get the content of the first worksheet
// const worksheet = workbook.Sheets[sheet_name];

// // Convert the content of the worksheet to JSON
// const jsonContent = XLSX.utils.sheet_to_json(worksheet);

// // Save the JSON content to a file
// fs.writeFileSync('converted.json', JSON.stringify(jsonContent, null, 2));
