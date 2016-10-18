/* Copyright (c) Trainline Limited, 2016. All rights reserved. See LICENSE.txt in the project root for license information. */
'use strict';

let assert = require('assert');
let getSlices = require('modules/queryHandlersUtil/getSlices');
let Environment = require('models/Environment');

const FILTER = getSlices.FILTER;
const QUERYING = getSlices.QUERYING;

module.exports = function GetActiveSlicesByUpstream(query) {
  assert.equal(typeof query.environmentName, 'string');
  assert.equal(typeof query.upstreamName, 'string');

  return Environment.getAccountNameForEnvironment(query.environmentName).then(account => {
    query.accountName = account;
    return getSlices.handleQuery(query,
      QUERYING.upstream.byUpstreamName(query),
      FILTER.upstream.byUpstreamName(query),
      FILTER.host.onlyActiveSlices());
  });
};
