
export const checkLoggedIn = (req, res, next) => {
    if (req.session.username) {
        next();
    }

    return res.status(401).send('Not logged in.');
};