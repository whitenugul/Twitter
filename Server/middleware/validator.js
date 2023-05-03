import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req); // error가 생길 경우 error값이 들어간다.
    if (errors.isEmpty()){
        return next(); // 에러가 없을 경우 다음으로 넘어간다.
    }
    return res.status(400).json({message: errors.array()})
}