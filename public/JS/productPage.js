// 
document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelector(".allProduct");
    // var cards = document.querySelector(".allProduct", ".allProduct1", ".allProduct2", ".allProduct3", ".allProduct4");
    var cardWidth = parseInt(window.getComputedStyle(document.querySelector(".card")).getPropertyValue("width"));
    var cardMargin = parseInt(window.getComputedStyle(document.querySelector(".card")).getPropertyValue("margin-right"));
    var cardsWidth = (cards.querySelectorAll(".card").length * (cardWidth + cardMargin)) -  cardMargin  ;
    var position = 0;

    var left = document.querySelector(".arrow-right");
    left.addEventListener("click", function () {
        if (position > -cardsWidth ) {
            position -= cardWidth*3 ;
            cards.style.transform = "translateX(" + position + "px)";
        }
    });

    document.querySelector(".arrow-left").addEventListener("click", function () {
        if (position < 0) {
            position += cardWidth*3 ;
            cards.style.transform = "translateX(" + position + "px)";
        }
    });
});















// function sideScroll(element,direction,speed,distance,step){
//     scrollAmount = 0;
//     var slideTimer = setInterval(function(){
//         if(direction == 'left'){
//             element.scrollLeft -= step;
//         } else {
//             element.scrollLeft += step;
//         }
//         scrollAmount += step;
//         if(scrollAmount >= distance){
//             window.clearInterval(slideTimer);
//         }
//     }, speed);
// }


// var next = document.getElementById('right');
// next.addEventListener("click",function () {
//     var container = document.getElementById('allProduct');
//     sideScroll(container,'right',25,100,10);
// });

// var back = document.getElementById('left');
// back.addEventListener("click",function () {
//     var container = document.getElementById('allProduct');
//     sideScroll(container,'left',25,100,10);
// }); 
