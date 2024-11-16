//stops audio from playing simultaneously
function stopAllAudio() {
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; 
    }
}

// reset albums + hide player
function resetAlbums() {
    const albumImages = document.querySelectorAll(".album");
    albumImages.forEach((album) => {
        album.style.display = "block"; // Show all albums
    });

    const playerContainer = document.getElementById("player-container");
    playerContainer.style.display = "none"; // hide audio player

    stopAllAudio(); // stops any audio currently playing
}

// audio player sources
function setAudioSources(audioPlayer, songBaseName) {
    audioPlayer.innerHTML = ""; // clear

    const mp3Source = document.createElement("source");
    mp3Source.src = `audio/${songBaseName}.mp3`;
    mp3Source.type = "audio/mpeg";

    const oggSource = document.createElement("source");
    oggSource.src = `audio/${songBaseName}.ogg`;
    oggSource.type = "audio/ogg";

    audioPlayer.appendChild(mp3Source);
    audioPlayer.appendChild(oggSource);
}

// album click
function handleAlbumClick(albumId) {
    const playerContainer = document.getElementById("player-container");
    const songTitle = document.getElementById("song-title");
    const audioPlayer = document.getElementById("audio-player");
    const albumImages = document.querySelectorAll(".album");

    // album display check
    if (playerContainer.style.display === "block" && playerContainer.dataset.currentAlbum === albumId) {
        resetAlbums(); // reset albums 
        return;
    }

    // Stop any currently playing audio
    stopAllAudio();

    // hide all albums except 
    albumImages.forEach((album) => {
        if (album.id === albumId) {
            album.style.display = "block"; // keep clicked album visible
        } else {
            album.style.display = "none"; // hide other albums
        }
    });

    // more display functions and track/album matching
    switch (albumId) {
        case "album1":
            songTitle.textContent = "Selected Ambient Works 85-92 - Xtal";
            setAudioSources(audioPlayer, "Xtal");
            break;
        case "album2":
            songTitle.textContent = "Selected Ambient Works Vol. II - #3";
            setAudioSources(audioPlayer, "ambient_works_3");
            break;
        case "album3":
            songTitle.textContent = "Richard D. James Album - Fingerbib";
            setAudioSources(audioPlayer, "Fingerbib");
            break;
        case "album4":
            songTitle.textContent = "Drukqs - Avril 14th";
            setAudioSources(audioPlayer, "avril_14th");
            break;
        default:
            console.error("Unknown album ID:", albumId);
            return;
    }

    // current player container visible + store id
    playerContainer.style.display = "block";
    playerContainer.dataset.currentAlbum = albumId; // track displayed album

    // play audio
    audioPlayer.load(); // reload sources 
    audioPlayer.play();
}

// add event listeners 
document.querySelectorAll(".album").forEach((album) => {
    album.addEventListener("click", (e) => {
        handleAlbumClick(e.target.id);
    });
});
