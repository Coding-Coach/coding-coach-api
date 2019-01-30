/* eslint-disable import/prefer-default-export */

export const handleSuccessfulLogin = (req, res) => {
  res.send(req.user);
};
