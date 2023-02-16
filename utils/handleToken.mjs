import Jwt from 'jsonwebtoken';
import AppError from './appError.mjs';

const env = process.env

function createToken(data) {
    try {
        const token = Jwt.sign(
            data,
            env.JWT_SECRET,
            { algorithm: 'HS256', expiresIn: env.TOKEN_EXPIRY },
        )
        return token
    } catch (error) { throw new AppError(500, 'fail', 'Error creating token') }
}

function verifyToken(token) {
    try {
        const decoded = Jwt.verify(
            token,
            env.JWT_SECRET,
            { algorithms: ['HS256'], maxAge: env.TOKEN_EXPIRY },
        )
        return decoded
    } catch (error) { throw new AppError(500, 'fail', 'Session verification failed/expired') }
}

function refreshToken(decoded) {
    //* token will only be issued if the old token is within 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (decoded.exp - nowUnixSeconds > 30) {
        throw new AppError(400, 'fail', 'Refreshing session is denied')
    }

    return createToken(decoded.data)
}

export { createToken, verifyToken, refreshToken }