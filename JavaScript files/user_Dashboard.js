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






const form = document.getElementById('review-form');
const nameInput = document.getElementById('name');
const ratingInput = document.getElementById('rating');
const commentInput = document.getElementById('comment');
const errorText = document.getElementsByClassName("error").innerText;


form.addEventListener('submit', e => {
    // e.preventDefault();
    
    // Validate inputs
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

    // Submit review
    // (Add your submission code here)

    // Clear form
    form.reset();
});
