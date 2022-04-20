import { Response } from "express";

const ResponseWrapper = (res: Response, data?: any, statusCode = 200, message = "요청을 성공적으로 실행했습니다.") => {
    res.status(statusCode).json({ statusCode, message, data });
}

export default ResponseWrapper;