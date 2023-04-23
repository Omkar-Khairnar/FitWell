var latestProduct = document.querySelector("#latestPro");
var left1 = document.querySelector("#arrowLeft1");
var right1 = document.querySelector("#arrowRight1");
document.addEventListener("DOMContentLoaded", scrollProduct(latestProduct, left1, right1));


var wheyProducts = document.querySelector("#wheyPro");
var left2 = document.querySelector("#arrowLeft2");
var right2 = document.querySelector("#arrowRight2");
document.addEventListener("DOMContentLoaded", scrollProduct(wheyProducts, left2, right2));


var vitaminProducts = document.querySelector("#vitaminPro");
var left3 = document.querySelector("#arrowLeft3");
var right3 = document.querySelector("#arrowRight3");
document.addEventListener("DOMContentLoaded", scrollProduct(vitaminProducts, left3, right3));


var energyProducts = document.querySelector("#energyPro");
var left4 = document.querySelector("#arrowLeft4");
var right4 = document.querySelector("#arrowRight4");
document.addEventListener("DOMContentLoaded", scrollProduct(energyProducts, left4, right4));


var repairProducts = document.querySelector("#repairPro");
var left5 = document.querySelector("#arrowLeft5");
var right5 = document.querySelector("#arrowRight5");
document.addEventListener("DOMContentLoaded", scrollProduct(repairProducts, left5, right5));





function scrollProduct (cards, left, right) {
    var cardWidth = parseInt(window.getComputedStyle(document.querySelector(".card")).getPropertyValue("width"));
    var cardMargin = parseInt(window.getComputedStyle(document.querySelector(".card")).getPropertyValue("margin-right"));
    var cardsWidth = (cards.querySelectorAll(".card").length * (cardWidth + cardMargin))- cardMargin;
    var position = 0;

    right.addEventListener("click", function () {
        if (position > -cardsWidth ) {
            position -= cardWidth*4 ;
            cards.style.transform = "translateX(" + position + "px)";
        }
    });

    left.addEventListener("click", function () {
        if (position < 0) {
            position += cardWidth*4 ;
            cards.style.transform = "translateX(" + position + "px)";
        }
    });
}



// function scrollProduct(cards, left, right) {
//     var cardWidth = parseInt(window.getComputedStyle(document.querySelector(".card")).getPropertyValue("width"));
//     var cardMargin = parseInt(window.getComputedStyle(document.querySelector(".card")).getPropertyValue("margin-right"));
//     var cardsWidth = (cards.querySelectorAll(".card").length * (cardWidth + cardMargin)) - cardMargin;
//     var position = 0;
  
//     // Check if a modal button was clicked
//     function isModalButtonClicked(target) {
//       var isButton = target.nodeName === "BUTTON";
//       var isModal = target.closest(".modal");
//       return isButton && !isModal;
//     }
  
//     right.addEventListener("click", function(e) {
//       // Ignore click event if it occurred on a modal button
//       if (isModalButtonClicked(e.target)) return;
      
//       if (position > -cardsWidth) {
//         position -= cardWidth;
//         cards.style.transform = "translateX(" + position + "px)";
//       }
//     });
  
//     left.addEventListener("click", function(e) {
//       // Ignore click event if it occurred on a modal button
//       if (isModalButtonClicked(e.target)) return;
  
//       if (position < 0) {
//         position += cardWidth;
//         cards.style.transform = "translateX(" + position + "px)";
//       }
//     });
//   }
  



















// // function sideScroll(element,direction,speed,distance,step){
// //     scrollAmount = 0;
// //     var slideTimer = setInterval(function(){
// //         if(direction == 'left'){
// //             element.scrollLeft -= step;
// //         } else {
// //             element.scrollLeft += step;
// //         }
// //         scrollAmount += step;
// //         if(scrollAmount >= distance){
// //             window.clearInterval(slideTimer);
// //         }
// //     }, speed);
// // }


// // var next = document.getElementById('right');
// // next.addEventListener("click",function () {
// //     var container = document.getElementById('allProduct');
// //     sideScroll(container,'right',25,100,10);
// // });

// // var back = document.getElementById('left');
// // back.addEventListener("click",function () {
// //     var container = document.getElementById('allProduct');
// //     sideScroll(container,'left',25,100,10);
// // }); 
