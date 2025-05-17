// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


import { getUserIDs } from "/common.mjs";

import { addData, clearData, getData } from "/storage.js"; 

console.log("script.js: Script parsing started.");


window.onload = function () {
  const users = getUserIDs();
  //document.querySelector("body").innerText = `There are ${users.length} users`;// coment this LINE!!! OR DELET IT

  // REMEMBER NOT CLOSING WINDOW.ONLOAD UNTIL THE END OF THE PROJECT/CODE!!!!//


// ELEMENT REFERENCE/
const userSelect = document.getElementById("userSelect");

//ELEMENTS FORM REFERENCE//

const taskNameInput = document.getElementById("taskNameInput");
const startDateInput = document.getElementById("startDateInput");
const submitTaskButton = document.getElementById("submitTaskButton");

// AREA DISPLAY REF//
const taskDisplayArea = document.getElementById("taskDisplayArea");
const taskList = document.getElementById("taskList");

// STARTING selectUsrrID from the dropfdonw menu//

//1- safet check if dropdonw existe:


  const userSelectDropdown = document.getElementById("userSelect");

  // SAFE CHECK IF DROPDOWN/user EXISTS:
  if (userSelectDropdown) {
    console.log("SUCCESS - The id='userSelect' HTML element was found.");

    // --- STEP 1: Add the DEFOULT "Select a user..." FIRST ---

    const defaultOption = document.createElement('option');// CREAT A COSNT FOR THE ELEMENT
    defaultOption.value = ""; // Empty value
    defaultOption.textContent = "Select a user...";
    defaultOption.selected = true; // VER IMPORTANT TOMAKE THIS OPTION APPER FISRT
    userSelectDropdown.appendChild(defaultOption);
    console.log("Default 'Select a user...' option added to dropdown.");


    // --- STEP 2: USER IDs ADD DROPDONN MENU ---
    // 1- Create loop to add the users
    // a) criar variable const to armazen the data 
    // b) cria CONST OPTION  & SET TEXT CONTENT
    // C) APEND CHILD User
    try {
      const userIdsArray = getUserIDs(); // CALL the function

      // loop in the userIdsArray 
      userIdsArray.forEach(function (userId) { 
        const option = document.createElement('option');
        option.value = userId;                 
        option.textContent = `User ${userId}`; //get value of the arry or ption.textContent = userId; ( 1, 2, 3, 4, 5)
        userSelectDropdown.appendChild(option); // show creat value in the dropmenu visiblein the broser
      });

      console.log("Actual user options added to dropdown."); // check console if working

    } catch (error) {
      console.error("Error getting or processing user IDs:", error); // if getUserIDs() isn't imported correctly or common.mjs 
    }

  } else {
    console.error("CRITICAL: User select dropdown element with id 'userSelect' not found!");
  }

  console.log("Dropdown population attempt finished."); // Changed message slightly
  // }; // end of window.onload

  console.log("Safety check finished.")

















}; // End of window.onload

console.log("main.js: Script parsing finished.");




