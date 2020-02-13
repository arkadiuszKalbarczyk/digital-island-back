const requestContext = require('request-context');

export const contextMiddleware = requestContext.middleware('request');
