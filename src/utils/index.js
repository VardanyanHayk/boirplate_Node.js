export const response = (res, status, message, data) => {
  return res.status(status).json({ code: status, message, data });
};
