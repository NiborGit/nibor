/*** New Blockiapps AI lib. created by AI examples ***/

/**
 * Creates a component with a header, body, and footer, 
 * then appends it to a parent element.
 * 
 * @param {string} parentSelector - CSS selector for the container (e.g., '#container')
 * @param {object} content - Object containing text for each section
 */
function addComponent(parentSelector, content) {
  const parent = document.querySelector(parentSelector);
  
  if (!parent) return console.error('Parent element not found');

  // Create the main wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-component';
  wrapper.style.border = '1px solid #ccc';
  wrapper.style.margin = '10px 0';

  // Create and configure Header
  const header = document.createElement('header');
  header.style.background = '#f4f4f4';
  header.style.padding = '10px';
  header.textContent = content.header || 'Default Header';

  // Create and configure Body
  const body = document.createElement('div');
  body.className = 'component-body';
  body.style.padding = '15px';
  body.textContent = content.body || 'This is the body content.';

  // Create and configure Footer
  const footer = document.createElement('footer');
  footer.style.fontSize = '0.8rem';
  footer.style.padding = '10px';
  footer.style.borderTop = '1px solid #eee';
  footer.textContent = content.footer || 'Default Footer';

  // Assemble and append
  wrapper.append(header, body, footer);
  parent.appendChild(wrapper);
}

/* Usage Example:
addComponent('#app', {
  header: 'Account Settings',
  body: 'Update your profile information and preferences here.',
  footer: 'Last updated: Oct 2023'
}); */

/********** Get TEXT from URL ****************/
/**
 * Fetches the text content from a given URL.
 * 
 * @param {string} url - The external URL to fetch from.
 * @returns {Promise<string>} - A promise that resolves to the response text.
 */
async function getTextFromURL(url) {
  try {
    const response = await fetch(url);

    // Check if the request was successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Extract and return the text from the response body
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
/**** human created example: RLT *****/
async function getTextData(url){
try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);     
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }

}


/* --- Usage ---
const targetUrl = 'https://example.com';

getTextFromURL(targetUrl)
  .then(text => {
    console.log('Received text:', text);
  })
  .catch(err => {
    console.error('Failed to retrieve text:', err);
  }); */

/**** get JSON from URL *****/

/**
 * Fetches data from a URL and parses it as a JSON object.
 * 
 * @param {string} url - The external URL to fetch from.
 * @returns {Promise<object>} - A promise that resolves to the parsed JSON data.
 */
async function getJSONFromURL(url) {
  try {
    const response = await fetch(url);

    // Ensure the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response body as a JavaScript object
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/** --- Usage ---
const targetUrl = 'https://jsonplaceholder.typicode.com/posts/1';

getJSONFromURL(targetUrl)
  .then(data => {
    // 'data' is now a JavaScript object, not a string
    console.log('Object Title:', data.title);
  })
  .catch(err => {
    console.error('Failed to retrieve JSON:', err);
  }); **/

