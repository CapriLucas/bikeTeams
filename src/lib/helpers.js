const selector = (values,correct)=>{
  let finalText ='';
  for (let value of values) {
    if(value == correct){
      value = `<option selected>${value}</option>`;
    }
    else{
      value = `<option>${value}</option>`;
    }

    finalText = finalText + value + '\n';
  }
  return finalText;
};

const hola = ()=>{
  return `<h1> HOLA </h1>`;
}

module.exports ={
  selector,
  hola
}