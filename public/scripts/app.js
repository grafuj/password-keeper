
// Client facing scripts here
$(() => {

  $('#pw-copy').on('click', function() {
    const myPassword = $('#pw-entry').val();
    navigator.clipboard.writeText(myPassword);
    alert("Copied password successfully");
  });

  $('#pw-db-copy').on('click', function() {
    console.log('test1');
    const myPassword = $('#db-retrieved-pw').val();
    console.log('grabbed:', myPassword);
    navigator.clipboard.writeText(myPassword);
    alert("Copied password successfully");
  });



  $('#generatebutton').on('click', function() {
    const myLength = $('#pw-length').val();
    const lowerCase = $('#pw-lowercase').is(':checked');
    const upperCase = $('#pw-uppercase').is(':checked');
    const number = $('#pw-number').is(':checked');
    const sym = $('#pw-symbol').is(':checked');


    const password = genPassword(myLength, lowerCase, upperCase, number, sym);
    //put the password into the pw entry field
    $("#pw-entry").val(password);
  });

  //returns a random string of desired length, with booleans to determine what the password should contain
  const genPassword = (length = 13, containLowercase = true, containUppercase = false, containNumbers = true, containSymbols = false) => {
    let bank = "";
    if (containLowercase) {
      let lowercase = 'abcdefghijklmnoqrstuvwxyz';
      bank += lowercase;
    }
    if (containUppercase) {
      let uppercase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
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

    let randStr = "";
    if (!bank.length) {
      return randStr;
    }
    for (let i = 0; i < length; i++) {
      randStr += bank[Math.floor(bank.length * Math.random())];
    }
    return randStr;
  };
  //can't use arrow functions,we want to use .this which will refer to what called the function as opposed to the parent
  $('form#create-password').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post('/api/passwords', data)
      .then(function(result) {
        const element = $(`
        <td>${result.username}</td>
        <td>${result.url}</td>
        <td>${result.email}</td>
        <td>${result.password}</td>
        <td>${result.category}</td>
        <td><button id="pw-edit">Edit</button></td>
        <td><button type = "submit" id ='pw-db-copy'>Copy</button></td>
        <td><button>Delete</button></td>
        `);
        $('.newestPw').append(element);
      });
  });
});



