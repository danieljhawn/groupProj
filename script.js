var APIkey = "f74eebc0-82d1-42da-a064-0153a52d95f2";

// variable for the cats
var querycatURL = "https://api.thecatapi.com/v1/images/search";

//ajax call for the cats
$.ajax({
    url: querycatURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

        // Log the querycatURL
        console.log(querycatURL);
    });


//onclick function for cat button
$("#cat-button").on("click", function () {
 console.log("cat url: " + response.url)
});

 // onlick function for QR button
 // $("#QR-button").on("click", function () {
 