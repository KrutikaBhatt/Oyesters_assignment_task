/*                              Question 2
    Given a time in 12-hr AM/PM format, convert it to military time(24hr) and you also need to add 45 
    min &45 sec in the result and the display the output.
*/


function task2(input){
  
    let n = input.length;
    let amPM = input.substring(n-2);
    
    
    if(amPM =='PM'){
      
      if(input.substring(0,2) =="12"){
        input = input.substring(0, input.length-2);
      }
      else{
        if(input.substring(0,2))
          input = input.replace(input.substring(0,2), parseInt(input.substring(0,2))+12);
          input = input.substring(0, input.length-2);
      }
    }
    
    else{
      if(input.substring(0,2) =="12")
          input = input.replace(input.substring(0,2), '00');
          input = input.substring(0, input.length-2);
    }
    
    //Adding 45mins and 45sec
    let seconds = parseInt(input.substring(input.length-2));
    let minutes = parseInt(input.substring(3,5));
    let hours = parseInt(input.substring(0,2));
    
    let result_sec = seconds+45;
    let result_min = minutes+45+parseInt(result_sec/60);
    let result_hr = hours+parseInt(result_min/60);
    
    result_min = parseInt((result_min)%60);
    result_sec = parseInt(result_sec%60);
    
    
    return (result_hr +':'+result_min+':'+result_sec);
}
  
  
  //Testcases
  let input1 ="12:01:00PM";
  console.log(task2(input1));
  
  let input2 = "12:01:00AM";
  console.log(task2(input2));
  