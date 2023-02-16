


// Client facing scripts here
$(() => {

  $('#generatebutton').on('click', function() {
    const myLength = $('#pw-length').val()
    const lowerCase = $('#pw-lowercase').is(':checked')
    const upperCase =$('#pw-uppercase').is(':checked')
    const number = $('#pw-number').is(':checked')
    const sym = $('#pw-symbol').is(':checked')

    console.log('variables:', myLength, lowerCase, upperCase, number, sym)

    const password = genPassword(myLength, lowerCase, upperCase, number, sym)
    // console.log("pw:", password)
    //put the password into the pw entry field
    $("#pw-entry").val(password)
  })

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
  $('form').on('submit', function(event) {
    event.preventDefault()
    const data = $(this).serialize()
    $.post('/api/passwords', data)
      .then(function(result){
        const element =  $(`<h3>
        ${result.username}
        ${result.url}
        ${result.email}
        ${result.password}
        ${result.category}
        </h3>`)
        $('.passwords').append(element)

      })

  })


});

