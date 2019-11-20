
$('#animated').click(function () {
    $("#animated").toggle(this.checked);
});

$("#cat-button").on("click", function (event) {
    var queryURL = "https://api.thecatapi.com/v1/images/search";

    if (document.getElementById('animated').checked) {
        console.log("checked");
        queryURL += "?mime_types=gif";
    }
    else{
        queryURL += "?mime_types=jpg,png";
    }
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (catInfo) {
        var imageURL = catInfo[0].url;
        var imageHeight = catInfo[0].height;
        var imageWidth = catInfo[0].width;
        //------------------------------------------//
        $("#cat-image").attr("src", imageURL);
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

