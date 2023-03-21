const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn'); 
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function Validation(){
	var email=document.forms.regform.email.value;
	var password=document.forms.regform.password.value;
	var age=document.forms.regform.age.value;

	var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
	var regPass="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";

	if(email ="" || regEmail.test(email)){
		document.getElementsByClassName('regemailver').style.display="block"
		email.focus();
		return false;
	}
	if(password="" || regPass.test(password)){
		document.getElementsByClassName('regpassver').style.display="block"
		password.focus();
		return false;
	}
	if(age<10){
		document.getElementsByClassName('regagever').style.display="block"
		age.focus();
		return false;
	}

	return true;
}