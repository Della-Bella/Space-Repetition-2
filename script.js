// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


import { getUserIDs } from "/common.mjs";

import { addData, clearData, getData } from "/storage.js"; 

console.log("script.js: Script parsing started.");

// --- CARD 8= HELPER FUNCTION to format a Date object to YYYY-MM-DD string ---
function formatDate(dateObject) {
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// CARD 7- START CLCULATE TASK INTERVAL DATES// FUNCTION NEEDS TO BE OUTSIDE THE WINDOW.LOAD

  function calculateRevisionDates(startDateString, topicName) {
    console.log(`Calculating revision dates for topic "${topicName}" starting from "${startDateString}"`);

    const startDate = new Date(startDateString);
    startDate.setHours(12, 0, 0, 0); // Ensure consistent date handling

    const agendaItems = [];

    // Calculate +1 Week
    const datePlus1Week = new Date(startDate);
    datePlus1Week.setDate(startDate.getDate() + 7);
    agendaItems.push({
      topic: topicName,
      revisionDate: formatDate(datePlus1Week),
       intervalLabel: "+1 Week"
    });

    // --- NEW: Calculate +1 Month ---
    const datePlus1Month = new Date(startDate);
    datePlus1Month.setMonth(startDate.getMonth() + 1);
    agendaItems.push({
      topic: topicName,
      revisionDate: formatDate(datePlus1Month),
      intervalLabel: "+1 Month" //add label interval 
    });
    // --- END OF +1 Month ---

    // --- NEW: Calculate +3 Months ---
    const datePlus3Months = new Date(startDate);
    datePlus3Months.setMonth(startDate.getMonth() + 3);
    agendaItems.push({
      topic: topicName,
      revisionDate: formatDate(datePlus3Months),
      intervalLabel: "+3 Months"
    });
    // --- END OF +3 Months ---

    // --- NEW: Calculate +6 Months ---
    const datePlus6Months = new Date(startDate);
    datePlus6Months.setMonth(startDate.getMonth() + 6);
    agendaItems.push({
      topic: topicName,
      revisionDate: formatDate(datePlus6Months),
      intervalLabel: "+6 Months" 
    });
    // --- END OF +6 Months ---

    // --- NEW: Calculate +1 Year ---
    const datePlus1Year = new Date(startDate);
    datePlus1Year.setFullYear(startDate.getFullYear() + 1);
    agendaItems.push({
      topic: topicName,
      revisionDate: formatDate(datePlus1Year),
      intervalLabel: "+1 Year"
    });
 

    console.log("Calculated agenda items (with labels):", agendaItems); // Log the full list
    return agendaItems;
  }

// --- CARD 8 PAHESE B Function to Render Agenda for a User 
function renderAgenda(userId) {
  console.log(`renderAgenda called for User ID: ${userId}`);
  // We will move the task display logic here in the next step.
  // --- Mcard 8 PHASE C renderAgenda function ---

  const taskListElement = document.getElementById("taskList");  // These were previously defined inside window.onload, but renderAgenda is global.
  const noTaskMessageElement = document.getElementById("noTaskMesage");  // These were previously defined inside window.onload, but renderAgenda is global.
  // Safety check if elements aren't found (should not happen if HTML is correct)
  if (!taskListElement || !noTaskMessageElement) {
    console.error("CRITICAL: taskList or noTaskMesage element not found in renderAgenda!");
    return; // Exit the function if essential elements are missing
  }

  // A) Clear previous tasks from the list
  taskListElement.innerHTML = '';
  console.log("renderAgenda: Task list cleared.");

  // B) Handle based on whether a user is selected
  if (userId) { // A user ID was provided
    const agendaItems = getData(userId); // Fetch data for the selected user
    console.log(`renderAgenda: Data for user ${userId}:`, agendaItems);

    // C) Check if the user has tasks
    if (agendaItems && agendaItems.length > 0) {
      // User HAS tasks
      noTaskMessageElement.style.display = 'none'; // Hide "no tasks" message
      taskListElement.style.display = '';        // Make sure task list UL is visible

      // D) Display the tasks
      agendaItems.forEach(function (item) {
        const listItem = document.createElement('li');
        let displayText = `${item.topic} - ${item.revisionDate}`; // add to display lalbes
        listItem.textContent = `${item.topic} - ${item.revisionDate} (${item.intervalLabel})`;// add to display lalbes
        taskListElement.appendChild(listItem);
      });
      console.log(`renderAgenda: Displayed ${agendaItems.length} tasks for User ${userId}`);
    } else {
      // User is selected, but has NO tasks (or agendaItems is null)
      noTaskMessageElement.style.display = 'block'; // Show the message
      noTaskMessageElement.textContent = "No tasks for this user."; // Set appropriate message
      taskListElement.style.display = 'none';    // Hide the (empty) task list UL
      console.log(`renderAgenda: No tasks found for User ${userId}. Displaying message.`);
    }
  } else {
    // NO user ID was provided (e.g., "Select a user..." was chosen)
    noTaskMessageElement.style.display = 'block'; // Show the message
    noTaskMessageElement.textContent = "Please select a user to see their agenda.";
    taskListElement.style.display = 'none';      // Hide the task list UL
    console.log("renderAgenda: No user selected. Displaying 'Please select' message.");
  }
}
// --- END OF renderAgenda FUNCTION DEFINITION ---


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

    // ---CARD 3 PART PAHSE 6- SET ATUAL DATE DEFAULT  ---
    if (startDateInput) { // Check if the date input element exists
      const today = new Date(); // 1. Create a new Date object= TODY'S DATE

      // 2. Format the date to YYYY-MM-DD
      //    - today.getFullYear() gives the year (e.g., 2024)
      //    - today.getMonth() gives the month (0-11, so add 1)
      //    - today.getDate() gives the day (1-31)
      //    - Month and day are two digits/ 5 = 05

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // convert to String/ index intial 0 add +1, padStart "2 digits" + 0
      const day = String(today.getDate()).padStart(2, '0');       // convert to String/ padstart make sure it is 2 digits

      const formattedDate = `${year}-${month}-${day}`; // e.g., "2024-05-17"
    

      startDateInput.value = formattedDate; // Set the value of the date input
      console.log("Default start date set to:", formattedDate);

      
    } else {
      console.warn("startDateInput element not found. Cannot set default date.");
    }

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
      console.log("Selected User ID:", selectedUserId); //keep this before Card 8 phase B
      renderAgenda(selectedUserId); 

      // --- All the old display logic that was here is now GONE from the event listener ---


// A)= if user has been chaneg before display task need to clear dispaly

  // taskList.innerHTML = ''; // This removes all <li> child elements from the <ul>
  // console.log("Task list cleared.");

 //B) NOW GET DATA/ TASK DO USER

//   if (selectedUserId) { // try to get data if a user ID was actually selected
//     const agendaItems = getData(selectedUserId); // Fetch data using the function from storage.js
//     console.log("Data for user:", selectedUserId, agendaItems);

//   //C)  CHECK TASK FOR THE USER 
//     // Now, check if this selected user HAS any tasks

//       if (agendaItems && agendaItems.length > 0) {
//         // There ARE agenda items to display
//         noTaskMesage.style.display = 'none'; // Hide the "no tasks" message
//         taskList.style.display = '';        // Make sure the <ul> is visible (resets to default display)


// //D) DISPLAY TASKS OR "MESSAgE NO TASKS"

//         agendaItems.forEach(function (item) {
//           const listItem = document.createElement('li'); // Create a new <li> element
//           listItem.textContent = `${item.topic} - ${item.revisionDate}`; // Set its text
//           taskList.appendChild(listItem); // Add the <li> to the <ul>
//         });
//         console.log(`Displayed ${agendaItems.length} tasks for User ${selectedUserId}`);
//       }
//       } else {
//         // This is the 'else' for 'if (selectedUserId)'
//         // NO user is selected (e.g., "Select a user..." option was chosen)
//         noTaskMesage.style.display = 'block'; // Show a message
//         noTaskMesage.textContent = "Please select a user to see their agenda."; // Set appropriate message
//         taskList.style.display = 'none';      // Hide the task list UL
//        console.log("No user selected (default option). Displaying 'Please select' message."); 
//       }
    
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

        // CARD 8 PART C:

  
        if (taskName && startDate) { // Basic validation: ensure both fields have a value
          const newAgendaItems = calculateRevisionDates(startDate, taskName);
          console.log("Form Submit - Calculated Spaced Repetition Dates:", newAgendaItems);

          // 1- Get the currently selected User ID
          const currentSelectedUserId = userSelectDropdown.value;

          if (currentSelectedUserId) { // check the user is selected
         
            addData(currentSelectedUserId, newAgendaItems);   // Call addData to save the new items
            console.log(`Form Submit - Added ${newAgendaItems.length} new items for User ID: ${currentSelectedUserId}`);

            // 3- Call renderAgenda to refresh the display
            renderAgenda(currentSelectedUserId);
            console.log("Form Submit - Agenda re-rendered.");

            // 4-Clear the form fields after successful submission
            taskNameInput.value = ''; // Clear the task name input
            console.log("Form Submit - Form fields cleared.");

          } else {
            console.warn("Form Submit - No user selected in the dropdown. Cannot add task.");
            alert("Please select a user from the dropdown before adding a task."); // User-facing message
          }

        } else {
          console.warn("Form Submit - Task name or start date is missing.");
          alert("Please enter both a task name and a start date."); // User-facing message
        }
        // --- END OF card 8 PART C ---
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
