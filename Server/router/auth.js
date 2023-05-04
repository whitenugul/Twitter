import express from 'express';
// import * as tweetController from '../controller/tweet.js'
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js'
import * as authController from '../controller/auth.js'
import {isAuth} from '../middleware/auth.js'

const router = express.Router();
// const validate = (req, res, next) => {
//     const errors = validationResult(req); // error가 생길 경우 error값이 들어간다.
//     if (errors.isEmpty()){
//         return next(); // 에러가 없을 경우 다음으로 넘어간다.
//     }
//     return res.status(400).json({message: errors.array()})
// }
const validateCredential = [
    body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 4})
    .withMessage('아이디는 최소 4자 이상 입력해야 합니다.'),
    body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('비밀번호는 최소 4자 이상 입력하세요'),
    validate
]

const validateSignup = [
    ...validateCredential,
    body('name')
    .notEmpty()
    .withMessage('이름은 꼭 입력해야 합니다.'),
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('이메일 형식을 확인해 주세요'),
    body('url')
    .isURL()
    .withMessage('url을 입력하세요')
    .optional({nullable: true, checkFalsy: true}), 
    validate
    //checkFalsy: true false로 놓을 수 있는 값들을 모두 true, false로 구분
]

router.post('/signup', validateSignup, authController.signup)

router.post('/login', validateCredential, authController.login)

router.get('/me', isAuth, authController.me)

export default router