window.onload = function () {
    getAllUsers();
    document.getElementById("form").onsubmit = validateForm;
}
const employeeIds = [""];

function getAllUsers(){
    let uri = "https://reqres.in/api/users/"
    let params = {
        method: "get",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(uri, params)
        .then(function (response){
            console.log(response);
            return response.json();
        })
        .then(getLocations);
}

function getLocations(json) {
    console.log(json);
    let data = json.data;
    // console.log(data.length);
    let select = document.getElementById("locations");
    for (let i = 0; i < data.length; i++) {
        let para = document.createElement("option");
        para.innerText = data[i].email;
        select.appendChild(para);
        //para.setAttribute("id", para.innerText);
        //console.log(para.innerText);
        employeeIds[i] = data[i].id;
    }
}

function validateForm(){
    // create flag
    let isValid = true;
    // validation display
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++){
        errors[i].style.display = "none";
    }
    // Grab user values
    let first = document.getElementById("fName").value;
    let last = document.getElementById("lName").value;
    let email = document.getElementById("email").value;
    let employeeNum = document.getElementById("empNum").value;
    let employeeId = document.getElementById("empNum").value;
    let pass = document.getElementById("password").value;
    let hired = document.getElementById("hired").value;
    let wage = document.getElementById("wage").value;
    let phone = document.getElementById("phone").value;
    let ssn = document.getElementById("ssn").value;
    let option = document.getElementById("locations").value;
    //console.log(option);

    //initiate checks
    for (let i = 0; i < employeeIds.length; i++){
        if(parseInt(employeeId) === parseInt(employeeIds[i])) {
            console.log("Duplicate submission");
            let errNumMatch = document.getElementById("errNumMatch");
            errNumMatch.style.display = "inline";
            alert("This Emp Id already exists, please submit a rehire instead.");
            isValid = false;
        }
    }
    if(first === ""){
        let errFirst = document.getElementById("errFirst");
        errFirst.style.display = "inline";
        isValid = false;
    }
    if(last === ""){
        let errLast = document.getElementById("errLast");
        errLast.style.display = "inline";
        isValid = false;
    }
    if(email === ""){
        let errEmail = document.getElementById("errEmail");
        errEmail.style.display = "inline";
        isValid = false;
    }
    if(employeeNum === "" || employeeNum <= 0){
        let errEmpNum = document.getElementById("errEmpNum");
        errEmpNum.style.display = "inline";
        alert("Please enter a valid Employee number.");
        isValid = false;
    }
    if(pass === ""){
        let errPass = document.getElementById("errPass");
        errPass.style.display = "inline";
        isValid = false;
    }
    if(hired === ""){
        let errHired = document.getElementById("errHired");
        errHired.style.display = "inline";
        isValid = false;
    }
    if(wage === ""){
        let errWage = document.getElementById("errWage");
        errWage.style.display = "inline";
        isValid = false;
    }
    if(phone === ""){
        let errPhone = document.getElementById("errPhone");
        errPhone.style.display = "inline";
        isValid = false;
    }
    if(ssn === ""){
        let errSsn = document.getElementById("errSsn");
        errSsn.style.display = "inline";
        isValid = false;
    }
    if(option === ""){
        let errLocation = document.getElementById("errLocation");
        errLocation.style.display = "inline";
        isValid = false;
    }

    // CREATE if validation passes
    if(isValid){
        let uri = "https://reqres.in/api/users/"
        let params = {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    name: first,
                    job: email
                }
            })
        }
        fetch(uri, params)
            .then(function (response){
                console.log(response);
                console.log("Successful submission.");
                return response.json();
            })
    }
    else{
        console.log("Didn't submit");
        return isValid;
    }
}


/**
function getUserById(){
    let text = document.getElementById("id").value;
    if(text !== "") {
        let user = 'https://reqres.in/api/users/' + text;
        fetch(user, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        })
            .then(res => {
                if(res.ok){
                    console.log("This employee exists.");
                    return res.json();
                } else{
                    console.log("This employee DOES NOT exist.");
                }
            })
            .then(data => console.log("Employee Name: " + data.data.first_name + " " + data.data.last_name))
    } else{
        // this shows up if nothing was entered in the search field
        console.log("You need to enter a valid Employee Number!");
    }
}

 function validateEmpId() {
    console.log(employeeIds);
    let employeeId = document.getElementById("empNum").value;
    console.log(employeeId);
    let flag;
    for (let i = 0; i < employeeIds.length; i++){
        if(parseInt(employeeId) === parseInt(employeeIds[i])) {
            flag = true;
            console.log("Duplicate submission");
        }
    }
    if (flag){
        alert("Please submit a New Employee with a new ID.");
    } else {
        //ToDo: Here is where all info will go to add a new employee to API - jsonStringify
        console.log("Do nothing");
    }
}

 */