var queryURL = "https://api.thecatapi.com/v1/images/search";

$("#cat-button").on("click", function(event) {
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (catInfo) {
    var imageURL = catInfo[0].url;
    var imageHeight = catInfo[0].height;
    var imageWidth = catInfo[0].width;

    $(".imgPlace").html(makeImgPlace(imageURL,imageWidth,imageHeight));

    getQRCodeImage(imageURL);

});
});


function getQRCodeImage(URL) {
    var QRCodeQueryURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + URL;
    $.ajax({
    url: QRCodeQueryURL,
    method: "GET"
}).then(function (QRURL) {
    $("#qr-image").attr("src", QRCodeQueryURL);


});
}

        function makeImgPlace(i,x,y){
            console.log(i);
            
          return `
            <div class="placement">
              <img src="${i}"${resizer(".home",x,y)}/>
            </div>
          `
        }

        function resizer(whatBox,x,y){
          
          var boxWidth = ($(whatBox).width()); //650 this gets the box size excluding border/margins/padding
          var boxHeight = ($(whatBox).height()); // 450
          var XbY = (y / x); // gives the ratio for when x is bigger than y
          var YbX = (x / y); // gives the ratio for when y is bigger than x
          var ratioChange;
            if (x > y){  // circumstance of the sized
              ratioChange = boxWidth*XbY; // creates the changed size value based on ratio of difference
              offSetValue = ((boxWidth - ratioChange)); // creates the offset value for centering the image
              return `style="width: ${boxWidth}; height:${ratioChange}px; position:relative; top:${offSetValue}px"`
            }
            else if (y > x){
              ratioChange = boxHeight*YbX;
              offSetValue = ((boxHeight - ratioChange));
              return `style="width: ${ratioChange}px; height: ${boxHeight}; position:relative; left:${offSetValue}px"`
            }
            else if (x == y){
              return `style="width: ${boxHeight}; height: ${boxHeight};"`
            }
          else {
            return
          }

        }