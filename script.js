const Apikey=
'75e194804ab242d1acefa1bfe8950e63'

const blogcontainer=document.getElementById("blog-container")
const searchField=document.getElementById('search-input')
const searchButton=document.getElementById('search-button')


window.addEventListener("scroll", function() {
    var nav1 = document.querySelector(".nav");
    nav1.classList.toggle("active", window.scrollY > 0);

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        document.body.classList.add("navbar-sticky"); // Add this line
    } else {
        navbar.classList.remove("sticky");
        document.body.classList.remove("navbar-sticky"); // Add this line
    }
});



async function fetchRandomNews(){
    try {
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${Apikey}`
        const response=await fetch(apiUrl)
        const data=await response.json();
        return data.articles
    } catch (error) {
        console.error("Error in fetching RandomNews",error)
        return []
    }
}
searchField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the click event on the search button
        searchButton.click();
    }
});


searchButton.addEventListener("click",async ()=>{
    const query=searchField.value.trim()
    if(query!==""){
        try {
            const articles=await fetchNewsQuery(query)
            displayblog(articles)
        } catch (error) {
            console.log("Error in Fetching News By Query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=13&apiKey=${Apikey}`
        const response=await fetch(apiUrl)
        const data=await response.json();
        return data.articles
    } catch (error) {
        console.error("Error in fetching RandomNews",error)
        return []
    }
}

function displayblog(articles){
    blogcontainer.innerHTML=""
    // if (!articles || !Array.isArray(article) || article.length === 0) {
    //     console.error("Invalid or empty article data.");
    //     return;
    // }
    articles.forEach((article) => {
        const blogcard=document.createElement("div")
        blogcard.classList.add("blog-card")
        const img=document.createElement("img")
        img.src=article.urlToImage
        img.alt=article.title
        const title=document.createElement("h2")
        const truncatedTitle=article.title.length > 30? article.title.slice(0,30) + "....." : article.title;
        title.textContent=truncatedTitle;
        const description=document.createElement("p");
        const truncatedDes = article.description ? (article.description.length > 120 ? article.description.slice(0, 120) + "....." : article.description) : "";
        description.textContent=truncatedDes;
        // description.textContent=article.description;
        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
        blogcontainer.appendChild(blogcard);
    });


}


(async ()=>{
    try {
        const articles= await fetchRandomNews()
        displayblog(articles);
    } catch (error) {
        console.error("Error in fetching RandomNews",error)
        return []
    }
})();