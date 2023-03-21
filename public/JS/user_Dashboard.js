const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});




// BMI calculator

const weightInput = document.getElementById('bmi-weight').innerText;
const heightInput = document.getElementById('bmi-height').innerText;
const resultDiv = document.getElementById('bmi-value');
const commentdiv = document.getElementsByClassName('bmi-comment');

function calculateBMI() {

  const weight = parseFloat(weightInput);
  const height = parseFloat(heightInput) / 100; // convert to meters

  const bmi = (weight / (height * height));
  let comment;
  if(bmi < 18.5){
    comment = "Under Weight";
  }else if(bmi < 25){
    comment= "Noraml weight";

  }else if(bmi < 30){
    comment = "Overweight";
  }else{
    comment = "Obesity";
  }


  resultDiv.innerHTML = `${bmi.toFixed(2)}`;
  commentdiv.innerHTML = comment;
}






//Put a Review

const form = document.getElementById('review-form');
const nameInput = document.getElementById('name');
const ratingInput = document.getElementById('rating');
const commentInput = document.getElementById('comment');
const errorText = document.getElementsByClassName("error").innerText;


form.addEventListener('submit', e => {

    const error = document.createElement('p');
    error.className = 'error';
    
    if (ratingInput.value === '' || commentInput.value === '') {
        if(error.innerText!=""){
            error.innerText.reset();
        }
        error.innerText = 'Please fill out all fields.';
        form.appendChild(error);
        return;
    }
    else {
        if(error.innerText!=""){
            error.innerText.reset();
        }
        error.innerText = 'Review Submitted successfully.';
        error.style.color = "green";
        form.appendChild(error);
        return;
    }

    form.reset();
});
