var queryURL = "https://api.thecatapi.com/v1/images/search";

$("#cat-button").on("click", function(event) {
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (catInfo) {
    var imageURL = catInfo[0].url;
    var imageHeight = catInfo[0].height;
    var imageWidth = catInfo[0].width;
    console.log("image url is " + imageURL);
    $("#cat-image").attr("src", imageURL);
    console.log("image height is " + imageHeight);
    console.log("image width is " + imageWidth);
    getQRCodeImage(imageURL);

});
});


function getQRCodeImage(URL) {
    var QRCodeQueryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + URL;
    $.ajax({
    url: QRCodeQueryURL,
    method: "GET"
}).then(function (QRURL) {
    console.log("QR code URL is " + QRCodeQueryURL);
    $("#qr-image").attr("src", QRCodeQueryURL);
});
}
