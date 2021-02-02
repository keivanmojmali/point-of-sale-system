//YOU NEED TO PROPERLY UPDATE THIS CLIENT ERROR PATH IN THE REQUIRE
const ClientError = require('client-error');

function errorMiddleware(err,req,res,next) {
  if(err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    res.status(500).json({
      error: 'an unexpected error occured'
    });
  }
}
module.exports = errorMiddleware;
