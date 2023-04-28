import express from 'express';
import * as tweetController from '../controller/tweet.js'
const router = express.Router();

// API 생성
// 1. GET

// username으로 찾아보기
// /tweets?username=:username
router.get('/', tweetController.getTweets);

// id로 찾아보기
// /tweets/:id
router.get('/:id', tweetController.getTweetsById);

// 2. POST
// id: Date.now().toString()
router.post('/', tweetController.PostTweet);

// 3. PUT 수정
// text만 수정
router.put('/:id', tweetController.UpdateTweet);

// 4. DELETE
router.delete('/:id',tweetController.DeleteTweet);

// postman에서 collection으로 들어가 twitter라는 이름으로 생성한다.
// variable에서 반복될 url을 저장한다.
// base라는 이름으로 localhost:8080을 저장한다.
// Twitter 옆에 ...을 눌러서 Add request로 request를 생성한다.

export default router;