const userInput = document.getElementById("input");
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear-all");
const listUl = document.getElementById("to-do-list");
const listSection = document.getElementById("main-list");
const progress = document.querySelector(".progress-done");


// progrss bar % of completion

function liCompleted() {
    const progress = document.querySelector(".progress-done");
    let liNumber = listUl.children.length;
    liDone = 0;
    for (let li =0; li<listUl.children.length; li++) {
        if (listUl.children[li].children[1].children[0].classList.contains("fa-check-circle")) {
            liDone ++;
        }
    }

    let curProgress = Math.round(liDone/liNumber*100);
    progress.setAttribute("data-done",curProgress);

progress.innerHTML = curProgress +"%";
if (curProgress === 0) {
    progress.innerHTML = "";
}
     
    setTimeout(() => {
    progress.style.opacity = 1;
    progress.style.width = progress.getAttribute("data-done") + "%";
         }, 300)

}

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
    liCompleted();

});

// add / remove relax banner
function relaxBanner() {

    if (listUl.children.length === 0 && listSection.children.length === 1) {    
        const div = document.createElement("div");
        div.classList.add("relax-banner");
        div.innerHTML = `
          <h3>Nothing to do - relax</h3>
          <i class="fas fa-couch"></i>`
        listSection.appendChild(div);

        // remove progress bar
        const progressBar = document.querySelector(".progress");
        document.querySelector(".wrapper").removeChild(progressBar);
        
    }
    else if (listUl.children.length === 1 && listSection.children.length === 2) {    
        
        //remove relax banner
        const div = document.querySelector('.relax-banner');
        listSection.removeChild(div)

        // add progress bar
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress");
        progressBar.innerHTML =`
        <div class="progress-done" data-done="0">
      
      </div>
        `
        //document.querySelector(".wrapper").appendChild(progressBar);
        
        document.querySelector(".wrapper").insertBefore(progressBar,listSection);
        liCompleted()
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
        event.target.style.color = "var(--dark-grey)";
        const parElem = event.target.parentElement.previousSibling.previousSibling;
        parElem.style.backgroundColor = "var(--grey)";
        parElem.style.borderLeft = "var(--dark-grey) 3px solid";
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
    liCompleted()
})

