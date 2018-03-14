$(document).ready(function () {

    // Create a variable to reference the database.
    var database = firebase.database();

    var playerOne = {
        name: " ",
    };
    var playerTwo = {
        name: " ",
    };

    //push players with player one and player two into the database

    // Code for handling the push
    database.ref().child("players").set({
        playerOne: playerOne,
        playerTwo: playerTwo
    });

    // Capture Button Click
    $("#userNameSubmit").on("click", function (event) {
        // prevent form from trying to submit/refresh the page
        event.preventDefault();

        console.log("Player One: " + playerOne.name);
        console.log("Player Two: " + playerTwo.name);

        if (playerOne.name === " ") {
            // Capture User Input and store them into variables
            playerOne.name = $("#userNameInput").val().trim();
            console.log(playerOne.name);

            ///LOCAL STORAGEEEEEE
            localStorage.setItem("playerOneName", playerOne.name);
            $("#userNameInputContainer").hide();
            // Creat div to hold html welcome text
            var welcomeDiv = $("<div>").addClass("welcomeDiv");
            welcomeDiv.append("Hello, " + localStorage.getItem("playerOneName") + ". You are Player 1!");
            $("#underTitle").append(welcomeDiv);

            //       // Code for handling the push
            database.ref().child("players").child("playerOne").set({
                name: playerOne.name
            });
        }

        else {

            //checks local storage for player 2 and if there is one, passes info to firebase
            console.log("There is already a player one");
            // Capture User Input and store them into variables
            playerTwo.name = $("#userNameInput").val().trim();
            console.log(playerTwo.name);
            $("#userNameInputContainer").hide();

            // Creat div to hold html welcome text
            var welcomeDiv = $("<div>").addClass("welcomeDiv");
            welcomeDiv.append("Hello, " + playerTwo.name + ". You are Player 2!");
            $("#underTitle").append(welcomeDiv);

            localStorage.setItem("playerTwoName", playerTwo.name);
            // Code for handling the push
            database.ref().child("players").child("playerTwo").set({
                name: playerTwo.name
            });
        }
    });

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function (snapshot) {

        // Then we console.log the value of snapshot
        console.log(snapshot.val());

        // Then update the clickCounter variable with data from the database.
        playerOne = snapshot.val().players.playerOne;
        // playerTwo = snapshot.val().players.playerTwo;

        console.log(playerOne);

        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
    }, function (errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });

    // function showWelcomeOne() {
    //     $("#userNameInputContainer").hide();
    //     // Creat div to hold html welcome text
    //     var welcomeDiv = $("<div>").addClass("welcomeDiv");
    //     welcomeDiv.append("Hello, " + localStorage.getItem("playerOneName") + ". You are Player 1!");
    //     $("#underTitle").append(welcomeDiv);
    // }

});
