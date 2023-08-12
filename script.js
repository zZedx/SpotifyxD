const dropdownBtn = document.querySelector(".dropdownBtn");
const btntext = document.querySelector(".dropdownBtn span");
const dropdown = document.querySelector("#dropdown");
const caret = document.querySelector(".fa-caret-down");
const listItems = document.querySelectorAll("#dropdown li");

setTimeout(function () {
    document.querySelector(".container").style.display = "flex"
    document.querySelector(".loader-div").style.display = "none"
}, 1500)

dropdownBtn.addEventListener('click', function () {
    dropdown.classList.toggle("toggle")
    caret.classList.toggle("fa-rotate-180")
})
for (let item of listItems) {
    item.addEventListener('click', function () {
        btntext.innerText = item.innerText;
        dropdown.classList.toggle("toggle")
        caret.classList.toggle("fa-rotate-180")
    })
}


const div2Nav = document.querySelector('.div2Nav');
const div2 = document.querySelector('.div2');
const stickyDiv = document.querySelector('.songsHeader');
const stickyDi = document.querySelector('.playpause');

div2.addEventListener('scroll', () => {
    if (div2.scrollTop > 200) {
        div2Nav.classList.add('scrolled');
    } else {
        div2Nav.classList.remove('scrolled');
    }

    const stickyDivOffsetTop = stickyDi.offsetTop;
    const scrollThreshold = stickyDivOffsetTop + 20; // Adjust this threshold as needed

    if (div2.scrollTop > scrollThreshold) {
        stickyDiv.classList.add('sticky');
    } else {
        stickyDiv.classList.remove('sticky');
    }
});


const songsCOntainer = document.querySelector(".songsMain");
const songs = document.querySelector(".songs")

function createSong(i, imgsource, songName, albumName, durationSec) {
    let song = document.createElement("div");
    song.classList.add('songs', 'playlistItem', 'music', `song${i}`);

    let sNo = document.createElement('span');
    sNo.classList.add('sNo')
    sNo.innerText = i;
    song.appendChild(sNo);

    let musicName = document.createElement('div')
    musicName.classList.add('musicName')
    song.appendChild(musicName)

    let img = document.createElement('img')
    img.classList.add('songImg')
    img.src = imgsource;
    let title = document.createElement('h3')
    musicName.appendChild(img)
    title.innerText = songName;
    musicName.appendChild(title);

    let album = document.createElement('span');
    album.classList.add('album')
    album.innerText = albumName;
    song.appendChild(album)

    let date = document.createElement('span');
    date.classList.add('dateAdded')
    const currentDate = new Date();
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    date.innerText = `${day}/${year}`
    song.appendChild(date);

    let duration = document.createElement('span');
    duration.classList.add('duration')
    duration.innerText = durationSec;
    song.appendChild(duration);

    songsCOntainer.appendChild(song)
}


let index = 0

const playButton = [];
const audioElement = [];
const musicTitle = [];
const musicImgSrc = [];

let addmusic = (name) => {

    audioElement[index] = document.createElement("audio");
    audioElement[index].controls = true; // Display audio controls (play, pause, etc.)

    const sourceElement = document.createElement("source");
    sourceElement.src = `${name}.mp3`; // Replace with your music file's path
    sourceElement.type = "audio/mp3"; // Specify the audio type

    audioElement[index].appendChild(sourceElement);
    songsCOntainer.appendChild(audioElement[index]);

    musicTitle[index] = name;
    musicImgSrc[index] = `/imgs/${1}.jpg`
    createSong(index + 1, musicImgSrc[index], name, 'none', audioElement[index].duration)

    playButton[index] = document.querySelector(`.song${index + 1}`);
    index++;
}

addmusic('Air-Drop-Carnival')
addmusic('Hate-You')
addmusic('I-Lost-You')
addmusic('Somewhere-Only-We-Know')
addmusic('I-Lost-You')
addmusic('Somewhere-Only-We-Know')


let audioPlaying = []

for (let i = 0; i < index; i++) {
    audioPlaying[i] = false;
}

let songIndex = ''
let progressRange = document.querySelector('.progressRange')
progressRange.value = 0
let time = document.querySelector('.currentTime');
let totalTime = document.querySelector('.Duration')
let playpause = document.querySelector('.songPlayPause')

function bottomNavInfo() {
    let bottomImg = document.querySelector('.bottomImg')
    bottomImg.src = musicImgSrc[songIndex]
    let bottomNavTitle = document.querySelector('.bottomNavTitle h3')
    bottomNavTitle.innerText = musicTitle[songIndex];


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Use string interpolation or concatenation to format the result
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`.substring(0, 4);
    }


    totalTime.innerText = formatTime(audioElement[songIndex].duration);



    audioElement[songIndex].addEventListener('timeupdate', function () {
        const currentTime = audioElement[songIndex].currentTime;
        const duration = audioElement[songIndex].duration;
        const percentage = (currentTime / duration) * 100;
        progressRange.value = percentage;
        time.innerText = formatTime(audioElement[songIndex].currentTime);
        if (!audioElement[songIndex].paused) {
                    playpause.classList.remove('fa-circle-play')
                    playpause.classList.add('fa-circle-pause')
                }
                else {
                    playpause.classList.add('fa-circle-play')
                    playpause.classList.remove('fa-circle-pause')
                }
        //     if(audioElement[songIndex].currentTime === formatTime(audioElement[songIndex].duration)){
        //         playpause.classList.add('fa-circle-play')
        // playpause.classList.remove('fa-circle-pause')
        //     }
    })

    // setInterval(() => {
    //     if (!audioElement[songIndex].paused) {
    //         playpause.classList.remove('fa-circle-play')
    //         playpause.classList.add('fa-circle-pause')
    //     }
    //     else {
    //         playpause.classList.add('fa-circle-play')
    //         playpause.classList.remove('fa-circle-pause')
    //     }
    // }, 500);
}


for (let i = 0; i < index; i++) {
    playButton[i].addEventListener("click", () => {
        for (let i = 0; i < index; i++) {
            playButton[i].classList.remove('playing')
        }

        audioElement[i].currentTime = 0

        if (audioPlaying.every(status => status === false)) {
            if (audioElement[i].paused) {

                audioElement[i].play(); // Play the audio
                console.log(audioElement[i].duration)
                audioPlaying[i] = true
                songIndex = i;
                console.log(i)
                playButton[i].classList.add('playing');

            } else {
                audioElement[i].pause(); // Pause the audio
                audioPlaying[i] = false
                // playButton[i].classList.remove('playing');
            }
        }
        else {
            for (let i = 0; i < audioElement.length; i++) {
                if (!audioElement[i].paused) {
                    audioElement[i].pause();
                    // audioElement[i].currentTime = 0
                    // playButton[i].classList.remove('playing');
                }
            }
            if (audioElement[i].paused) {

                audioElement[i].play(); // Play the audio
                console.log(audioElement[i].duration)
                audioPlaying[i] = true
                songIndex = i;
                console.log(i);
                playButton[i].classList.add('playing');
            } else {
                audioElement[i].pause(); // Pause the audio
                audioPlaying[i] = false
                // playButton[i].classList.remove('playing');
            }
        }
        bottomNavInfo()
    });

}






document.addEventListener('keydown', function () {
    if (event.code === 'Space') {
        if (!audioElement[songIndex].paused) {
            audioElement[songIndex].pause();
            // audioPlaying[i] = true
        }
        else {
            audioElement[songIndex].play();
            // audioPlaying[i] = false
        }
    }
})


progressRange.addEventListener('input', function () {
    const rangeValue = parseFloat(progressRange.value); // Convert string to number
    const audioDuration = audioElement[songIndex].duration;
    const newTime = (rangeValue / 100) * audioDuration;

    audioElement[songIndex].currentTime = newTime;
});


playpause.addEventListener('click', function () {
    if (!audioElement[songIndex].paused) {
        audioElement[songIndex].pause();
    }
    else {

        audioElement[songIndex].play();
    }
})

let volumeRange = document.querySelector('.volumeRange')
volumeRange.addEventListener('change', function () {
    for (let i = 0; i < index; i++) {
        audioElement[i].volume = volumeRange.value / 100;
    }
})


document.querySelector('.forward').addEventListener('click', function () {
    if (songIndex === index - 1) {
    }
    else {
        audioElement[songIndex].pause()
        audioElement[songIndex].currentTime = 0
        for (let i = 0; i < index; i++) {
            playButton[i].classList.remove('playing')
        }
        audioElement[songIndex + 1].play()
        audioElement[songIndex + 1].currentTime = 0
        songIndex++
        playButton[songIndex].classList.add('playing')
        bottomNavInfo()
    }
})

// document.addEventListener('click', function () {
//     if (!audioElement[songIndex].paused) {
//         playpause.classList.remove('fa-circle-play')
//         playpause.classList.add('fa-circle-pause')
//     }
//     else {
//         playpause.classList.add('fa-circle-play')
//         playpause.classList.remove('fa-circle-pause')
//     }
// })

document.querySelector('.backward').addEventListener('click', function () {
    if (songIndex === 0) {
    }
    else {
        audioElement[songIndex].pause()
        audioElement[songIndex].currentTime = 0
        for (let i = 0; i < index; i++) {
            playButton[i].classList.remove('playing')
        }
        audioElement[songIndex - 1].play()
        audioElement[songIndex - 1].currentTime = 0
        songIndex--
        playButton[songIndex].classList.add('playing')
        bottomNavInfo()
    }

})

let random = document.querySelector('.play')
random.addEventListener('click', function () {

    for (let i = 0; i < index; i++) {
        audioElement[i].currentTime = 0
    }
    if (audioPlaying.every(status => status === false)) {
        let random = Math.floor(Math.random() * index);
        audioElement[random].play();
        playButton[random].classList.add('playing')
        for (let i = 0; i < index; i++) {
            audioPlaying[i] = true;
        }
        songIndex = random
        bottomNavInfo()
    }
    else {
        let random = Math.floor(Math.random() * index);
        while (random === songIndex) {
            random = Math.floor(Math.random() * index);
            break;
        }

        audioElement[songIndex].pause();
        for (let i = 0; i < index; i++) {
            playButton[i].classList.remove('playing')
        }
        audioElement[random].play();
        playButton[random].classList.add('playing')
        songIndex = random
        bottomNavInfo()
    }
    // playButton[songIndex].scrollIntoView({ behavior: 'smooth' });

})

let muteUnmute = document.querySelector('.muteUnmute')
muteUnmute.addEventListener('click', function () {
    if (volumeRange.value > 0) {
        volumeRange.value = 0
        muteUnmute.classList.remove('fa-volume-high');
        muteUnmute.classList.add('fa-volume-xmark');
        for (let i = 0; i < index; i++) {
            audioElement[i].volume = 0
        }
    }
    else {
        volumeRange.value = 0.20
        muteUnmute.classList.add('fa-volume-high');
        muteUnmute.classList.remove('fa-volume-xmark');
        for (let i = 0; i < index; i++) {
            audioElement[i].volume = 0.20
        }
    }

})













songsCOntainer.appendChild(document.createElement('div')).classList.add('example')
songsCOntainer.appendChild(document.createElement('div')).classList.add('example')






// Spotify API only work with subscription

// const api = async (searchMusic) => {
//     const url = `https://spotify23.p.rapidapi.com/search/?q=${searchMusic}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'd670aa5570mshee846f67d570d23p126a49jsnbb625479e50f',
//             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//         let img = (result.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url)
//         let albumName = (result.tracks.items[0].data.albumOfTrack.name)
//         let name = (result.tracks.items[0].data.name)
//         let musicSource = (result.tracks.items[0].data.uri)
//         let duration = (result.tracks.items[0].data.duration.totalMilliseconds)
//         const totalSeconds = Math.floor(duration / 1000); // Convert milliseconds to total seconds
//         const minutes = Math.floor(totalSeconds / 60); // Calculate total minutes
//         const seconds = totalSeconds % 60; // Calculate remaining seconds
//         const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//         index++;
//         createSong(index, img, name, albumName, formattedTime)

//     } catch (error) {
//         console.error(error);
//     }


// }

