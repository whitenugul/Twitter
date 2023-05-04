import jwt from 'jsonwebtoken'
import * as userRepository from '../data/auth.js'

const AUTH_ERROR = {message: '인증에러'}

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    // console.log(authHeader)
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR)
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        'E5!87O2bPUp5Hj9P$2S@KsPk1IVh#Lbj',
        async (error, decoded) => {// secretkey를 가지고 decoding을 하는데 결과가 나오면 decoded로 이동하고 안나올 경우 error로 이동하게 된다.
            if(error){
                return res.status(401).json({message: "에러 발생"})
            }
            console.log(decoded.id)
            const user = await userRepository.findById(decoded.id);
            console.log(user)
            if(!user){
                return res.status(401).json({message: "유저가 없습니다."})
            }
            req.userId = user.id
            next() //router/auth.js로 이동하여 /me 뒤에다 들어가게 된다.
        }
    )
}