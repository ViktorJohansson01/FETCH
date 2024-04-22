/**
 * @author Viktor Johansson
 * @description Function to create fetch request
 * @module data-access/fetch
 */
export default function createFetch() {
    return Object.freeze({
        makeFetch
    })

    /**
     * @function makeFetch
     * @param {Object} body Object with data
     * @param {Object} headers Object with headers
     * @param {String} method String with method GET, POST, PUT, DELETE
     * @param {String} path String with path to fetch
     * @returns {Promise} Promise with response
    */
    async function makeFetch({ body, headers, method, path }) {
        console.log('makeFetch', { body, headers, method, path });
        try {
            const response = await fetch(path, {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    ...headers && headers
                },
                method,
                ...body && { body: JSON.stringify(body) }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');

            if (contentType) {
                if (contentType.includes('application/json')) {
                    return await response.json();
                } else if (contentType.includes('text/plain')) {
                    return await response.text();
                } else {
                    return response;
                }
            } else {
                return response;
            }
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }
}