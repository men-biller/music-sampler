// Prevent multiple audio tracks from playing
function stopAllAudio() {
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reset the player to the beginning
    }
}

// Function to reset all albums and hide the player
function resetAlbums() {
    const albumImages = document.querySelectorAll(".album");
    albumImages.forEach((album) => {
        album.style.display = "block"; // Show all albums
    });

    const playerContainer = document.getElementById("player-container");
    playerContainer.style.display = "none"; // Hide the audio player

    stopAllAudio(); // Stop any playing audio
}

// Function to set up audio player sources
function setAudioSources(audioPlayer, songBaseName) {
    audioPlayer.innerHTML = ""; // Clear previous sources

    // Add .mp3 and .ogg sources
    const mp3Source = document.createElement("source");
    mp3Source.src = `audio/${songBaseName}.mp3`;
    mp3Source.type = "audio/mpeg";

    const oggSource = document.createElement("source");
    oggSource.src = `audio/${songBaseName}.ogg`;
    oggSource.type = "audio/ogg";

    // Append sources to the audio player
    audioPlayer.appendChild(mp3Source);
    audioPlayer.appendChild(oggSource);
}

// Function to handle album image clicks
function handleAlbumClick(albumId) {
    const playerContainer = document.getElementById("player-container");
    const songTitle = document.getElementById("song-title");
    const audioPlayer = document.getElementById("audio-player");
    const albumImages = document.querySelectorAll(".album");

    // Check if the clicked album is the one currently displayed
    if (playerContainer.style.display === "block" && playerContainer.dataset.currentAlbum === albumId) {
        resetAlbums(); // Reset the albums and stop the song
        return;
    }

    // Stop any currently playing audio
    stopAllAudio();

    // Hide all album images except the clicked one
    albumImages.forEach((album) => {
        if (album.id === albumId) {
            album.style.display = "block"; // Keep the clicked album visible
        } else {
            album.style.display = "none"; // Hide other albums
        }
    });

    // Display the correct song and player based on the album clicked
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

    // Make the player container visible and store the current album ID
    playerContainer.style.display = "block";
    playerContainer.dataset.currentAlbum = albumId; // Track the currently displayed album

    // Play the audio
    audioPlayer.load(); // Reload the sources
    audioPlayer.play();
}

// Add event listeners to album images
document.querySelectorAll(".album").forEach((album) => {
    album.addEventListener("click", (e) => {
        handleAlbumClick(e.target.id);
    });
});
