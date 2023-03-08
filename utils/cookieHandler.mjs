const options = {
    httpOnly: true,
    maxAge: process.env.TOKEN_EXPIRY,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'None'
}

function sendCookie(res, cookies, path) {
    for (const key in cookies) {
        res.cookie(key, cookies[key], { ...options, path: process.env.FRONTEND_URL + path })
    }
    return res
}

function clearCookie(res, key, path) {
    res.clearCookie(key, { ...options, path })
    return res
}

export {
    sendCookie,
    clearCookie
}
