const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    // alert("please log in")
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
