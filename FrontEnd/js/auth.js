//Main function
function main()
{
    //We get the form
    let form = document.getElementById('login');
    //we add an event listener on the form when it is submit
    form.addEventListener('submit', login)
}

async function login(e)
{
    //We prevent the refresh
    e.preventDefault();

    //We create a form data to get inputs
    const formData = await new FormData(e.target);

    //We check if email or password are empty
    if (isEmpty(formData.get('email')) || isEmpty(formData.get('psw')))
        //If yes we throw error
        throw Error('missing_field');

    //We structur data for api
    let data = {
        email: formData.get('email'),
        password: formData.get('psw')
    }
    //We send request
    let res = await _request("POST", "users/login", data);
    //We get token
    let token = res.token;

    //We store the token
    window.localStorage.setItem('Bearer', token)

    //Login is done we go back to home page
    window.location = "./";
}

// Utils: make a request
async function _request(method, url, data)
{
    //If url or method is empty
    //Return error
    if (!url)
        throw Error("missing_arg");

    //If method not a valid type
    // return error
    if (method !== "GET" && method !== "POST" && method !== "DELETE")
        throw Error("invalid_method_type");

    //Exec Request with headers
    var request = await fetch(`http://127.0.0.1:5678/api/${url}`, {
        method: method,
        mode: "cors",
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data),
    });
    //Translate Resquest to json
    var data = await request.json();
    
    //Return response
    return data;
}

//Function to know if arg is empty
function isEmpty(arg)
{
    return (
        arg === undefined ||
        arg === null ||
        (typeof arg === "object" && Object.keys(arg).length === 0) ||
        (typeof arg === "string" && arg.trim().length === 0)
    );
}

//We call the main function
main();