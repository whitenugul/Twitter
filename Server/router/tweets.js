import express from 'express';


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
const router = express.Router();

// API 생성
// 1. GET

// username으로 찾아보기
// /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets; // tweets 내에서 입력받은 username과 같은 것들만 fileter를 하여 data에다 저장을 해준다.
    res.status(200).json(data);
});

// id로 찾아보기
// /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(400).json({message: `Tweet id(${id}) not found`})
    }
});

// 2. POST
// id: Date.now().toString()
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets]
    res.status(201).json(tweet);
})

// 3. PUT 수정
// text만 수정
router.put('/:id', (req, res, next) => {
    // const id = req.params.id;
    // const tweet = tweets.find((tweet) => tweet.id === id)
    // if (tweet) {
    //     tweet.text = req.body.text
    //     res.status(200).json(tweet)
    // }else{
    //     res.status(400).json({message: `Tweet id(${id}) not found`})
    // }
    const id = req.params.id
    const text = req.body.text
    const tweet = tweets.find((tweet) => tweet.id === id)
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    }else{
        res.status(400).json({message: `Tweet id(${id}) not found`})
    }
})

// 4. DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweets = tweets.filter((tweet) => tweet.id !== id)
    res.sendStatus(204);
});

// postman에서 collection으로 들어가 twitter라는 이름으로 생성한다.
// variable에서 반복될 url을 저장한다.
// base라는 이름으로 localhost:8080을 저장한다.
// Twitter 옆에 ...을 눌러서 Add request로 request를 생성한다.

export default router;