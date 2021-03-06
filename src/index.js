#!/usr/bin/env node

const calculy = require('calculy');
const repl = require('repl');
const { version } = require('../package.json');

const RED = '\x1b[31m';
const DEFAULT = '\x1b[0m';

let ans = 0;

if (process.argv.includes('-v')) {
  console.log(version);
  process.exit(0);
}

repl.start({
  eval: evaluate,
});

function evaluate(code, _, __, callback) {
  try {
    handleResult(code, callback);
  } catch (error) {
    handleError(error, callback);
  }
}

function handleResult(code, callback) {
  const result = calculy.calculate(code, { constants: { ans } });

  ans = result;

  callback(null, result);
}

function handleError(error, callback) {
  if (error.name !== 'SyntaxError') {
    callback(error);
    return;
  }

  logError(error.message.replace('SyntaxError: ', ''));
  callback();
}

function logError(message) {
  console.error(RED + message + DEFAULT);
}
