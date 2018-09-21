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

var name = "";
var role = "";
var startDate = "";
var monthlyRate = "";

$("#submit").on("click", function(event) {
    console.log("button clicked");
    
    event.preventDefault();

    name = $("#employee-name").val().trim();
    role = $("#employee-role").val().trim();
    startDate = $("#employee-start-date").val().trim();
    monthlyRate = $("#employee-monthly-rate").val().trim();

    var startDateValue = moment(startDate, "MM/DD/YYYY").valueOf();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDateValue,
        monthlyRate : monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate)

    var dateMoment = moment(sv.startDate);

    // Calculate months worked
    var monthsWorked = moment().diff(dateMoment, "months");

    var newTableRow = $("<tr>");
    
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


    newTableRow.append(nameData).append(roleData).append(startDateData).append(monthlyRateData);

    $("#employee-data").append(newTableRow);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
