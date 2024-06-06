// Function main
async function main()
{
    works();
    filters();
}

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
        method: method
    });
    //Translate Resquest to json
    var data = await request.json();
    
    //Return response
    return data;
}

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
        p.id = cat.id;
        p.innerText = cat.name;

        categories.appendChild(p);
    });
}

// We call the main function
main();