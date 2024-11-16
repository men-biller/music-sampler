// Prevent multiple audio tracks from playing
function stopAllAudio() {
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reset the player to the beginning
    }
}

// Function to handle album image clicks
function handleAlbumClick(albumId) {
    const playerContainer = document.getElementById("player-container");
    const songTitle = document.getElementById("song-title");
    const audioPlayer = document.getElementById("audio-player");

    // Stop any currently playing audio
    stopAllAudio();

    // Display the correct song and player based on the album clicked
    switch (albumId) {
        case "album1":
            songTitle.textContent = "Selected Ambient Works 85-92 - Xtal";
            audioPlayer.src = "audio/Xtal.mp3"; // Ensure this file exists in the audio folder
            break;
        case "album2":
            songTitle.textContent = "Selected Ambient Works Vol. II - #3";
            audioPlayer.src = "audio/ambient_works_3.mp3"; // Ensure this file exists in the audio folder
            break;
        case "album3":
            songTitle.textContent = "Richard D. James Album - Fingerbib";
            audioPlayer.src = "audio/Fingerbib.mp3"; // Ensure this file exists in the audio folder
            break;
        case "album4":
            songTitle.textContent = "Drukqs - Avril 14th";
            audioPlayer.src = "audio/avril_14th.mp3"; // Ensure this file exists in the audio folder
            break;
        default:
            console.error("Unknown album ID:", albumId);
            return;
    }

    // Make the player container visible
    playerContainer.style.display = "block";

    // Play the audio
    audioPlayer.play();
}

// Add event listeners to album images
document.querySelectorAll(".album").forEach((album) => {
    album.addEventListener("click", (e) => {
        handleAlbumClick(e.target.id);
    });
});
