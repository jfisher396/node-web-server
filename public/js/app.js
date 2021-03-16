console.log("public/js/app.js is working");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');



weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  if (!location) {
    console.log("You must enter a valid search term.");
  } else {
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
      res.json().then((data) => {
         
        if (data.err) {
          messageOne.textContent = data.err;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  }
});
