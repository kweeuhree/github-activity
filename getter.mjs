//export fetch user
export const fetchUser = async (userName) => { // require username
    const baseUrl = `https://api.github.com/`; // get base api url
    const wordQuery = 'users/'; //query for getting users
    const urlToFetch = `${baseUrl}${wordQuery}${userName}`; //query to find a specific user
    
    try {
        const response = await fetch(urlToFetch); //await response
        if (response.ok) { //if response is ok
            const jsonResponse =  await response.json(); // convert reponse to json
            // console.log(jsonResponse);
            const reposUrl = jsonResponse.repos_url; //get url for all repos
            // console.log(reposUrl, ' reposUrl');

            const numOfPublicRepos = jsonResponse.public_repos; //get number of public repos
            const blog = jsonResponse.blog; // get blog

            // get dates account was created and last updated
            const createdAt = jsonResponse.created_at; 
            const updatedAt = jsonResponse.updated_at; 

            getRepos(reposUrl); // populate repos by passing repos url into getRepos
            //display all additional info
             displayUserInfo(userName, numOfPublicRepos, blog, updatedAt, createdAt);
        }
    } catch (error) {
        console.log(error);//catch errors
    }
}

function handleRepos(urlArray) {
    for(let obj of urlArray) { // loop through all repositories
        // console.log(obj);
        addRepoItem(obj);  // pass each repo object into addRepoItem
    }
}

//populate user repositories
const addRepoItem = (obj) => { // require repo object
    let template; // initialize template variable 
    console.log(obj);

    // if kweeuhree of firstnamenika use relevant template
    if(obj.owner.login === 'kweeuhree' || obj.owner.login === 'firstnamenika') {
        template = document.getElementById(`template-${obj.owner.login}`);
    } else { // otherwise use #template-repos template 
        template = document.getElementById(`template-repos`);
    }
    console.log(template, 'template');
    
    // get ul container
    const ul = template.querySelector('.template-ul');
    // console.log(ul, ' ul')

    // create a new <li> element
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', obj.html_url);
    anchor.setAttribute('target', '_blank');
    anchor.innerHTML = obj.name;
    li.appendChild(anchor);
    // set the innerHTML and href attributes
    // li.innerHTML = `<a href="${obj.html_url}" target="_blank">${obj.name}</a>`;
    console.log(li.innerHTML, ', li inner html')
    // append new <li> 
    ul.appendChild(li);
}

const getRepos = async (reposUrl) => {
    try {
        const response = await fetch(reposUrl);
        if (response.ok) {
            const urlArray = await response.json();
            urlArray.length === 0 ? noRepos() : handleRepos(urlArray);
        }
    } catch (error) {
        console.log('error message inside getRepos ', error);
    }
}

const noRepos = () => {
    const repocontainer = document.querySelector('.repo-container');
    repocontainer.innerHTML = 'No public repositories yet!';
}

const displayUserInfo = (userName, numOfPublicRepos, blog, updatedAt, createdAt) => {
    let thisSection;
    console.log(userName);
    if(userName === 'kweeuhree' || userName === 'firstnamenika') {
        thisSection = document.getElementById(`user-info-${userName}`);
    } else {
        thisSection = document.querySelector(`.user-info-container`);
    }
    // console.log(thisSection);

    const days = daysSinceRegister(createdAt);
    const toDisplayDays = thisSection.querySelector('.existed-for');
    toDisplayDays.innerHTML = days;

    const toDisplayNumRepos = thisSection.querySelector(".num-of-public-repos")
    toDisplayNumRepos.innerHTML = numOfPublicRepos;

    if(blog) {
        const toDisplayBlog = thisSection.querySelector('.blog');
        toDisplayBlog.innerHTML = blog;
        console.log(blog, ' blog inside if statement inside displayUserInfo');
    }

    const toDisplayUpdated = thisSection.querySelector('.updated-at');
    toDisplayUpdated.innerHTML = updatedAt;
    console.log(updatedAt, ' updated at')

}

const daysSinceRegister = (createdAt) => {
    console.log(createdAt);
    const today = new Date();
    const dateCreated = new Date(createdAt);

    const mllsExisted = today.getTime() - dateCreated.getTime();
    const daysExisted = Math.floor(mllsExisted / 86400000) // divide mlsecods to get days
    return daysExisted;
}

//test---------------------------------------------------------------------


// old addRepoItem func <---------------------------------------------------

// const addRepoItem = (obj) => {
//     // let thisSection;
//     let template; 
//     console.log(obj);
//     if(obj.owner.login === 'kweeuhree' || obj.owner.login === 'firstnamenika') {
//         // thisSection = document.getElementById(`section-${obj.owner.login}`);
//         template = document.getElementById(`template-${obj.owner.login}`);
//     } else {
//         // thisSection = document.querySelector(`.repo-container`);
//         template = document.getElementById(`template-repos`);
//     }
//     console.log(template);
//     const repo = template.content.cloneNode(true);
//     const ul = repo.querySelector('ul');
//     console.log(ul, ' ul')
//     repo.querySelector('li a').innerHTML = obj.name;
//     repo.querySelector('li a').setAttribute('href', obj.html_url);

    // test if theres time------------------------------------------
    //const htmlUrl = obj.deployments_url;
    //onclick open an overlay with the website and some basic info about it
    //repo.querySelector('li a').addEventListener('click', function () => {
        //showOverlay(this.htmlUrl);})
//     //---------------------------------------------------------------

//     // console.log(obj.name);

//     ul.appendChild(repo)
//     // thisSection.appendChild(repo);
// }
