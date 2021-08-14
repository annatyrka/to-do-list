const userInput = document.getElementById("input");
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear-all");
const listUl = document.getElementById("to-do-list");
const listSection = document.getElementById("main-list");


//adding an item 
const addItems = addButton.onclick = (() => {
    let li = document.createElement("li");
    li.classList.add('list-item');
    li.innerHTML = `<p contenteditable="true"> ${userInput.value}</p>
    <div class="completed"><i class="far fa-circle"></i></div>
    <div class="remove"><i class="far fa-trash-alt"></i></div>
    `
    listUl.appendChild(li);
    relaxBanner();

});

// add / remove relax banner
function relaxBanner() {

    if (listUl.children.length === 0 && listSection.children.length === 1) {    
        const div = document.createElement("div");
        div.classList.add("relax-banner");
        div.innerHTML = `
          <h3>Nothing to do so far - you can relax</h3>
          <i class="fas fa-couch"></i>`
        listSection.appendChild(div);
        
    }
    else if (listUl.children.length === 1 && listSection.children.length === 2) {     
        const div = document.querySelector('.relax-banner');
        console.log(div);
        listSection.removeChild(div)      
        }
}

// clear all items
clearButton.onclick = (() => {
    let currenList = listUl.children;
    while (currenList.length > 0) {
        listUl.removeChild(currenList[0]);   
    }
    relaxBanner();
});


// remove specific item or mark as complete
listUl.addEventListener('click', event => {
    if (event.target.parentElement.classList.contains('remove')) {
        let removeItem = event.target.parentElement.parentElement;
        listUl.removeChild(removeItem);
    }

    else if (event.target.parentElement.classList.contains('completed')) {
        
        //toggle between completed and not

        if (event.target.classList.contains("fa-check-circle")) {
        event.target.classList.remove("fa-check-circle");
        event.target.classList.add("fa-circle");
        event.target.style.color = "var(--purple)";
        const parElem = event.target.parentElement.previousSibling.previousSibling;
        parElem.style.backgroundColor = "var(--grey)";
        parElem.style.borderLeft = "var(--purple) 3px solid";
        parElem.style.color = "inherit";     
        }

        else {
        event.target.classList.remove("fa-circle");
        event.target.classList.add("fa-check-circle");
        event.target.style.color = "var(--dark-green)";
        const parElem = event.target.parentElement.previousSibling.previousSibling;
        parElem.style.backgroundColor = "var(--green)";
        parElem.style.borderLeft = "var(--dark-green) 3px solid";
        parElem.style.color = "var(--dark-grey)";
        
        }


    }
    relaxBanner();
})



