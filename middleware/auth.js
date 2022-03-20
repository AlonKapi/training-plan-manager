
export const checkLoggedIn = (req, res, next) => {
    if (!req.session.email) {
        return res.status(401).send('Not logged in.');
    }

    req.loggedInUser = req.session.email;
    next();
};