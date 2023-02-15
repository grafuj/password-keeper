const helper = require('../../routes/helper-functions');


// Client facing scripts here
$(() => {
  document.getElementById("pw-generate")
    .onclick = () => {
      helper.generateRandomString
    }
})