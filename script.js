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
const addTaskForm = document.getElementById("addTaskForm");
const taskNameInput = document.getElementById("taskNameInput");
const startDateInput = document.getElementById("startDateInput");
const submitTaskButton = document.getElementById("submitTaskButton");
  //console.log(addTaskForm, taskNameInput, startDateInput);
// AREA DISPLAY REF//
const taskDisplayArea = document.getElementById("taskDisplayArea");
const taskList = document.getElementById("taskList");
const noTaskMesage = document.getElementById("noTaskMesage");

// STARTING selectUsrrID from the dropfdonw menu//

const userSelectDropdown = document.getElementById("userSelect");

  //1- safet check if dropdonw existe:
  
  if (userSelectDropdown) {
    console.log("SUCCESS - The id='userSelect' HTML element was found.");

    // --- STEP 1: Add the DEFOULT "Select a user..." FIRST ---

    const defaultOption = document.createElement('option');// CREAT A COSNT FOR THE ELEMENT
    defaultOption.value = ""; // Empty value
    defaultOption.textContent = "Select a user...";
    defaultOption.selected = true; // VER IMPORTANT TO MAKE THIS OPTION APPER FISRT
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
        userSelectDropdown.appendChild(option); // show creat value in the dropmenu visible in the broser
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

  //CARD 03---Displaying Tasks for Selected Use/ PART 1= CHECK AND CHANGE USER

  //const userSelectDropdown = document.getElementById("userSelect"); // userSelectDropdown/userSelect need to watch this to check if it has been changed
  

  if (userSelectDropdown) { // check if it exists and has been changed
    userSelectDropdown.addEventListener('change', function (event) {
      console.log("Dropdown selection changed!");


      const selectedUserId = event.target.value; // 'event.target' is the dropdown element itself / value is the option choosen
      console.log("Selected User ID:", selectedUserId);

// A)= if user has been chaneg before display task need to clear dispaly

  taskList.innerHTML = ''; // This removes all <li> child elements from the <ul>
  console.log("Task list cleared.");

 //B) NOW GET DATA/ TASK DO USER

  if (selectedUserId) { // try to get data if a user ID was actually selected
    const agendaItems = getData(selectedUserId); // Fetch data using the function from storage.js
    console.log("Data for user:", selectedUserId, agendaItems);

  //C)  CHECK TASK FOR THE USER 
    // Now, check if this selected user HAS any tasks

      if (agendaItems && agendaItems.length > 0) {
        // There ARE agenda items to display
        noTaskMesage.style.display = 'none'; // Hide the "no tasks" message
        taskList.style.display = '';        // Make sure the <ul> is visible (resets to default display)


//D) DISPLAY TASKS OR "MESSAgE NO TASKS"

        agendaItems.forEach(function (item) {
          const listItem = document.createElement('li'); // Create a new <li> element
          listItem.textContent = `${item.topic} - ${item.revisionDate}`; // Set its text
          taskList.appendChild(listItem); // Add the <li> to the <ul>
        });
        console.log(`Displayed ${agendaItems.length} tasks for User ${selectedUserId}`);
      }
      } else {
        // This is the 'else' for 'if (selectedUserId)'
        // NO user is selected (e.g., "Select a user..." option was chosen)
        noTaskMesage.style.display = 'block'; // Show a message
        noTaskMesage.textContent = "Please select a user to see their agenda."; // Set appropriate message
        taskList.style.display = 'none';      // Hide the task list UL
       console.log("No user selected (default option). Displaying 'Please select' message."); 
      }
    
    }); // Close  addEventListener function and call

    // --- NEW pase 4: Event Listener for Form Submission ---

    if (addTaskForm) { //  check if the form element was found
      addTaskForm.addEventListener('submit', function (event) {
        console.log("Add Task form submitted!");

        event.preventDefault(); // VERY IMPORTANT: Prevents the page from reloading
        console.log("Add Task form submitted! Default page reload PREVENTED.");

        const taskName = taskNameInput.value;
        const startDate = startDateInput.value;

        console.log("Task Name entered:", taskName);
        console.log("Start Date selected:", startDate);
      });
      console.log("Event listener added to addTaskForm for 'submit' event.");
    } else {
      console.error("CRITICAL: addTaskForm element not found. Cannot add submit listener.");
    }
  



  } else { 
    console.error("CRITICAL: Could not add event listener because userSelectDropdown was not found.");
  }  



}; // End of window.onload

console.log("main.js: Script parsing finished.");
