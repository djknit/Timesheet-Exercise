// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAtamn9zigSY5PCuvgLnqjMcDUB1yaBQk",
    authDomain: "employee-timesheet-bed83.firebaseapp.com",
    databaseURL: "https://employee-timesheet-bed83.firebaseio.com",
    projectId: "employee-timesheet-bed83",
    storageBucket: "employee-timesheet-bed83.appspot.com",
    messagingSenderId: "485085075624"
  };
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// create variables to hold user input
var name = "";
var role = "";
var startDate = "";
var monthlyRate = "";

// Grab the input when the form is submitted
$("#submit").on("click", function(event) {
    
    // Keep the page from reloading
    event.preventDefault();

    // Store the input values
    name = $("#employee-name").val().trim();
    role = $("#employee-role").val().trim();
    startDate = $("#employee-start-date").val().trim();
    monthlyRate = $("#employee-monthly-rate").val().trim();

    // Convert date to a MomentJS object
    var startDateValue = moment(startDate, "MM/DD/YYYY").valueOf();

    // Store info in database
    database.ref().push({
        name: name,
        role: role,
        startDate: startDateValue,
        monthlyRate : monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Clear input fields
    $(".form-control").val("");
});

// Update the page whenever a new employee is added to the database
database.ref().on("child_added", function(snapshot) {
    
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // console.log(sv);
    // console.log(sv.name);
    // console.log(sv.role);
    // console.log(sv.startDate);
    // console.log(sv.monthlyRate)

    // Create MomentJS object from date
    var dateMoment = moment(sv.startDate);

    // Calculate months worked
    var monthsWorked = moment().diff(dateMoment, "months");

    // Create table row for new employee info
    var newTableRow = $("<tr>");
    
    // Create table data elements for employee info
    var nameData = $("<td>");
    nameData.html(sv.name);

    var roleData = $("<td>");
    roleData.html(sv.role);

    var startDateData = $("<td>");
    startDateData.html(dateMoment.format("MM/DD/YYYY"));

    var monthlyRateData = $("<td>");
    monthlyRateData.html(sv.monthlyRate);

    var monthsWorkedData = $("<td>");
    monthsWorkedData.html(monthsWorked);

    // Attach the data elements to the row
    newTableRow.append(nameData).append(roleData).append(startDateData).append(monthlyRateData);

    // Attach the row to the table on the page
    $("#employee-data").append(newTableRow);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
