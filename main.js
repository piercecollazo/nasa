window.onload = init()

function init(){
    document.querySelector('#apod-btn')
        .addEventListener('click', apodPage)
    
    document.querySelector('#rover-btn')
        .addEventListener('click', roverPage)  
    
    apodRequest()
    roverRequest()
}

function apodPage(){
    document.querySelector('#apod-page').className = "row d-flex flex-column align-items-center"
    document.querySelector('#rover-page').className = "row d-none"
}

function apodRequest(){
    let httpRequest = new XMLHttpRequest()
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

function roverPage(){
    document.querySelector('#rover-page').className = "row d-flex flex-column align-items-center"
    document.querySelector('#apod-page').className = "row d-none"

}

function roverRequest(){
    let httpRequest = new XMLHttpRequest()
    console.log('roverRequest is firing')
    httpRequest.open("GET", "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=FwZAXU2a7cUON6YUNpbZ2PvIlPbFhhEkr1bAb8rb", true)

    httpRequest.onreadystatechange = ()=>{
        let data = JSON.parse(event.target.responseText)
        console.log(data)

        if(httpRequest.status == 200){
            console.log('request fired')
            let roverPic = document.querySelector('#drone-cam')
            let picID = document.querySelector('#ID')
            let picSol = document.querySelector('#sol')
            let picDate = document.querySelector('#earth-date')

            roverPic.src = `${data.photos[0].img_src}`
            picID.innerText = `Photo ID: ${data.photos[0].id}`
            picSol.innerText = `Martian sol(since arrival): ${data.photos[0].sol}`
            picDate.innerText = `Earth date taken: ${data.photos[0].earth_date}`
        } else {
            console.log('There was an error getting the data!')
        }
    }
    httpRequest.send()
}