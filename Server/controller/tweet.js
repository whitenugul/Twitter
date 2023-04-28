import * as tweetRepository from '../data/tweet.js'

// API 생성
// 1. GET

// username으로 찾아보기
// /tweets?username=:username
export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUserName(username)
        : tweetRepository.getAll()); // tweets 내에서 입력받은 username과 같은 것들만 fileter를 하여 data에다 저장을 해준다.
    res.status(200).json(data);
}

export async function getTweetsById(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(400).json({message: `Tweet id(${id}) not found`})
    }
}

export async function PostTweet(req, res, next) {
    const { text, name, username } = req.body
    const tweet = await tweetRepository.create(text, name, username)
    res.status(201).json(tweet);
}

export async function UpdateTweet(req, res, next) {
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepository.update(id, text)
    if (tweet) {
        res.status(200).json(tweet);
    }else{
        res.status(400).json({message: `Tweet id(${id}) not found`})
    }
}

export async function DeleteTweet(req, res, next) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}