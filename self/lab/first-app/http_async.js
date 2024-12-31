import axios from 'axios'; // Syntax: Follows ES module syntax. Ideal for modern JavaScript projects.  It is now supported natively in Node.js starting with version 13.2.0 and later.

// const axiosRequest = require('axios'); // Syntax: old way

export async function getActivity() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        return response.data;
        console.log(`You could ${response.data.title}`);        
    } catch (error) {
        // console.error('Errored with message:', error.message);
        // Make sure we're actually throwing the error, not just logging
        throw error;
    }
}

// getActivity();