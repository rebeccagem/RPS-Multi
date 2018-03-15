$(document).ready(function () {
    $(".oneButtonGrp").hide();
    $(".twoButtonGrp").hide();

    // Create a variable to reference the database.
    var database = firebase.database();

    var playerOne = {
        name: " ",
        choice: " ",
        win: 0,
        loss: 0,
        tie: 0,
    };
    var playerTwo = {
        name: " ",
        choice: "  ",
        win: 0,
        loss: 0,
        tie: 0,
    };


    var refChat = database.ref("chat");
    var chatData = {};
    var chatBox;

    $("#chatBtn").on("click", function () {
        chatBox = $("#chatInput").val().trim();
        console.log(chatBox);
        chatData = {
            chatText: chatBox
        };
        refChat.push(chatData);
        $("#chatInput").val(" ");
    });

    refChat.on("value", updateChatBox, errData);

    function updateChatBox(data){
        $("#chatBoxArea").empty();
        var showChat = data.val();
        var keys = Object.keys(showChat);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var chatLog = showChat[k].chatText;
            $("#chatBoxArea").append("<p>" + chatLog + "</p>");
            console.log(chatLog);
        }
    }

    function errData(err) {
        console.log("ERROR");
    }
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
                playerOne.choice = "rock";
                talkToDatabase();
                break;

            case "onePaper": playerOne.choice = "paper";
                console.log("PAPER WAS CLICKED BY PLAYER ONE");
                playerOne.choice = "paper";
                talkToDatabase();
                break;

            case "oneScissors": playerOne.choice = "scissors";
                playerOne.choice = "scissors";
                talkToDatabase();
                console.log("SCISSORS WAS CLICKED BY PLAYER ONE");

        }

    });

    $(".twoButtonGrp").on("click", function () {

        switch (this.value) {

            case "twoRock": playerTwo.choice = "rock";
                playerTwo.choice = "rock";
                talkToDatabase();
                console.log("ROCK WAS CLICKED BY PLAYER TWO");
                break;

            case "twoPaper": playerTwo.choice = "paper";
                playerTwo.choice = "paper";
                talkToDatabase();
                console.log("PAPER WAS CLICKED BY PLAYER TWO");
                break;

            case "twoScissors": playerTwo.choice = "scissors";
                playerTwo.choice = "scissors";
                talkToDatabase();
                console.log("SCISSORS WAS CLICKED BY PLAYER TWO");

        }


    });

    //comparing answers





    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function (snapshot) {

        // Then we console.log the value of snapshot
        console.log(snapshot.val());

        // Then update the clickCounter variable with data from the database.
        playerOne = snapshot.val().players.playerOne;

        console.log("before if!");
        console.log(playerOne.choice, snapshot.val().players.playerTwo.choice);


        // check to see if choices have been made
        if (snapshot.val().players.playerOne.choice === undefined || snapshot.val().players.playerTwo.choice === undefined) {
            console.log("WE ARE UNDEFINED NOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        }
        else {
            switch (snapshot.val().players.playerOne.choice) {
                case "rock": switch (snapshot.val().players.playerTwo.choice) {
                    case "rock": console.log("It's a tie!");
                        playerOne.tie++;
                        playerTwo.tie++;
                        break;
                    case "paper": console.log("Player Two Wins!");
                        playerTwo.win++;
                        playerOne.loss++;
                        break;
                    case "scissors": console.log("Player One Wins!");
                        playerOne.win++;
                        playerTwo.loss++;
                }
                    break;
                case "paper": switch (snapshot.val().players.playerTwo.choice) {
                    case "rock": console.log("Player One Wins!");
                        playerOne.win++;
                        playerTwo.loss++;
                        console.log(playerOne, playerTwo);
                        break;
                    case "paper": console.log("It's a tie!");
                        playerOne.tie++;
                        playerTwo.tie++;
                        console.log(playerOne, playerTwo);
                        break;
                    case "scissors": console.log("Player Two Wins!");
                        playerTwo.win++;
                        playerOne.loss++;
                        console.log(playerOne, playerTwo);
                }
                    break;
                case "scissors": switch (snapshot.val().players.playerTwo.choice) {
                    case "rock": console.log("Player Two Wins!");
                        playerTwo.win++;
                        playerOne.loss++;
                        break;
                    case "paper": console.log("Player One Wins!");
                        playerOne.win++;
                        playerTwo.loss++;
                        break;
                    case "scissors": console.log("It's a tie!");
                        playerOne.tie++;
                        playerTwo.tie++;
                }
            }
        }


        // else if(playerOne.choice==="rock"&&playerTwo.choice==="paper"){
        //     console.log("PlayerTwoWins!");
        // }


        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
    }, function (errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });

    function talkToDatabase() {
        database.ref().child("players").child("playerOne").set({
            name: playerOne.name,
            choice: playerOne.choice
        });
        database.ref().child("players").child("playerTwo").set({
            name: playerTwo.name,
            choice: playerTwo.choice
        });

    }


});


//make switchcase for win, loss, tie
// if (snapshot.val().players.playerOne.choice === undefined || snapshot.val().players.playerTwo.choice === undefined){
//     console.log("WE ARE UNDEFINED NOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
// }
// else if(snapshot.val().players.playerOne.choice===snapshot.val().players.playerTwo.choice){
//     console.log("It's a tie!");
// }
// else if(snapshot.val().players.playerOne.choice === "rock" && snapshot.val().players.playerTwo.choice === "paper"){
//     console.log("Player two wins!")
// }
// else if(snapshot.val().players.playerOne.choice === "paper" && snapshot.val().players.playerTwo.choice === "scissors"){
//     console.log("Player two wins!")
// }
// else if(snapshot.val().players.playerOne.choice === "scissors" && snapshot.val().players.playerTwo.choice === "rock"){
//     console.log("Player two wins!")
// }