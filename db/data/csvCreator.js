const fs = require('fs');


const { userData, tasksData, historiesData, routinesData } = require("./dev-data/index-dev")
  
  // Function to convert array of objects to CSV string
  function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(","); 
    const rows = data.map(obj => Object.values(obj).join(",")); // Extract rows
    return [headers, ...rows].join("\n"); // Combine headers and rows
  }
  
  
  const csvUserData = convertToCSV(userData);
  const csvTasksData = convertToCSV(tasksData);
  const csvRoutinesData = convertToCSV(routinesData);
  const csvHistoriesData = convertToCSV(historiesData);
  // Write the CSV string to a file
  fs.writeFile("./userData.csv", csvUserData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("CSV file created successfully: userData.csv");
    }
  });
  fs.writeFile("./tasksData.csv", csvTasksData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("CSV file created successfully: tasksData.csv");
    }
  });
  fs.writeFile("./routinesData.csv", csvRoutinesData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("CSV file created successfully: routinesData.csv");
    }
  });
  fs.writeFile("./historiesData.csv", csvHistoriesData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("CSV file created successfully: historiesData.csv");
    }
  });