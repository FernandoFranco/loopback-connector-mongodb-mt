// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-connector-mongodb-mt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var semver = require('semver');
var should = require('./init');
var suite = require('loopback-datasource-juggler/test/persistence-hooks.suite.js');

var customConfig = {
  enableOptimisedfindOrCreate: false,
};

for (var i in global.config) {
  customConfig[i] = global.config[i];
}
var DB_VERSION = process.env.MONGODB_VERSION;

if (!DB_VERSION) {
  console.log(
    'The ENV variable MONGODB_VERSION is not set.' +
      ' Assuming MongoDB version 2.6 or newer.'
  );
}

var DB_HAS_2_6_FEATURES =
  !DB_VERSION || semver.satisfies(DB_VERSION, '>=2.6.0');

if (DB_HAS_2_6_FEATURES) {
  customConfig.enableOptimisedfindOrCreate = true;
}

suite(global.getDataSource(customConfig), should, {
  replaceOrCreateReportsNewInstance: DB_HAS_2_6_FEATURES,
});
