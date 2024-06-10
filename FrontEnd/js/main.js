// Function main
async function main()
{
    checkAuth();
    works();
    await filters();
    console.log(window.localStorage.getItem('Bearer'))

    const btn = document.getElementsByClassName("category")
    for (let index = 0; index < btn.length; index++) {
        btn[index].addEventListener("click", handleFilters);
    }
}

// Utils: make a request
async function _request(method, url)
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
          "Authorization": `Bearer ${window.localStorage.getItem('Bearer')}` 
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

// Display works
async function works()
{
    //We get works
    const works = await _request("GET", "works");

    //We get the element gallery
    const gallery = document.getElementById("gallery");

    //We loop throught works
    works.forEach((work) => {
        //We create an element figure
        const figure = document.createElement('figure')
        //we give this element an id
        figure.id = work.id
        //We create an element img
        const img = document.createElement('img')
        //we give this ele a src
        img.src = work.imageUrl;
        //and an alt
        img.alt = work.title;
        //we create an element caption
        const figcap = document.createElement("figcaption")
        //we inner text inside of it
        figcap.innerText = work.title
    
        //we add img to figure
        figure.appendChild(img)
        //we add the caption to figure
        figure.appendChild(figcap);
    
        //we child the final figure with data to gallery
        gallery.appendChild(figure);
    })

}

//Displayer filter
async function filters()
{
    //We get works
    const cats = await _request("GET", "categories");

    //We get categories element
    const categories = document.getElementById('categories');

    //We loop throught works
    cats.forEach((cat) => {
        const p = document.createElement('p')
        p.className = "category"
        p.id = `cat_${cat.id}`;
        p.innerText = cat.name;

        categories.appendChild(p);
    });
}


//on click Filters
async function handleFilters(e)
{

    const category = e.target.id.split("_")[1];
    
    //We get current active
    const active = document.getElementsByClassName("active")[0];
    //We clear current active style
    active.className = "category";
    //We active the clicked element
    e.target.className = "category active"

    //We get works
    const works = await _request("GET", "works");

    //We get the element gallery
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    //We loop throught works
    works.forEach((work) => {
        //We create an element figure
        const figure = document.createElement('figure')
        //we give this element an id
        figure.id = work.id
        //We create an element img
        const img = document.createElement('img')
        //we give this ele a src
        img.src = work.imageUrl;
        //and an alt
        img.alt = work.title;
        //we create an element caption
        const figcap = document.createElement("figcaption")
        //we inner text inside of it
        figcap.innerText = work.title
    
        //we add img to figure
        figure.appendChild(img)
        //we add the caption to figure
        figure.appendChild(figcap);
    
        //we child the final figure with data to gallery
        //If category equals all we display all
        if (category === "all")
            gallery.appendChild(figure); 

        //overwise we just display the category id
        if (work.category.id.toString() === category)
            gallery.appendChild(figure);
    })
}


function checkAuth()
{
    //We get the login Button
    var log_btn = document.getElementById('log-btn')
    //We get editMode el
    var editMode = document.getElementById('edit-mode');
    //Spacer El
    var spacer = document.getElementById("spacer");
    //Edit btn el
    var edit = document.getElementById("edit");

    //We add an event on the button
    log_btn.addEventListener('click', async () => {
        //we check if we got a bearer
        if (!window.localStorage.getItem('Bearer'))
            //if not, when clickng, go to log page
            window.location = "./auth.html";
        else
        {
            //else, we romoe the Bearer
            window.localStorage.clear('Bearer');
            //and we replace the button
            log_btn.innerText = "Login";
            checkAuth();
        }
    });

    //We check if awe got a Bearer
    if (window.localStorage.getItem('Bearer'))
    {
        //Login Button
        //if yes we print Logout
        log_btn.innerText = "Logout"

        //Edit mode
        editMode.style.display = "flex";
        spacer.style.display = "block";
        edit.style.display = "flex";
        
        return;
    } 

    if (!window.localStorage.getItem('Bearer'))
        {
            //Login Button
            //if not we print Logout
            log_btn.innerText = "login"
    
            //Edit mode
            editMode.style.display = "none";
            spacer.style.display = "none";
            edit.style.display = "none";
            
            return;
        } 

}

// We call the main function
main();