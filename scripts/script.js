const DEL = document.getElementById('delete');
const DISPLAY = document.getElementsByClassName('screen');
const MODE = document.getElementById('mode');
const CALC = document.getElementById('result');
const ALLBUTTONS = document.getElementsByClassName("row");
const BCL = ALLBUTTONS.length; //button collection length
const ENTITY = document.getElementsByClassName('symbol');
const pie = ENTITY.pie.value;// pie symbol
const clickSound = new Audio('./sounds/click.mp3');
let isMuted = false;
let MUTE = document.getElementById('mute');

let prevAnswer;
let answer;
let funcToSearch;
let funcStartIndex;
let funcEndIndex;
let Angle;
let extractedFunc;
let funcOutput;
let userInput;
let expIndex , base, exponent, charaterIndex, strArray, multipiler;
let funcs = ["sin","cos","tan","pow","log"];
let x , y; // variables for pow function
let comma ; //index of comma
let state = true; // mode state
let regx;
let radians = false;
let degrees = true;

//setting event liteners for all buttons
for(let i = 0; i < BCL; i++){

   let div = ALLBUTTONS[i];
   const ROB = div.children; //row of buttons

  for(let j = 0; j < ROB.length; j++){
    if(ROB[j].className !== "special"){
      ROB[j].addEventListener('click', () =>{
        if(state){
        DISPLAY.screen.value += ROB[j].value;
        }
        // clickSound.play();
      })
    }
    ROB[j].addEventListener('click', () =>{
      clickSound.pause();
      clickSound.currentTime = 0; 
      clickSound.play();
    })
  }
}
//mute sound
function toggleMute() {
  if (isMuted) {
    // Unmute the audio
    clickSound.volume = 1;
  } else {
    // Mute the audio
    clickSound.volume = 0;
  }

  // Toggle the mute state
  isMuted = !isMuted;
}
//call mute on click
MUTE.addEventListener('click', () => {
  toggleMute();
 
})

//deleting one charater on the screen 
  DEL.addEventListener('click', function(){
  DISPLAY.screen.value =  DISPLAY.screen.value.slice(0,-1);
})

//changing modes
  MODE.addEventListener('click', function(){
    state = !state;
    DISPLAY.screen.style.backgroundColor =  state? "rgb(161, 235, 161)" : "black";
    prevAnswer = "undefined";
     //if the state is false the calculator is off
    if(state === false){
      DISPLAY.screen.value = "";
      }
      
})

//get userInput
function getUserInput(){
   userInput = DISPLAY.screen.value;
}
//replacing symbols with thier corresponding values values
function replace(){
   // replacing pie symbol with it's value
   userInput = userInput.replaceAll(pie, `${Math.PI.toFixed(3)}`);

   // replacing "Ans" with the previous answer
   userInput = userInput.replaceAll("Ans", `${prevAnswer}`);
}
/*search if a specific funtion exits in the userInput if it exists return the index of its first character
  if it does not exist return -1 
  */
function searchFunction(functionName){
      return userInput.search(functionName);
}
// finds the function with the parameters as iserted by the user
function extractTheFunction(funcStartIndex){
  funcEndIndex = userInput.indexOf(")",funcStartIndex);
  extractedFunc =  userInput.substring(funcStartIndex, funcEndIndex+1); 
  Angle = userInput.substring(funcStartIndex+4, funcEndIndex); 

}
function sin(angle) {
  funcOutput =  Math.sin(angle*Math.PI/180);
}
function cos(angle) {
  funcOutput =  Math.cos(angle*Math.PI/180);
}
function tan(angle) {
  if(angle == 90){
    DISPLAY.screen.value= "undefined";
    return; // stop the calculations
  }else{
    funcOutput =  Math.tan(angle*Math.PI/180);                            
  }
}
function pow(angle) {
  comma = angle.indexOf(',');
  x = angle.substring(0, comma);
  y = angle.substring(comma+1);
  x = parseInt(x);
  y = parseInt(y);
  funcOutput =  Math.pow(x, y);
}
function log(angle) {
  funcOutput =  Math.log(angle);
}
  const FUNCARR = [sin, cos, tan, pow, log];
//find the output of the extracted function
function extractedFunctionOutput(){
   funcs.map((func, i) =>{
     regx = RegExp(func);
     if(regx.test(extractedFunc)){
         i !== 3 ? Angle = eval(Angle) : Angle ;
         FUNCARR[i](Angle);
     }
   })
}
  //calculations only when the eqaul button is clicked
    CALC.addEventListener('click', function(){
      
      //get userInput
      getUserInput();

      //replacing symbols with thier corresponding values values
      replace();

      //searching for sine, cose , tan and pow functions
      for(i=0; i<funcs.length; i++){
          funcToSearch = funcs[i];
        do{
            funcStartIndex = searchFunction(funcToSearch)
              // if sin || cos || tan || pow is part of the input
              if(funcStartIndex !=-1){
                extractTheFunction(funcStartIndex);
               
                extractedFunctionOutput();
                //convert the function output to 3 decimal places
               try{
                funcOutput = funcOutput.toFixed(6);
               }catch(error){
                DISPLAY.screen.value = "undefined";  
                return;
               }
              
                //replace the userInput func with funcOutput
                userInput = userInput.replace(extractedFunc, funcOutput);
               
            }//end of if statement
            
          }while(funcStartIndex !=-1);
      }//end of for loop
      //let tempUserInput = `${userInput}`
   
    //searching for exponent ^  and doing the calculations if it exists
   // do{
    //  expIndex = userInput.indexOf("^");
    //  let endIndexOfExp = userInput.substring(expIndex).search(/[+\-*/]/);
    //  let tempString = userInput.substring(0,expIndex+1);
    //  tempString = tempString.split('').reverse().join('');
    //  let startIndexOfBase = tempString.search(/[+\-*/]/);
     
    //   if(expIndex != -1){
    //     base = userInput.substring(expIndex-startIndexOfBase+1,expIndex);
    //     if(endIndexOfExp>0){
    //       exponent = userInput.substring(expIndex+1,endIndexOfExp+expIndex);
    //     }else{
    //       exponent = userInput.substring(expIndex+1);
    //     }
    //    let exponentOutput;
    //    let exponentInput  = `${base}\^${exponent}`;
    //    console.log(base, exponent, startIndexOfBase)
    //     if(exponent == 0){
    //         exponentOutput = 1;
    //     }else if(exponent == 1){
    //       exponentOutput = base;    
    //     }else if(exponent>1){
    //       multipiler = base;
    //       for(let e=1; e<exponent; e++){
    //       base *= multipiler;
    //         }
    //           }
    //           exponentOutput = base;
    //           userInput =  userInput.replace(exponentInput, exponentOutput);
    //  }
   // }while(expIndex != -1);
     if(state){
      try{
      answer = eval(userInput);
      answer= answer.toFixed(3)
      prevAnswer = answer;
      DISPLAY.screen.value = answer; 
      }catch(error){
        DISPLAY.screen.value = "undefined";
        return;
      }
    }
       
      
})