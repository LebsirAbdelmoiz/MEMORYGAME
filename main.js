let duration = 1000,
    parent = document.querySelector(".parent"),
    sons = Array.from(parent.children),
    orderedsons = [...Array(sons.length).keys()],
    isstarted = false,
    minutes = 0,
    secondes = 0,
    timerinterval,
    finaltime,
    matchcount = 0,
    attempts=0,
    startgame = document.querySelector(".startmenu span"),
    playagain = document.querySelector('.endmenu span');
    
startgame.addEventListener('click', function(){
    document.querySelector(".startmenu").classList.add('hidden');
});
shuffle(orderedsons);
sons.forEach((son, index) => {
    son.style.order = orderedsons[index];
    son.addEventListener('click', function(){
        if (!isstarted) {
            isstarted=true;
            starttimer();
        }
        flip(son);
        if (matchcount === 16) {
            clearInterval(timerinterval);
            finaltime = document.querySelector(".timer span").textContent;
            setTimeout(() => {
                document.querySelector('.endmenu').classList.add('nonhidden')
                document.querySelector('.endmenu .text2 .timer').textContent = finaltime;
                document.querySelector('.endmenu .text2 .attempts').textContent = attempts;
            },1000);
            playagain.addEventListener('click', function() {
                location.reload();
            });
        }
    });
});

function shuffle(array) {
  let current = array.length,
      temp,
      random;
  while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
  }
  return array;
}
function starttimer() {
    timerinterval = setInterval (() => {
        if (secondes<(59)) {
             secondes++;
        } else {
             secondes = 0;
             minutes++;
        }
        document.querySelector('.timer span').textContent = String(minutes).padStart(2,'0')+':'+String(secondes).padStart(2,'0');
    }, 1000);
}
function flip(selectedson) {  
    selectedson.classList.add('is-faced');
    let allflippedsons = sons.filter(flippedson => flippedson.classList.contains('is-faced'));
    if (allflippedsons.length === 2) {
        stopclicking();
        checkmatched(allflippedsons[0],allflippedsons[1]);
    }
}
function stopclicking() {
     parent.classList.add('stopclicking');
     setTimeout(() => {
        parent.classList.remove('stopclicking');
     }, duration);
}
function checkmatched(first, seconde) {
    if (first.dataset.animal === seconde.dataset.animal) {
        first.classList.remove('is-faced');
        first.classList.add('is-matched');
        seconde.classList.remove('is-faced');
        seconde.classList.add('is-matched');
        matchcount = matchcount + 2;
        attempts +=1;
        document.getElementById("attempts").textContent = "Attempts : "+String(attempts).padStart(2,"0");
    } else {
        setTimeout(() => {
            first.classList.remove('is-faced');
            seconde.classList.remove('is-faced');
        },duration)
        attempts +=1;
        document.getElementById("attempts").textContent = "Attempts : "+String(attempts).padStart(2,"0");
    }
}