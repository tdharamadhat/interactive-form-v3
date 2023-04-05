const username = document.querySelector('#name');   //name
const otherJobrole = document.querySelector('#other-job-role');
const jobRoleOptions = document.querySelector('#title');
const designSelectElement = document.querySelector('#design');
const colorElements = document.querySelector('#color');
const registerActivitys = document.querySelector('#activities');   //register for activities
const divActivities = document.querySelector('#activities-box');
//const checkboxs = document.querySelectorAll('.activities input');  
const checkBoxs = document.querySelectorAll('input[type=checkbox]'); //checkbox activities
const totalPost = document.querySelector('#activities-cost');

const paymentElements = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitCoin = document.querySelector('#bitcoin');
let total = 0; 
let actTotal = 0;  // number of Register activity

const form = document.querySelector('form'); 
const email = document.querySelector('#email');   //email
const cardNo = document.querySelector('#cc-num');   //Card number
const zipCode = document.querySelector('#zip');   //Zip code
const cvv = document.querySelector('#cvv');   //CVV

//console.log(form);

//Program load
username.focus();
otherJobrole.style.display = 'none' ;

//Select role
jobRoleOptions.addEventListener('change', e =>{

    const selectedValue = e.target.value ;
    if (selectedValue === 'other') {
        otherJobrole.style.display = 'block' ;       
    } else {
        otherJobrole.style.display = 'none'
    }
})

//Select design and color
//console.log(colorElements[1].dataset.theme);
colorElements.disabled = true;

designSelectElement.addEventListener('change', e => {
    colorElements.disabled = false;
    for (const color of colorElements.children)
    {
        const colorElement  =  color;
        const colorTheme = color.getAttribute('data-theme')  ;
        const desingValue = e.target.value;
       // console.log(colorTheme+':'+desingValue);
        if (colorTheme === desingValue){
            color.setAttribute('selected',true);
            color.removeAttribute('hidden');
            // color.hidden = false;
            // color.selected = true;

        } else {
            // color.hidden = true;
            // color.selected = false;
            color.setAttribute('hidden',true);
            color.removeAttribute('selected');
        }
    }
});

// Compute Register activities cost
registerActivitys.addEventListener('change', e =>{
    const clicked = e.target;
    const dataCost = +clicked.getAttribute('data-cost');   //convert to integer
    const activityTime =  clicked.getAttribute('data-day-and-time'); //get activity time
    //console.log(dataCost);
    //console.log(typeof(dataCost));
    if (clicked.checked){
        total += dataCost;
        actTotal++ ;
        for(const activity of checkBoxs){
            //console.log(activity.getAttribute('data-day-and-time'));
            if (activity.getAttribute('data-day-and-time')===activityTime && clicked !== activity){
                console.log("true");
                activity.disabled = true;
                activity.parentElement.classList.add("disabled");
            }
        }

    } else {
        total -= dataCost;
        actTotal--;
        for(const activity of checkBoxs){
            if (activity.getAttribute('data-day-and-time')===activityTime){
                activity.disabled = false;
                activity.parentElement.classList.remove("disabled");
            }

        }
    }
    //console.log(total);
    totalPost.innerHTML = `Total: $${total}`;

});

// Payment Info section
paypal.setAttribute('hidden',true);
bitCoin.setAttribute('hidden',true);
payment.children[1].setAttribute('selected',true);
paymentElements.addEventListener('change', e => {
    const payment = e.target;
    const value = payment.value;
    if (value === "credit-card"){
        creditCard.removeAttribute('hidden');
        paypal.setAttribute('hidden',true);
        bitCoin.setAttribute('hidden',true);
    } else if(value === "paypal"){
        paypal.removeAttribute('hidden');
        creditCard.setAttribute('hidden',true);
        bitCoin.setAttribute('hidden',true);      

    } else if(value === "bitcoin"){
        bitCoin.removeAttribute('hidden');
        paypal.setAttribute('hidden',true);
        creditCard.setAttribute('hidden',true);
    }    

});

// Validation
const nameValidate = () => {
    const nameValue = username.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    //console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);
    if (nameIsValid){
        validationPass(username);
    } else {
        validationFail(username);
        document.getElementById('name-hint').style.display = 'block';
    }

    return nameIsValid;

}

const emailValidate = () => {

    const emailValue = email.value ;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    //console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`); 
    if (emailIsValid){
        validationPass(email);
    } else {
        validationFail(email);
        document.getElementById('email-hint').style.display = 'block';
    }
    return emailIsValid ;  
  }

const activityValidate = () => {
    const activitySectionIsValid = actTotal > 0;
    //console.log(`Number of activities="${actTotal} evaluates to ${activitySectionIsValid}`);   
    if (activitySectionIsValid){
        validationPass(divActivities);
    } else {
        validationFail(divActivities);
        document.getElementById('activities-hint').style.display = 'block';
    }
    return activitySectionIsValid;

}

const creditCardValidate = () =>{
    const cardNoValue = cardNo.value;
    const cardNoIsValid = /^\d{13,16}$/.test(cardNoValue);
    //console.log(`Card number="${cardNoValue} evaluates to ${cardNoIsValid}`);
    if (cardNoIsValid){
        validationPass(cardNo);
    } else {
        validationFail(cardNo);
        document.getElementById('cc-hint').style.display = 'block';
    }
    return cardNoIsValid;
}

const zipCodeValidate = () =>{
    const zipValue = zipCode.value;
    const zipCodeIsValid = /^\d{5}$/.test(zipValue);
    //console.log(`Zipcode number="${zipValue} evaluates to ${zipCodeIsValid}`);
    if (zipCodeIsValid){
        validationPass(zipCode);
    } else {
        validationFail(zipCode);
        document.getElementById('zip-hint').style.display = 'block';       
    }
    return zipCodeIsValid;
}

const cvvValidate = () =>{
    const cvvValue = cvv.value;
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    if (cvvIsValid){
        validationPass(cvv);
    } else {
        validationFail(cvv);
        document.getElementById('cvv-hint').style.display = 'block';    
    }
    //console.log(`cvv number="${cvvValue} evaluates to ${cvvIsValid}`);
    return cvvIsValid;
}

//Accessibility
function validationPass(element) {
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
    
  }

function validationFail(element) {
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.removeAttribute('style');
}



for (let checkBox of checkBoxs) {
    checkBox.addEventListener("focus", e => {
        e.target.parentElement.classList.add("focus");
     });
     checkBox.addEventListener("blur", e => {
        e.target.parentElement.classList.remove("focus");
     });    

}

// real-time validation
form.addEventListener('change',e => {
    nameValidate();
    emailValidate();
    activityValidate();
    creditCardValidate();
    zipCodeValidate();
    cvvValidate();
    
  });



form.addEventListener("submit", e => {

    const paymentType = paymentElements.value;
    //console.log("Payment:"+paymentType);
    //e.preventDefault();
    if (paymentType ==='credit-card'){
    
        if(!nameValidate()){
            e.preventDefault();  //prevent form reload
        }
        if(!emailValidate()){
            e.preventDefault();  //prevent form reload
        }
        if(!activityValidate()){
            e.preventDefault();  //prevent form reload
        }
        if (!creditCardValidate()){
            e.preventDefault();  //prevent form reload
        }
        if (!zipCodeValidate()){
            e.preventDefault();  //prevent form reload           
        }
        if(!zipCodeValidate()){
            e.preventDefault();  //prevent form reload          
        }
        if(!cvvValidate()){
            e.preventDefault();  //prevent form reload
        }

    } else {
        if(!nameValidate()){
            e.preventDefault();  //prevent form reload  
        }
        if(!emailValidate()){
            e.preventDefault();  //prevent form reload  
        }
        if(!activityValidate()){
            e.preventDefault();  //prevent form reload        
        }

    }

});










