const handleErrors = (err) => {
  let errs = {};

  // handling err from login
  if (err.message === "Incorrect password or email ") {
    return "Incorrect password or email";
  }
  if (err.message === "Incorrect password or email") {
    return "Incorrect password or email";
  }

  if (err.code === 11000 && err.keyPattern.name) {
    errs = "Name is not available";
  } else if (err.code === 11000 && err.keyPattern.email) {
    errs = "Email already exist";
    return errs;
  } else if (err.error === "ENOTFOUND") {
    errs = "Connection lost";
  }
  return errs;
};

module.exports = { handleErrors };
