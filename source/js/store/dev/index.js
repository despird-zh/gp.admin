const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  module.exports = {
    logger: null,
  };
} else {
  module.exports =
  {
    logger: require('./logger-exports').default, // eslint-disable-line global-require
  };
}
