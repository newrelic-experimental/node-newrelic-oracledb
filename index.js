'use strict'

/**
 * Allows users to `require('@newrelic/oracledb')` directly in their app.
 */
const newrelic = require('newrelic')
const instrumentation = require('./lib/instrumentation')

newrelic.instrumentDatastore('oracledb', instrumentation.initialize)

newrelic.instrumentDatastore({
    moduleName: 'oracledb',
    onRequire: instrumentation.initialize,
    onError: function myErrorHandler(err) {
        console.error(err.message, err.stack)
        //process.exit(-1)
    }
})