const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signinbtn = document.getElementById('signinbtn');
const signupbtn = document.getElementById('signupbtn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



