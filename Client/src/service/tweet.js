export default class TweetService {

  // 네트워크를 통해 데이터 가져오기
  constructor(http){
    // 이미 http.js가 index.js에 등록이 되어 있기 때문에 따로 설정해줄 필요가 없다.
    this.http = http
  }

  async getTweets(username) {
    // fetch를 통해서 /tweets?username=:username 형식으로 데이터를 보내면 그것을 return 시켜준다.
    // fetch(`localhost:8080/tweets?username=${username}`)
    //   .then((res) => console.log(res))
    //   .then((data) => console.log(data))
    // return username
    //   ? this.tweets.filter((tweet) => tweet.username === username)
    //   : this.tweets;
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET'
    })
  }

  async postTweet(text) {
    // fetch를 통해 /tweets에 post로 입력한 데이터를 전송시킨다.
    // fetch('localhost:8080/tweets', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: Date.now(),
    //     createdAt: new Date(),
    //     name: 'apple',
    //     username: '김사과',
    //     text,
    //   }),
    // })
    // .then((res) => res.json())
    // .then((data) => console.log(data))
    return this.http.fetch('/tweets', {
      method: "POST",
      body : JSON.stringify({
        text,
        username: 'blue',
        name: 'blue',
      })
    })
  }

  async deleteTweet(tweetId) {
    // fetch(`localhost:8080/tweets/${tweetId}`, {
    //   method: "DELETE",
    // })
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE"
    })
  }

  async updateTweet(tweetId, text) {
    // fetch(`/tweets/${tweetId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     text:text,
    //   })
    // })
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    // if (!tweet) {
    //   throw new Error('tweet not found!');
    // }
    // tweet.text = text;
    // return tweet;
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({text})
    })
  }
}
