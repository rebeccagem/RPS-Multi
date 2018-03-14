$(document).ready(function () {
    $(".oneButtonGrp").hide();
    $(".twoButtonGrp").hide();

    // Create a variable to reference the database.
    var database = firebase.database();

    var playerOne = {
        name: " ",
        choice: " ",
    };
    var playerTwo = {
        name: " ",
        choice: " ",
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

        //creates PLAYER ONE
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

            // Code for handling the push
            database.ref().child("players").child("playerOne").set({
                name: playerOne.name
            });
            $(".oneButtonGrp").show();
            var waitingTwoDiv = $("<div>").addClass("waitingTwoDiv");
            waitingTwoDiv.append("Waiting for your opponent...");
            $("#playerTwoCardBody").append(waitingTwoDiv);
        }
        //creates PLAYER TWO
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
            $(".twoButtonGrp").show();
            var waitingOneDiv = $("<div>").addClass("waitingOneDiv");
            waitingOneDiv.append("Waiting for your opponent...");
            $("#playerOneCardBody").append(waitingOneDiv);
        }

    });


    $(".oneButtonGrp").on("click", function () {

        switch (this.value) {

            case "oneRock": playerOne.choice = "rock";
                console.log("ROCK WAS CLICKED BY PLAYER ONE");
                break;

            case "onePaper": playerOne.choice = "paper";
                console.log("PAPER WAS CLICKED BY PLAYER ONE");
                break;

            case "oneScissors": playerOne.choice = "scissors";
                console.log("SCISSORS WAS CLICKED BY PLAYER ONE");

        }

    });

    $(".twoButtonGrp").on("click", function () {
        
        switch (this.value) {

            case "twoRock": playerOne.choice = "rock";
                console.log("ROCK WAS CLICKED BY PLAYER ONE");
                break;

            case "twoPaper": playerOne.choice = "paper";
                console.log("PAPER WAS CLICKED BY PLAYER ONE");
                break;

            case "twoScissors": playerOne.choice = "scissors";
                console.log("SCISSORS WAS CLICKED BY PLAYER ONE");

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

});
