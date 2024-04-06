import { fetchUser } from './getter.mjs';

const kweeuhreeObj = fetchUser('kweeuhree');
// console.log(kweeuhreeObj);
const firstnamenikaObj = fetchUser('firstnamenika');

function showRepos(title) {
    // console.log(title, ' inside show repos');
    //toggle class of an element with id of title
    const thisElement = document.getElementById(`hidden-${title}`);
    console.log(thisElement, ' thisElelment inside showRepos'); 
    // const thisClass = thisElement.classList[0];
    let computedStyle = window.getComputedStyle(thisElement);

    if(computedStyle.display === 'none') {
        thisElement.style.display = 'flex';
    } else {
        thisElement.style.display = 'none';
    }

}

function addEventListenerTitle() {
    const titleList = document.getElementsByClassName('title');
    for (let title of titleList) {
        title.addEventListener('click', function(event) {
            if (event.target.classList.contains('title')) {
                // console.log(event.target.innerText, ' inside addEventListenerTitle');
                showRepos(event.target.innerText);
            }
        });
    }
}

function addEventListenerFindUser() {
    const myForm = document.forms['username-form'];
    myForm.addEventListener('submit', function (event) {
        handleUserInput(event);
    });
    myForm.reset();
}

function handleUserInput(e) {
    e.preventDefault();
    let input = document.querySelector('#user-name').value;
    input = input.trim();

    try {
        const user = fetchUser(input); 
        console.log(' i approved the input')
    } catch (error) {
        console.log('failed to hadle user input, input: ', input), ' ', error;
    }
}

addEventListenerTitle();
addEventListenerFindUser();