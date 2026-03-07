const auth = async (req, res, next) => {
    console.log('The auth middleware');
    next();
}

module.exports = auth;