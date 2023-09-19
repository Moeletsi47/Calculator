const deleteScreenVal = document.getElementById('delete');
const screenVal =document.getElementsByClassName('screen');
const screenColor = document.getElementsByClassName('screenColor');
const allButtons = document.getElementsByClassName("row-1");
let jay ;
let dino = document.getElementById("dino");
let sine = document.getElementById('sine');
let result = document.getElementById('result')
let answer;
let i , j;
let funcIndex;
let rightBrace;
let Angle;
let funcVar;
let funcResult;
let userInput;
let expIndex , base, exponent, charaterIndex, strArray, multipiler;
let func = ["sin","cos","tan","pow","log"];
let x , y; // numbers for pow function
let comm ; //index of comma
let entity = document.getElementsByClassName('symbol');
let pie = entity.pie.value;
let state = true;


screenColor.mode.style.borderRadius ="10px";
screenColor.mode.style.backgroundColor ="rgb(161, 235, 161)";
//deleting one charater on the screen 
  deleteScreenVal.addEventListener('click', function(){
  screenVal.onScreen.value =  screenVal.onScreen.value.slice(0,-1);
})
//changing modes
    screenColor.mode.addEventListener('click', function(){
    state = !state;
    screenVal.onScreen.style.backgroundColor =  state? "rgb(161, 235, 161)" : "black";
    jay = "undefined";
     //if the state is false the calculator is off
    if(state === false){
      screenVal.onScreen.value = "";
      }else{
        
        }
  })
  //calculations only when the eqaul button is clicked
  result.addEventListener('click', function(){

    userInput = screenVal.onScreen.value; // user input
    // replacing pie symbol with it's value
    
    userInput = userInput.replaceAll(pie, `${Math.PI.toFixed(3)}`);

    // replacing "Ans" with the previous answer

    userInput = userInput.replaceAll("Ans", `${jay}`);
  
    //searching for sine, cose , tan and pow functions
    for(i=0; i<func.length; i++){
        
       do{
        funcIndex = userInput.search(func[i]);
        console.log(funcIndex);
    // if sin || cos || tan || pow is part of the input
        if(funcIndex !=-1){
              rightBrace = userInput.indexOf(")",funcIndex);
              Angle = userInput.substring(funcIndex+4, rightBrace); //getting the angele insie the ()
              funcVar =  userInput.substring(funcIndex, rightBrace+1); 

              if(func[i] === "sin"){
                funcResult =  Math.sin(Angle*Math.PI/180);
                  }else if(func[i] === "cos"){
                    funcResult =  Math.cos(Angle*Math.PI/180);
                      }else if(func[i] === "tan"){
                        funcResult =  Math.tan(Angle*Math.PI/180);
                         }else if(func[i] === "pow"){
                           comm = Angle.indexOf(',');
                           x = Angle.substring(0, comm);
                           y = Angle.substring(comm+1);
                           x = parseInt(x);
                           y = parseInt(y);
                           funcResult =  Math.pow(x, y);
                            }else if(func[i] == "log"){
                               funcResult =  Math.log(Angle);
                             }
            
              funcResult = funcResult.toFixed(3);
              userInput = userInput.replace(funcVar, funcResult);
          }//end of if statement
        }while(funcIndex !=-1);
    }//end of for loop
   
    //searching for power ^   and doing the calculations if it exists
    expIndex = userInput.indexOf("^");
    if(expIndex != -1){
        base = userInput.substring(0, expIndex);
        exponent = userInput.substring(expIndex+1);
        userInput = base;
        if(exponent == 0){
            userInput = 1;
             }else if(exponent == 1){

               }else if(exponent>1){
                 multipiler = userInput;
                 for(let e=1; e<exponent; e++){
                 userInput *= multipiler;
                   }
                     }
     }

      answer = eval(userInput);
      jay = answer;
      screenVal.onScreen.value = answer;  
})

  dino.onclick = function(){
  screenVal.onScreen.value += "Ans";
}

function removeAnswer() {
  screenVal.onScreen.classList.remove("answer");
} 

 