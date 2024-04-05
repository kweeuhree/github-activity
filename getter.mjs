

//fetch user
export const fetchUser = async () => {
    const baseUrl = `https://api.github.com/`;
    const userName = 'kweeuhree';
    const wordQuery = 'users/';
    const urlToFetch = `${baseUrl}${wordQuery}${userName}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse =  await response.json();
            console.log(jsonResponse);
            
        }
    } catch (error) {
        console.log(error);
    }
}
