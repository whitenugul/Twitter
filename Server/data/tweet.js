let tweets = [
    {
        id:'1',
        text:'첫 트윗입니다.',
        createdAt: Date.now().toString(),
        name: 'Apple',
        username: '김사과',
        url: ''
    },
    {
        id:'2',
        text:'안녕하세요.',
        createdAt: Date.now().toString(),
        name: 'Banana',
        username: '반하나',
        url: ''
    }
];

export async function getAll() {
    return tweets
}

export async function getAllByUserName(username){
    return tweets.filter((tweet) => tweet.username === username)
}

export async function getById(id) {
    return tweets.find((tweet) => tweet.id === id)
}

export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    };
    tweets = [tweet, ...tweets]
    return tweets
}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return tweet
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id)
}