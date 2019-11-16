var queryURL = "https://api.thecatapi.com/v1/images/search";
var arrayImgDiv = ["img1","img2"];

arrayImgDiv.forEach(function(iter){
    $(".imgPlace").append(makeImgPlace(iter));
})

$("#cat-button").on("click", function(event) {
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (catInfo) {
    var imageURL = catInfo[0].url;
    var imageHeight = catInfo[0].height;
    var imageWidth = catInfo[0].width;


    $(".img1").html(placeImg(imageURL,".img1",imageWidth,imageHeight));


    getQRCodeImage(imageURL);

});
});

function getQRCodeImage(URL) {
    var QRCodeQueryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + URL;
    $.ajax({
    url: QRCodeQueryURL,
    method: "GET"
}).then(function () {
    $(".img2").html(placeImg(QRCodeQueryURL,".img2"));
});
}


function makeImgPlace(iter){
    return `
    <div class="home col ${iter}">
        
    </div>
    `
}

function placeImg(i,tag,x,y){
    return `<img src="${i}" ${resizer(tag,x,y)}";/>`
}


function resizer(whatBox,x,y){
          
    var boxWidth = ($(whatBox).width()); //650 this gets the box size excluding border/margins/padding
    var boxHeight = ($(whatBox).height()); // 450
    var XbY = (y / x); // gives the ratio for when x is bigger than y
    var YbX = (x / y); // gives the ratio for when y is bigger than x
    var ratioChange;
    
    if (x > y){  // circumstance of the sized
        ratioChange = boxWidth*XbY; // creates the changed size value based on ratio of difference
        if (ratioChange > boxHeight){
            ratioChange = boxHeight;
            var adjustSize = ratioChange/XbY;
            offSetValue = ((boxWidth - adjustSize)/2);
            return `style="width: ${adjustSize}; height:${ratioChange}px; position:relative; left:${offSetValue}px`
        }
        else{
            offSetValue = ((boxHeight - ratioChange)/2); // creates the offset value for centering the image
            return `style="width: ${boxWidth}; height:${ratioChange}px; position:relative; top:${offSetValue}px`
        }
    }
    else if (y > x){
        ratioChange = boxHeight*YbX;
        if (ratioChange > boxWidth){
            ratioChange = boxWidth;
            var adjustSize = ratioChange/YbX;
            offSetValue = ((boxHeight - adjustSize)/2); // creates the offset value for centering the image
            return `style="width: ${ratioChange}px; height: ${adjustSize}; position:relative; top:${offSetValue}px`
        }
        else {
            offSetValue = ((boxWidth - ratioChange)/2);
            return `style="width: ${ratioChange}px; height: ${boxHeight}; position:relative; left:${offSetValue}px`
        }
    }
    else if (x == y){
        offSetValue = ((boxWidth - boxHeight)/2);
        return `style="width: ${boxHeight}px; height: ${boxHeight}px; position:relative; left:${offSetValue}px`
    }
    else {
        return
    }
  }



  

