// import axios from 'axios';

export async function createGist(content) {
    const apiUrl = 'https://api.github.com/gists';

    const gistData = {
        description: 'My Gist',
        public: true,
        files: {
            'snippet.txt': {
                content: content
            }
        }
    };

    try {
        const response = await axios.post(apiUrl, gistData, {
            headers: {
                'Content-Type': 'application/javascript'
            }
        });

        if (response.status === 201) {
            return response.data.html_url;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error creating Gist:', error);
        return null;
    }
}
