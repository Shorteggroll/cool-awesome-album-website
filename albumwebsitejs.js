
class album {
  constructor(name, artist, cover, spotURL, listened = false, review = "", rating = "Unrated"){
    this.name = name;
    this.artist = artist;
    this.cover = cover;
    this.spotURL = spotURL;
    this.listened = listened;
    this.review = review;
    this.rating = rating;
  }
}


// loads data from localstorage
let albums = JSON.parse(localStorage.getItem("UserAlbums")) || [];
let pointer = 0;


// toggles listened boolean
function toggleListened(){
  if (albums[pointer].listened){
    albums[pointer].listened = false;
  }else{
    albums[pointer].listened = true;
  }
  updateDisplay()
}


// adds a typed review
function addReview(input){
  albums[pointer].review = input;
}


// adds rating "3/5, 6/10, etc."
function addRating(input){
  if(isNaN(input)){
    // add message, "try again"
  }else{
    albums[pointer].rating = Number(input);
  }
}


// updates album info and cover image
function updateDisplay(){
  const info = document.getElementById("album-info");
  const count = document.getElementById("album-count");
  const cover = document.getElementById("album-cover-display");
  const status = document.getElementById("listened-status");
  

  info.textContent = `${albums[pointer].name} - ${albums[pointer].artist}`;
  count.textContent = `Album ${pointer + 1} of ${albums.length}`;
  cover.src = albums[pointer].cover;
  
  if (albums[pointer].listened){
    status.textContent = "Listened!";
  }else{
    status.textContent = "Not Listened!";
  }
}


// adds album to list and pushes it to localstorage
function addNewAlbum(){
  const name = document.getElementById("album-name").value;
  const artist = document.getElementById("album-artist").value;
  const cover = document.getElementById("album-cover").value;
  const spotURL = document.getElementById("album-url").value;

  const newAlbum = new album(name, artist, cover, spotURL);

  albums.push(newAlbum);

  localStorage.setItem("userAlbums", JSON.stringify(albums));

  pointer = albums.length - 1;
  updateDisplay();
}


// go right in list
function goRight(){
  if(albums.length > 0){
    if (pointer == albums.length - 1){
      pointer = 0;
    }else{
      pointer += 1;
    }

    updateDisplay()
  }
}


// go left in list
function goLeft(){
  if(albums.length > 0){
    if (pointer == 0){
      pointer = albums.length - 1;
    }else{
      pointer -= 1;
    }

    updateDisplay()
  }
}


// deletes current album, updates localstorage, pointer -= 1
function deleteCurrentAlbum() {
  if (albums.length === 0) return;

  albums.splice(pointer, 1);

  if (pointer >= albums.length) {
    pointer = Math.max(0, albums.length - 1);
  }

  localStorage.setItem("UserAlbums", JSON.stringify(albums));

  if (albums.length > 0) {
    updateDisplay();
  } else {
    document.getElementById("album-info").textContent = "No albums added";
    document.getElementById("album-count").textContent = "Album 0 of 0";
    document.getElementById("album-cover-display").src = "no-cover.png";
  }
}



if (albums.length > 0) {
  updateDisplay();
}else{
  const info = document.getElementById("album-info");
  const count = document.getElementById("album-count");
  const cover = document.getElementById("album-cover-display");

  info.textContent= "No albums added";
  count.textContent = "Album 0 of 0";
  cover.src = "aaa.png";
}
