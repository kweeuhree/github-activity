const getRepos = async (reposUrl) => {
    try {
        const response = await fetch(reposUrl);
        if (response.ok) {
            const urlArray = await response.json();
            // console.log(urlArray);
            for(let obj of urlArray) {
                // console.log(obj);
                addRepoItem(obj);  
            }
        }
    } catch (error) {
        console.log('error message inside getRepos ', error);
    }
}

const addRepoItem = (obj) => {
    const thisSection = document.getElementById(`section-${obj.owner.login}`);
    // console.log(obj.owner.login, ' login');
    const template = document.getElementById(`template-${obj.owner.login}`);
    const repo = template.content.cloneNode(true);
    
    repo.querySelector('li a').innerHTML = obj.name;

    repo.querySelector('li a').setAttribute('href', obj.html_url);
    // test if theres time------------------------------------------
    //const htmlUrl = obj.deployments_url;
    //onclick open an overlay with the website and some basic info about it
    //repo.querySelector('li a').addEventListener('click', function () => {
        //showOverlay(this.htmlUrl);})
    //---------------------------------------------------------------

    // console.log(obj.name);

    thisSection.appendChild(repo);
}

const displayUserInfo = (userName, numOfPublicRepos, blog, updatedAt) => {
    // const thisSection = document.querySelector
    console.log(numOfPublicRepos, 'inside display userInfo');
}

const daysSinceRegister = (createdAt) => {
    console.log(createdAt);
}
//fetch user
const fetchUser = async (userName) => {
    const baseUrl = `https://api.github.com/`;
    // const userName = 'kweeuhree';
    const wordQuery = 'users/';
    const urlToFetch = `${baseUrl}${wordQuery}${userName}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse =  await response.json();
            // console.log(jsonResponse);
            const reposUrl = jsonResponse.repos_url;
            // console.log(reposUrl, ' reposUrl');

            const numOfPublicRepos = jsonResponse.public_repos;
            const blog = jsonResponse.blog;

            const createdAt = jsonResponse.created_at;
            const updatedAt = jsonResponse.updated_at;

            getRepos(reposUrl);
            displayUserInfo(userName, numOfPublicRepos, blog, updatedAt);
            daysSinceRegister(createdAt);
        }
    } catch (error) {
        console.log(error);
    }
}



export { fetchUser };