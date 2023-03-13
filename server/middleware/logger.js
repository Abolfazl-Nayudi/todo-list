const logger = (req, res, next) => {
  //   console.log("from logger");
  next();
};

module.exports = logger;
