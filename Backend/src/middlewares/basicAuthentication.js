import basicAuth from 'basic-auth';

export function basicAuthenticationMiddleware(req, res, next) {
    try {
        const {
            headers: { authorization },
        } = req;
        if (!authorization) {
            return next();
        }
        const authUser = basicAuth(req);
        let username = process.env.USER_NAME;
        if (
            authUser &&
            authUser.name === username &&
            authUser.pass === process.env.PASSWORD
        ) {
            req.basicAuthenticated = true;
        }
        next();
    } catch (e) {
        return next();
    }
}
