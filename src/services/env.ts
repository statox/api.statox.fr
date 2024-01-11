// process.env.ENV = 'prod' is set via the heroku cli¶
export const isProd = process.env.ENV === 'prod';

// process.env.ENV = 'tests' is set via npm script "tests"
export const isTests = process.env.ENV === 'tests';
