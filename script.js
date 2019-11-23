var arrayImg = [];

$('#animated').click(function () {
    $("#animated").toggle(this.checked);
});

$("#cat-button").on("click", function (event) {
    var queryURL = "https://api.thecatapi.com/v1/images/search";

    // checks to see if animated option is checked
    if (document.getElementById('animated').checked) {
        // if animated is checked, add ?mime_types=gif to end of queryURL
        queryURL += "?mime_types=gif";
    } else {
        // if animated is not checked, add ?mime_types=jpg,png to end of queryURL
        queryURL += "?mime_types=jpg,png";
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (catInfo) {
        // assigning url, height, width of image to variables
        var imageURL = catInfo[0].url;
        var imageHeight = catInfo[0].height;
        var imageWidth = catInfo[0].width;
        // displays cat image
        $("#cat-image").attr("src", imageURL);
        // calls function getQRCodeImage() to convert imageURL into a QR code.
        getQRCodeImage(imageURL);

        ///////////////////////////J////////////////////////////

        arrayImg.unshift([imageURL, imageWidth, imageHeight]);
        if (arrayImg.length > 10) {  //edit this number to modify the number of images stored currently 10
            arrayImg.splice(10, 1);  //edit this number to modify the number of images stored currently 10
        }
        $(".historical10").html("");

        arrayImg.forEach(function (iter, i) {
            $(".historical10").append(makeHistPlace(i));
            $(".hist" + i).html(placeHistImg(iter));
        })
        ////////////////////////////^///////////////////////////
    });
});


///////////////////////////J///////////////////////////////

$(document).on("click", ".overlay", function () {   // On click of a history button, it will bring that image into view and generate a QR code for it again
    var bufferHistImg;                              // it will also bring that image choice to first position again to delay its deletion.
    var bufferSrc = ($(this).attr("data-name"));
    arrayImg.forEach(function (hist, i) {
        if (hist[0] == bufferSrc) {
            bufferHistImg = (arrayImg[i]);
            arrayImg.splice(i, 1);
            arrayImg.unshift(bufferHistImg);
        }
    })
    $(".historical10").html("");

    arrayImg.forEach(function (iter, i) {
        $(".historical10").append(makeHistPlace(i));
        $(".hist" + i).html(placeHistImg(iter));
    })
    $("#cat-image").attr("src", arrayImg[0][0]);
    getQRCodeImage(arrayImg[0][0]);
});
///////////////////////////^///////////////////////////////

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

// function to access Cat API, and loops through breed array
function getbreed() {
    var breedURL = "https://api.thecatapi.com/v1/breeds";
    // makes ajax call for breed object array
    $.ajax({
        url: breedURL,
        method: "GET"
    }).then(function (catInfo) {
        for (let i = 0; i < catInfo.length; i++) {
            // Populates each option from breed array
            $("#dropdown").append($('<option>', {
                value: catInfo[i].id,
                text: catInfo[i].name
            }));
        }
        // Jquery manipulation of CSS of dropdown div
        $("#dropdown").css("display", "block");
        $("#dropdown").css("margin-left", "auto");
        $("#dropdown").css("margin-right", "auto");
    });
}

//populates breed list
getbreed();

$("#breed-button").on("click", function (event) {
    // add 'id' value to end of  queryURL to selected breed
    var queryURL = "https://api.thecatapi.com/v1/images/search?breed_ids=" + $('#dropdown').val();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (catInfo) {
        // assigning url, height, width of image to variables
        var imageURL = catInfo[0].url;
        var imageHeight = catInfo[0].height;
        var imageWidth = catInfo[0].width;
        // displays cat image
        $("#cat-image").attr("src", imageURL);
        // calls function getQRCodeImage() to convert imageURL into a QR code.

        ///////////////////////////J////////////////////////////

        arrayImg.unshift([imageURL, imageWidth, imageHeight]);
        if (arrayImg.length > 10) {  //edit this number to modify the number of images stored currently 10
            arrayImg.splice(10, 1);  //edit this number to modify the number of images stored currently 10
        }
        $(".historical10").html("");

        arrayImg.forEach(function (iter, i) {
            $(".historical10").append(makeHistPlace(i));
            $(".hist" + i).html(placeHistImg(iter));
        })
        ////////////////////////////^///////////////////////////

        // calls function getQRCodeImage() to convert imageURL into a QR code.
        getQRCodeImage(imageURL);
    });
});

///////////////////////////J///////////////////////////////
function resizer(whatBox, x, y) {  // Resize all images from small to larger or larger to smaller and centers the image into place of container.

    var boxWidth = ($(whatBox).width()); //650 this gets the box size excluding border/margins/padding
    var boxHeight = ($(whatBox).height()); // 450
    var XbY = (y / x); // gives the ratio for when x is bigger than y
    var YbX = (x / y); // gives the ratio for when y is bigger than x
    var ratioChange;

    if (x > y) {  // circumstance of the sized
        ratioChange = boxWidth * XbY; // creates the changed size value based on ratio of difference
        if (ratioChange > boxHeight) {
            ratioChange = boxHeight;
            var adjustSize = ratioChange / XbY;
            offSetValue = ((boxWidth - adjustSize) / 2);
            return `style="width: ${adjustSize}; height:${ratioChange}px; position:relative; left:${offSetValue}px;"`
        }
        else {
            offSetValue = ((boxHeight - ratioChange) / 2); // creates the offset value for centering the image
            return `style="width: ${boxWidth}; height:${ratioChange}px; position:relative; top:${offSetValue}px;"`
        }
    }
    else if (y > x) {
        ratioChange = boxHeight * YbX;
        if (ratioChange > boxWidth) {
            ratioChange = boxWidth;
            var adjustSize = ratioChange / YbX;
            offSetValue = ((boxHeight - adjustSize) / 2); // creates the offset value for centering the image
            return `style="width: ${ratioChange}px; height: ${adjustSize}; position:relative; top:${offSetValue}px;"`
        }
        else {
            offSetValue = ((boxWidth - ratioChange) / 2);
            return `style="width: ${ratioChange}px; height: ${boxHeight}; position:relative; left:${offSetValue}px;"`
        }
    }
    else if (x == y) {
        offSetValue = ((boxWidth - boxHeight) / 2);
        return `style="width: ${boxHeight}px; height: ${boxHeight}px; position:relative; left:${offSetValue}px;"`
    }
    else {
        return
    }
}

function makeHistPlace(x) {  // Creates div image container for history images

    return `
    <div class="catHistImgBorder hist${x}">
        
    </div>
    `
}

function placeHistImg(x) {  // Creates the images with overlay for history buttons
    return `
    <div class="imgArea" ${resizer(".catHistImgBorder", x[1], x[2])}>
        <img class="catHistImg" src="${x[0]}" alt="Cat_Historical_Image"/>
        <div class="overlay" data-name="${x[0]}"></div>
    </div>
`
}

//////////////////////////^////////////////////////////////