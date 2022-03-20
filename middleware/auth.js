
export const checkLoggedIn = (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).send('Not logged in.');
    }

    req.loggedInUser = req.session.username;
    next();
};