const addNoteModal = document.querySelector(".addNoteModal")
const addNoteBtn = document.getElementById("addBtn")
const cancelBtn = document.getElementById("cancelBtn")

addNoteBtn.addEventListener("click", ()=>{
    addNoteModal.showModal()
})


const errorMsg = document.querySelector(".errorMsg")




// TIME SET

function timeSet (){

    let allTimeSet = new Date;

    const clockHour = document.querySelector(".hour")
    const clockMinute = document.querySelector(".minute")
    const dayOrNight = document.querySelector("#dayOrNight")

    let hour = allTimeSet.getHours()
    let minute = allTimeSet.getMinutes()
    let hour2 = allTimeSet.getHours()
    let second = allTimeSet.getSeconds()

    if (hour2 >= 12 && hour <= 23){
        dayOrNight.textContent = 'PM'
    } else {
        dayOrNight.textContent = "AM"
    }

    if (hour == 13){
        hour = 1
    } else if(hour == 14){
        hour = 2
    } else if(hour == 15){
        hour = 3
    } else if(hour == 16){
        hour = 4
    } else if(hour == 17){
        hour = 5
    } else if(hour == 18){
        hour = 6
    } else if(hour == 19){
        hour = 7
    } else if(hour == 20){
        hour = 8
    } else if(hour == 21){
        hour = 9
    } else if(hour == 22){
        hour = 10
    } else if(hour == 23){
        hour = 11
    } 



    if (hour >= 0 && hour <= 9){
        hour = "0" + hour
        
    } 
    if (minute >=0 && minute <= 9) {
        minute = "0" + minute
    }

    clockHour.textContent = hour
    clockMinute.textContent = minute
    
}

setInterval(()=>{
    timeSet()
    setDate()
}, 1000)


// TIME SET END


// DATE SET

function setDate (){

let allTimeSet = new Date

const miniDate = document.querySelector("#miniDate")
const mainDate = document.querySelector(".date")
let day = allTimeSet.getDay()
let date = allTimeSet.getDate()
let month = allTimeSet.getMonth() + 1
let year = allTimeSet.getFullYear()


switch(month){
        case 1:
            month = "January"
        break;
        case 2:
            month = "February"
        break;
        case 3:
            month = "march"
        break;
            case 4:
            month = "April"
        break;
        case 5:
            month = "May"
        break;
        case 6:
            month = "June"
        break;
        case 7:
            month = "July"
        break;
        case 8:
            month = "August"
        break;
        case 9:
            month = "September"
        break;
        case 10:
            month = "October"
        break;
        case 11:
            month = "November"
        break;
        case 12:
            month = "December"
        break;

    }

    switch(day){
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
    }

    let miniMonth = month.slice(0, 3)


    mainDate.textContent = `${day}, ${date} ${month} ${year}`
    miniDate.textContent =  `${miniMonth} ${date}`



}



// DATE SET END



// MAKE NEW NOTE


const noteContainer = document.querySelector(".noteContainer")



let noteArr = JSON.parse(localStorage.getItem("savedNote")) || []
renderNote()


const noteText = document.querySelector("#noteText")


let selectedColor = "#1883FF";

const colorOptions = document.querySelectorAll(".colorOption");

colorOptions.forEach(btn=>{
    btn.addEventListener("click",()=>{

        colorOptions.forEach(c=>c.classList.remove("selected"));

        btn.classList.add("selected");

        selectedColor = btn.dataset.color;

        changeExampleColor()
        
    });
});

const exampleNote = document.querySelector(".exampleNote")

function changeExampleColor (){
    exampleNote.style.background = selectedColor
}


function addNewNote (){

    noteArr.unshift({
        id: Date.now(),
        text: noteText.value,
        color: selectedColor
    })

    localStorage.setItem("savedNote", JSON.stringify(noteArr))

    addNoteModal.close()

}

const submitBtn = document.querySelector("#submitNote")

submitBtn.addEventListener("click", ()=>{

    if (noteText.value == ""){
        errorMsg.textContent = "*Type Your Note First"
        return;
    }

    addNewNote()
    renderNote()
    noteText.value = ""
    errorMsg.textContent = ""
    
})

cancelBtn.addEventListener("click", ()=>{
    addNoteModal.close()
    errorMsg.textContent = ""

    noteText.value = ""
})

function renderNote (){

    noteContainer.innerHTML = ""

    noteArr.forEach((item)=>{
        noteContainer.innerHTML += `
        
                <div style="background : ${item.color}" class="note" data-id="${item.id}">
                    <div class="noteHeader">
                        <p id="noteTitle">Note</p>
                    </div>
                    <div class="noteBody">
                        <p class="noteText">${item.text}</p>
                    </div>
                    <div class="noteFooter">
                        <img class="deleteBtn" src="delete Btn.png">
                    </div>
                </div>
        `
    })
    
}



// MAKE NEW NOTE END


// DELETE NOTE 


noteContainer.addEventListener("click", (event)=>{

    if(!event.target.classList.contains("deleteBtn"))
        return;

    const noteCard =
        event.target.closest(".note");

    const noteId =
        Number(noteCard.dataset.id);

    deleteNote(noteId);

});



function deleteNote(noteId){

    noteArr =
        noteArr.filter(item =>
            item.id !== noteId
        );

    localStorage.setItem(
        "savedNote",
        JSON.stringify(noteArr)
    );

    renderNote();

}



// DELETE NOTE END



// MUSIC SET

const musicArr = [{title: "Daily Freedom", audio:"daily Freedom.mp3"},
               {title: "Daily Leisure", audio:"daily leisure.mp3"},
               {title: "Dew Gardening", audio:"dew gardening.mp3"},
               {title: "Fantasy Serenity", audio:"Fantasy Serenity.mp3"},
               {title: "Lightstream Alley", audio:"lightstream alley.mp3"},
               {title: "Sun Moon And Stars", audio:"sun moon and stars.mp3"},
               {title: "Sunny Failume", audio:"sunny failume.mp3"},
               {title: "Pickles", audio:"pickles.mp3"},
               {title: "Giorno Per Giorno", audio:"giorno per giorno.mp3"},
               {title: "Astrum Unicum", audio:"astrum unicum.mp3"},
               {title: "Wrong World", audio:"wrong world.mp3"},
               {title: "Regali Teneri", audio:"regali teneri.mp3"},
               {title: "Stade du Miroir", audio:"stade du miroir.mp3"},         
]

const musicOnOf = document.querySelector(".musicVolume")
const currentMusicTitle = document.querySelector("#currentPlaying")

const music = new Audio()



let currentMusic = Number(localStorage.getItem("currentSong")) || 0;

let isPlaying = false;

if (currentMusic >= musicArr.length) {
  currentMusic = 0
}

function loadSong (index){
    currentMusic = index

    localStorage.setItem("currentSong", currentMusic)

    music.src = musicArr[index].audio

    currentMusicTitle.textContent = musicArr[index].title
}

loadSong(currentMusic)


function playMusic(){
    music.play()

    isPlaying = true

    musicOnOf.src = "music volume logo.png"
}


function pauseMusic (){
    music.pause()

    isPlaying = false

    musicOnOf.src = "music volume logo X.png"
}



musicOnOf.addEventListener("click", ()=>{
    if(isPlaying){
        pauseMusic()
    } else {
        playMusic()
    }
})

function nextSong(){

   let random;

    do{
        random = Math.floor(Math.random() * musicArr.length);
    }while(random === currentMusic);

    currentMusic = random;

   // kalau udah lagu terakhir balik ke awal

//    if(currentMusic >= musicArr.length){
//       currentMusic = 0
//    }

   loadSong(currentMusic)

   playMusic()
}


music.addEventListener("ended", ()=>{

   nextSong()

})

// MUSIC SET END



// POMODORO MODE


const header = document.querySelector("header")
const pomodoroBtn = document.querySelector(".pomodoroMode")
const main = document.querySelector("main")
const middleMain =document.querySelector(".middleMain")

pomodoroBtn.addEventListener("click", ()=>{
    header.classList.toggle("hidden")
    main.classList.toggle("resize")
    middleMain.classList.toggle("setMargin")
    console.log(header)
})




// POMODORO MODE END



// SET FULL SCREEN

pomodoroBtn.addEventListener("click", toggleFullscreen);

async function toggleFullscreen(){

    if(!document.fullscreenElement){

        await document.documentElement.requestFullscreen();

    }else{

        await document.exitFullscreen();

    }

}



// SET FULL SCREEN END