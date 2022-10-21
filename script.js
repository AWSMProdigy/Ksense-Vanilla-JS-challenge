//Using async and await so that the page can continue to load as I am gathering this information

async function displayData(){
    const data = await getData();
    console.log(data);
    const filteredData = organizeData(data);
    console.log(filteredData);
}
async function getData(){
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersJson = await users.json();
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsJson = await posts.json();
    return [usersJson, postsJson];
}

function organizeData(data){
    data[0].foreach(user => {
        user.posts = data[1].filter(function (post) {
            if(post.userId ===  user.id){
                return true;
            }
            return false;
        })
    })
}

(async () => {
    console.log(await displayData())
})()
