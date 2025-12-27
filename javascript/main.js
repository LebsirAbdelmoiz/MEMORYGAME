let duration = 1000;
let parent = document.querySelector(".parent");
let sons = Array.from(parent.children);
let orderedsons = [...Array(sons.length).keys()];
shuffle(orderedsons);
sons.forEach((son, index) => {
    son.style.order = orderedsons[index];
    son.addEventListener('click', function(){
        flip(son);
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
    } else {
        setTimeout(() => {
            first.classList.remove('is-faced');
            seconde.classList.remove('is-faced');
        },duration)
        
    }
}