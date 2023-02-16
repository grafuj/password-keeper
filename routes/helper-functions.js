//returns a random string of desired length, with booleans to determine what the password should contain
const generateRandomString = (length = 13, containLowercase = true, containUppercase = false, containNumbers = true, containSymbols = false) => {
  let bank = "";
  if (containLowercase) {
    let lowercase = 'abcdefghijklmnoqrstuvwxyz';
    bank += lowercase;
  }
  if (containUppercase) {
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVXYZ"
    bank += uppercase;
  }
  if (containNumbers) {
    let numbers = "0123456789";
    bank += numbers;
  }
  if (containSymbols) {
    let symbols = "!@#$%^&*()_+-=,.<>";
    bank += symbols;
  }
  console.log(bank)
  let randStr = "";
  if(!containLowercase && !containUppercase && !containNumbers && !containSymbols) {
    console.log('test')
    return randStr;
  }
  for (let i = 0; i < length; i++) {
    randStr += bank[Math.floor(bank.length * Math.random())];
  }
  return randStr;
};

const getAllPasswords = (params) => {
  let url = "/api/passwords";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

module.exports = { generateRandomString, getAllPasswords }
