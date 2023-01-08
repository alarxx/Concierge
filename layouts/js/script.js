let item = document.querySelector(".uslug-item");

item.addEventListener('mousedown', function(){
    if (item.classList.contains("uslug-item-active")) {
        item.classList.remove("uslug-item-active")
    } else {
        item.classList.add("uslug-item-active")
    }

});


let card = document.querySelector(".card-item");

card.addEventListener('mousedown', function(){
    if (card.classList.contains("card-item-active")) {
        card.classList.remove("card-item-active")
    } else {
        card.classList.add("card-item-active")
    }

});


let work_card = document.querySelector(".work-card");

work_card.addEventListener('mousedown', function(){
    if (work_card.classList.contains("work-card-active")) {
        work_card.classList.remove("work-card-active")
    } else {
        work_card.classList.add("work-card-active")
    }

});