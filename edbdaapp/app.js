
console.log("Welcome to Program exeuction");
var name="Transflower";
var person={
            "id":345,
            "firstname":"Shubham",
            "lastname":"Navale",
            "location":"Mumbai"
}


console.log(person);
console.log("----------------------------");
var show=function(){
    var count=76;
    count++;
    if(count > 100){
        console.log("Value is greater than 100");
    }
    else
    {
        console.log("Value is less than 100");
    }
}


//invoke function
show();
