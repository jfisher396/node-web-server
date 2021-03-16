console.log("public/js/app.js is working");

fetch('http://localhost:3000/weather?address=Portland').then((res) => {
    res.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})