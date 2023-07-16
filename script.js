console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tanning ( Yo Yo Honey Singh) ", filePath: "songs/1.mp3", coverPath: "covers/honey.jpg"},
    {songName: "Chal Mere Ghar ( Yo Yo Honey Singh)", filePath: "songs/2.mp3", coverPath: "covers/honey.jpg"},
    {songName: "Daftar Ki Girl ( Yo Yo Honey Singh)", filePath: "songs/3.mp3", coverPath: "covers/honey.jpg"},
    {songName: "Desi Kalakaar ( Yo Yo Honey Singh)", filePath: "songs/4.mp3", coverPath: "covers/honey.jpg"},
    {songName: "I Am Your Dj Tonight ( Yo Yo Honey Singh)", filePath: "songs/5.mp3", coverPath: "covers/honey.jpg"},
    {songName: "Love Dose ( Yo Yo Honey Singh)", filePath: "songs/6.mp3", coverPath: "covers/honey.jpg"},
    {songName: "One Thousand Miles ( Yo Yo Honey Singh)", filePath: "songs/7.mp3", coverPath: "covers/honey.jpg"},
    {songName: "Stardom ( Yo Yo Honey Singh)", filePath: "songs/8.mp3", coverPath: "covers/honey.jpg"},
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});
 

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Function to play the song
const playSong = () => {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    syncPlayButton();
};

// Function to pause the song
const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    syncPlayButton();
};

// Function to sync the play/pause button icons with the current song item
const syncPlayButton = () => {
    const songItemPlay = document.getElementById(`songItemPlay${songIndex}`);
    if (songItemPlay) {
        if (audioElement.paused) {
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
        } else {
            songItemPlay.classList.remove('fa-play-circle');
            songItemPlay.classList.add('fa-pause-circle');
        }
    }
    songItems.forEach((element, i) => {
        const songItemPlayIcon = element.querySelector('.songItemPlay');
        if (i === songIndex) {
            if (audioElement.paused) {
                songItemPlayIcon.classList.remove('fa-pause-circle');
                songItemPlayIcon.classList.add('fa-play-circle');
            } else {
                songItemPlayIcon.classList.remove('fa-play-circle');
                songItemPlayIcon.classList.add('fa-pause-circle');
            }
        } else {
            songItemPlayIcon.classList.remove('fa-pause-circle');
            songItemPlayIcon.classList.add('fa-play-circle');
        }
    });
};

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id.replace('songItemPlay', ''));
        if (songIndex === clickedIndex && !audioElement.paused) {
            // Pause the song
            pauseSong();
        } else {
            // Play the song
            makeAllPlays();
            playSongAtIndex(clickedIndex);
        }
    });
});

// Function to play the song at a specific index
const playSongAtIndex = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    playSong();
};

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSongAtIndex(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    playSongAtIndex(songIndex);
});

audioElement.addEventListener('ended', () => {
    pauseSong();
    syncPlayButton();
});
