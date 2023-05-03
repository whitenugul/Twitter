import express from 'express';
import * as tweetController from '../controller/tweet.js'
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js'

const router = express.Router();


// API 생성
// 1. GET

const validateTweet = [
    body('text')
    .trim()
    .isLength({min: 4})
    .withMessage('text는 최소 4자 이상 입력해주세요'),
    validate
]
// const validate = (req, res, next) => {
    // const errors = validationResult(req); // error가 생길 경우 error값이 들어간다.
    // if (errors.isEmpty()){
    //     return next(); // 에러가 없을 경우 다음으로 넘어간다.
    // }
    // return res.status(400).json({message: errors.array()})
// }

// username으로 찾아보기
// /tweets?username=:username
router.get('/', tweetController.getTweets);

// id로 찾아보기
// /tweets/:id
router.get('/:id', tweetController.getTweetsById);

// 2. POST
// id: Date.now().toString()
// text가 4자이하인경우 error처리
// router.post('/', [
//     body('text').trim().isLength({min:4}).withMessage('4글자 이상으로 입력하세요'),
//     validate
// ],
// tweetController.PostTweet);
router.post('/', validateTweet, tweetController.PostTweet)

// 3. PUT 수정
// text만 수정
// text가 4자이하인경우 error처리
router.put('/:id', [
    body('text').trim().isLength({min:4}).withMessage('4글자 이상으로 입력하세요'),
    validate
],
tweetController.UpdateTweet);

// 4. DELETE
router.delete('/:id',tweetController.DeleteTweet);

// postman에서 collection으로 들어가 twitter라는 이름으로 생성한다.
// variable에서 반복될 url을 저장한다.
// base라는 이름으로 localhost:8080을 저장한다.
// Twitter 옆에 ...을 눌러서 Add request로 request를 생성한다.

export default router;