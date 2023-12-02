const User = require("../model/user");
const { handleErrors } = require("../middleware/errorHandler");
const { createToken } = require("../middleware/auth");
const register = async (req, res) => {
  try {
    await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await User.login(email, password);
    if (user) {
      const token = createToken(user._id);
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, token });
    }
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = {
  register,
  login,
};
