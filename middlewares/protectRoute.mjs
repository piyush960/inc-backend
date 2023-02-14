import { promisify } from 'util';
import { verifyToken } from '../utils/index.js';

async function protectRoute(req, res, next) {
  try {
    const token = req.signedCookies.admin
    if (!token) {
      return next(new AppError(
        401,
        'fail',
        'You are not logged in! Please login in to continue',
      ),
        req, res, next,
      )
    }

    const decode = await promisify(verifyToken)(token)

    const user = await User.findById(decode.data)

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export default protectRoute;