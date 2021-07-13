/*                                  Question 1
    Given an array of bird where every element represents a bird type id, determine the ids of the most 
    frequently and least frequently sighted type. If more than 1 type has been spotted that maximum 
    amount, return the smallest of their ids & If more than 1 type has been spotted that minimum amount, 
    return the smallest of their ids. 
*/

function task1(arr){

    let counts ={};
    let n = arr.length;
    
    let max=0;
    let min= Number.MAX_VALUE;
    let maxFrequency,minFrequency;
    
    //Loop through the array and insert frequencies in dictionery object
    for(var i=0;i<n;i++){
      if (counts[arr[i]]) counts[arr[i]] += 1;
      else counts[arr[i]] = 1;
    }
    
    for(key in counts){
      
      //For maximum minFrequency
      if(counts[key] > max){
        max = counts[key];
        maxFrequency = key;
      }
      
      //For minimum frequency
      if(counts[key]<min){
        min = counts[key];
        minFrequency = key;
      }
      
    }
    
    return [parseInt(maxFrequency),parseInt(minFrequency)];
}
  
  // Testcase 1
  let arr1 = [1,1,2,2,4,4,4,4,5]
  console.log(task1(arr1));
  
  //Testcase 2
  let arr2 = [2,2,2,2,4,4,4,4,5]
  console.log(task1(arr2));
  
  //Testcase 3
  let arr3 =[1,2,2,4,4,4,4,5]
  console.log(task1(arr3));
  
  //Testcase 4 : Incase of unsorted array
  let arr4 = [4,4,4,4,2,1,1,1,1,6,5]
  console.log(task1(arr4));
  
  