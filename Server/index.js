// nodemon 설치: npm i nodemon --save-dev
import express from 'express'; //npm i express
import cors from 'cors'; //npm i cors
import morgan from 'morgan'; //npm i morgan
import tweetsRouter from './router/tweets.js'


const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); // 사용자들이 들어오면 log를 console에 찍어준다.


// 미들웨어 등록
app.use('/tweets', tweetsRouter);


app.use((req, res, next) => {
    res.sendStatus(404);
});


// 아예 error가 일어날 경우
app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500)
});


app.listen(8080)