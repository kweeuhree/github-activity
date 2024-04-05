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

addEventListenerTitle();