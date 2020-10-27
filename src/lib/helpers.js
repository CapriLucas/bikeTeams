const bcrypt = require('bcryptjs');
const passport = require('passport');

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

const encryptPassword = async (password) =>{
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  return hash;
};

const matchPassword = async (password, savedPassword)=>{
 try{
   return await bcrypt.compare(password,savedPassword);
 } catch(err){
   console.log(err);

 }
};

module.exports ={
  selector,
  encryptPassword,
  matchPassword
}