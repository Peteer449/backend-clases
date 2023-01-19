let numbers = {}
process.on("message", parentQuery=>{
  for(let i = 0; i < parentQuery;i++){
    let randomNumber = Math.floor(Math.random()*1000+1)
    let isInArray = numbers[randomNumber]
    if(isInArray){
      numbers[randomNumber]++
    }else{
      numbers = {...numbers,[randomNumber]:1}
    }
  }
  process.send(numbers)
})