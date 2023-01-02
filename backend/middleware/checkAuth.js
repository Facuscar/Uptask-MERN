const checkAuth = (req, res, next) => {
    console.log('first');
    next();
}

export default checkAuth;