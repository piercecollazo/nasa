window.onload = init()
let httpRequest

function init(){
    
    
    apodRequest()
}

function apodRequest(){
    let httpRequest = new XMLHttpRequest()
    console.log('apod fired')
    // Getting the url from NASA API
    httpRequest.open("GET", "https://api.nasa.gov/planetary/apod?api_key=FwZAXU2a7cUON6YUNpbZ2PvIlPbFhhEkr1bAb8rb", true)

    // Using the url to assign a source to an img bracket in HTML
    httpRequest.onreadystatechange = ()=>{
        let data = JSON.parse(event.target.responseText)
        if(httpRequest.status == 200){
            let apodPic = document.querySelector("#APOD")
            let apodCopy = document.querySelector('#copyright')
            let apodSum = document.querySelector('#summary')
            apodPic.src = data.url
            apodCopy.innerText = `${data.copyright} ${data.date}`
            apodSum.innerText = data.explanation
        } else {
            console.log('Error: API did not load!')
        }
    }
    httpRequest.send()
}