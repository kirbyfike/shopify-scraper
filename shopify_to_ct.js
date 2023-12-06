const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let shopifyUrl = 'www.someUrl.com';

const apiUrl = `https://${shopifyUrl}/collections/bestsellers/products.json`; // Replace with your JSON API URL
const csvFilePath = 'output.csv';

// Fetch JSON data from the API
axios.get(apiUrl)
  .then(response => {
    const jsonData = response.data.products;

    console.log(jsonData);



    // Extract column headers from the first object in the array
    const headers = Object.keys(jsonData[0]);

    // Create a CSV writer
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: headers.map(header => ({ id: header, title: header }))
    });

    // Write data to CSV file
    csvWriter.writeRecords(jsonData)
      .then(() => console.log('CSV file written successfully'))
      .catch(error => console.error('Error writing CSV file:', error));
  })
  .catch(error => console.error('Error fetching JSON data:', error));