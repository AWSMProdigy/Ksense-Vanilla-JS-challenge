//Using async and await so that the page can continue to load as I am gathering this information

async function displayData(){
    const data = await getData();
    // Create element for every user gathered and append them to my user row
    data[0].forEach(user => {
        var entry = document.createElement("button");
        entry.className = "entry";
        var content = document.createTextNode(user.name);
        entry.onclick = function(){
            organizeData([user, data[1]]);
        };
        entry.appendChild(content);
        document.getElementById("userRow").appendChild(entry);
    })
}
async function getData(){
    // Fetch users and posts, return both as an array
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersJson = await users.json();
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsJson = await posts.json();
    return [usersJson, postsJson];
}

function organizeData(data){
    // Create posts property on desired user, and use filter on array of all posts to find all posts made by user and insert value into user object
    data[0].posts = data[1].filter(function (post) {
        if(post.userId ===  data[0].id){
            return true;
        }
        return false;
    })
    // With posts found, make a html element for eveyr post and append
    document.getElementById("postCol").innerHTML = '';
    data[0].posts.forEach(post =>{
        var entry = document.createElement("div");
        var title = document.createElement("h1");
        title.innerHTML = post.title;
        entry.appendChild(title);
        var postText = document.createElement("p");
        postText.innerHTML = post.body;
        entry.appendChild(postText);
        document.getElementById("postCol").appendChild(entry);
    })    
}

displayData();
