/* Copyright (c) Trainline Limited, 2016-2017. All rights reserved. See LICENSE.txt in the project root for license information. */

'use strict';

let Promise = require('bluebird');

function applyFuncToAccounts(fn, accounts) {
  function applyFnAndAssignAccountName({ AccountName, AccountNumber }) {
    return Promise.resolve({ AccountName, AccountNumber })
      .then(fn)
      .then((result = []) => result.map(item => (item !== null && typeof item === 'object'
        ? Object.assign(item, { AccountName })
        : item)));
  }
  return Promise.map(accounts, applyFnAndAssignAccountName)
    .then(results => [].concat(...results));
}

module.exports = applyFuncToAccounts;
