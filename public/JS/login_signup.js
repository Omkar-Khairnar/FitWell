const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn'); 
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active"); 
});

function Validation1(){
	var email=document.forms.regform.email.value;
	var password=document.forms.regform.password.value;
	var age=document.forms.regform.age.value;

	var regEmail= new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
	var regPass=new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

	if(!email.match(regEmail)){ 
		document.getElementsByClassName('regemailver')[0].style.display="block"
		// return false;
	}
	else{
		document.getElementsByClassName('regemailver')[0].style.display="none"
	}
	if(!password.match(regPass)){
		document.getElementsByClassName('regpassver')[0].style.display="block"
		// return false;
	}
	else{
		console.log(document.getElementsByClassName('regpassver')[0].style);
		document.getElementsByClassName('regpassver')[0].style.display="none"
	}
	if(age<15){
		document.getElementsByClassName('regagever')[0].style.display="block"
		// return false;
	}
	else{
		document.getElementsByClassName('regagever')[0].style.display="none"
	}

	// return true;
}

function Validation2(){
	var email=document.forms.logform.email.value;
	var regEmail= new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);
	if(!email.match(regEmail)){ 
		document.getElementsByClassName('logemailver')[0].style.display="block"
	}
	else{
		document.getElementsByClassName('logemailver')[0].style.display="none"
	}
}