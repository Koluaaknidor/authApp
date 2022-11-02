const posts = [
    {
        author: 'nika2',
        title: 'Sheep',
        content: 'I love sheep!'
    },
    {
        author: 'Nick',
        title: 'Mother',
        content: 'I love Jimmy`s mom'
    }
]

exports.getPosts = function(username) {
    const p = newInstance()
    if (username == null) {
        return p
    }
    return p.filter((post) => post.author ===  username)
}

function newInstance() { //need a database
    return JSON.parse(JSON.stringify(posts))
}