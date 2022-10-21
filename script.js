//Using async and await so that the page can continue to load as I am gathering this information

async function displayData(){
    const data = await getData();
    data[0].forEach(user => {
        console.log(user);
        var entry = document.createElement("button");
        entry.className = "entry";
        var content = document.createTextNode(user.name);
        entry.onclick = function(){
            organizeData([user, data[1]]);
        };
        entry.appendChild(content);
        document.getElementById("userCol").appendChild(entry);
    })
}
async function getData(){
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersJson = await users.json();
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsJson = await posts.json();
    return [usersJson, postsJson];
}

function organizeData(data){
    data[0].posts = data[1].filter(function (post) {
        if(post.userId ===  data[0].id){
            return true;
        }
        return false;
    })
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
