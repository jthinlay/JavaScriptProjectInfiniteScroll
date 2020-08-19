const imageContainer =  document.getElementById('image-container');
const loader = document.getElementById("loader");

let ready = false; 
let imagesLoaded = 0;
let totalImages = 0; 
let isInitialPhotosLoad = true;

let photosArray = [];

// helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Unsplash API URL 
let initialPhotoCount = 5;
const apiKey = '3eL2yadZ1W5uXQViyC_N9T3KagXIfS2iqKD9poRuj-Q';
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialPhotoCount}`;

function updateApiUrlWithNewCount(pictureCount){
    unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${pictureCount}`
}
//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++; 
    if(imagesLoaded === totalImages){
        ready = true; 
        loader.hidden = true;        
    } 
}

// Create Elements for links and Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images:', totalImages)
    loader.hidden = true;
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getUnsplashApiPhotos(){
    try{
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialPhotosLoad){
            updateApiUrlWithNewCount(30);
            isInitialPhotosLoad = false;
        }
    }catch(error){
        console.log("Whoops! something went wrong", error)
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getUnsplashApiPhotos();
    }
})
getUnsplashApiPhotos();


