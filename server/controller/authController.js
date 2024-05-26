const logout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ success: true, message: 'Logged out successfully!' });
};

module.exports = { logout };
