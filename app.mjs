import { fetchUser } from './getter.mjs'; // import fetchUser from getter module
import { createGist } from './poster.mjs';

const kweeuhreeObj = fetchUser('kweeuhree'); //get kweeuhree object
// console.log(kweeuhreeObj);
const firstnamenikaObj = fetchUser('firstnamenika'); // get firstnamenika object
// console.log(firstnamenikaObj);

// listen to form submit
function addEventListenerFindUser() {
    const myForm = document.forms['username-form']; //get the form
    myForm.addEventListener('submit', function (event) {
        handleUserInput(event); //pass event to handle user input
        myForm.reset(); //reset form input value
    });
    
}

// Handle user input
const handleUserInput = async (e) => {
    e.preventDefault(); // prevent default form behavior
    let input = document.querySelector('#user-name').value; //get user input
    input = input.trim(); //trim whitespace

    try {
        const user = await fetchUser(input); // get user object
        console.log(' i approved the input')
        console.log(user, ' user inside handleUserInput')
    } catch (error) {
        console.log('failed to handle user input, input: ', input, ' ', error);
    }
}
//--------------------------------------------------------------------
//function showRepos, is supposed to toggle hidden div to display flex;
// doesnt work, needs testing
// function showRepos(title) {
//     // console.log(title, ' inside show repos');
//     //toggle class of an element with id of title
//     const thisElement = document.getElementById(`hidden-${title}`);
//     console.log(thisElement, ' thisElelment inside showRepos'); 
//     // const thisClass = thisElement.classList[0];
//     let computedStyle = window.getComputedStyle(thisElement);

//     if(computedStyle.display === 'none') {
//         thisElement.style.display = 'flex';
//     } else {
//         thisElement.style.display = 'none';
//     }

// }

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
//----------------------------------------------------------------------

// add event listeners
addEventListenerTitle();
addEventListenerFindUser();


document.getElementById('gist-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const content = document.getElementById('gist-content').value.trim();

    if (content === '') {
        alert('Please enter some code');
        return;
    }

    const gistUrl = await createGist(content);

    if (gistUrl) {
        document.getElementById('gist-url').innerHTML = `<a href="${gistUrl}" target="_blank">${gistUrl}</a>`;
        console.log(gistUrl, 'gistUrl after creating');
    } else {
        alert('Failed to create Gist');
    }
});