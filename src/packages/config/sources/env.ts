// process.env.ENV = 'prod' is set via the heroku cli¶
export const isProd = process.env.ENV === 'prod';

// process.env.ENV = 'tests' is set via npm script "tests"
export const isTests = process.env.ENV === 'tests';

// process.env.debug=true is set manually by dev when running tests
export const isDebug = Boolean(process.env.debug) === true;
