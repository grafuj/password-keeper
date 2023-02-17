
// Client facing scripts here
$(() => {

  // Displays value of range slider in password generator
  $('#pw-lengths').on('input', function () {
    $(this).next('#range-val').html(this.value);
  });
  // Copies password from generate password box
  $('#copy-genpass').on('click', function () {
    const myPassword = $('#genpass').val();
    navigator.clipboard.writeText(myPassword);
    alert("Copied password successfully");
  });

  $('#pw-db-copy').on('click', function () {
    console.log('test1');
    const myPassword = $('#db-retrieved-pw').val();
    console.log('grabbed:', myPassword);
    navigator.clipboard.writeText(myPassword);
    alert("Copied password successfully from db");
  });

  // Delete a password
  $("#pass-table").on('click', '.delete-btn', function () {
    if(confirm("Are you sure you want to delete this password?"))
    $(this).closest('tr').remove();
  });

  $('#gen-button').on('click', function () {
    const myLength = $('#pw-lengths').val();
    const lowerCase = $('#pw-lowercases').is(':checked');
    const upperCase = $('#pw-uppercases').is(':checked');
    const number = $('#pw-numbers').is(':checked');
    const sym = $('#pw-symbols').is(':checked');


    const password = genPassword(myLength, lowerCase, upperCase, number, sym);
    //put the password into the pw entry field
    $("#genpass").val(password);
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
  $('form#create-password').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post('/api/passwords', data)
      .then(function (result) {
        const element = $(`
        <td>${result.username}</td>
        <td>${result.url}</td>
        <td>${result.email}</td>
        <td>${result.password}</td>
        <td>${result.category}</td>
        <td><button id="pw-edit">Edit</button></td>
        <td><button type ="submit" id=pw-db-copy'>Copy</button></td>
        <td><button>Delete</button></td>
        `);
        $('.newestPw').append(element);
      });
      // Reset text fields after submit
      $("#url-entry").val("");
      $("#username-entry").val("");
      $("#email-entry").val("");
      $("#pw-entry").val("");
      $("#pw-category").val("");
  });
});



