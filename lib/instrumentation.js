'use strict'

exports.initialize = function initialize(shim, oracledb) {
    shim.logger.trace('NRLabs Oracle Instrumentation: Recording initialize')
    console.log("NRLabs Oracle Instrumentation: Recording initialize...")

    shim.setDatastore("ORACLE")
    shim.__wrappedPoolConnection = false

    //A Connection object is obtained by a Pool class getConnection() or Oracledb class getConnection() call.
    //TODO: wrap getConnection calls to capture instance properties

    var proto = oracledb.Connection.prototype
    //close and release both call _close
    shim.recordOperation(proto, ['break', 'changePassword', 'close', 'commit', 'createLob', 'getSodaDatabase', 'ping', 'rollback', 'subscribe', 'unsubscribe'], {callback: shim.LAST})
    shim.recordQuery(proto, ['execute', 'executeMany', 'getStatementInfo'], describeQuery)
    // shim.recordQuery(proto, ['queryStream'], describeStreamQuery)

    // there is no true batch query for oracledb. executeMany is a single query with many binds and hence can be dealt with the same as execute
    /*
    shim.recordBatchQuery(proto, 'executeMany', {
        query: findBatchQueryArg,
        callback: shim.LAST
    })
    */
    shim.logger.trace('NRLabs Oracle Instrumentation: Completed initialize')
    console.log("NRLabs Oracle Instrumentation: Completed initialize...")
}

function describeQuery(shim, func, name, args) {
    shim.logger.trace('NRLabs Oracle Instrumentation: Starting to record query for ' + name)
    console.log("NRLabs Oracle Instrumentation: Starting to record query for " + name)

    var query = ''
    if (shim.isString(args[0])) {
        query = args[0]
        shim.logger.trace('NRLabs Oracle Instrumentation: NRLabs Oracle Instrumentation: Recording query for ' + name)
        console.log("NRLabs Oracle Instrumentation: Recording query for " + name)
    }

    // Pull out instance attributes.
    var parameters = getInstanceParameters(shim, this, query)

    var promise = false
    var callback = shim.LAST
    var callbackFn = args[args.length]
    if (callbackFn && typeof(callbackFn) == "function") {
        promise = false
    } else {
        promise = true
    }
    shim.logger.trace('NRLabs Oracle Instrumentation: Completing record query for ' + name)
    console.log("NRLabs Oracle Instrumentation: Completing record query for " + name)

    return {
        stream: false,
        query: query,
        callback: callback,
        promise: promise,
        parameters: parameters,
        record: true
    }
}

function describeStreamQuery(shim, func, name, args) {
    var parameters = getInstanceParameters(shim, this, args[0])
    return {
        stream: true,
        query: args[0],
        parameters: parameters,
        record: true
    }
}

/*
function findBatchQueryArg(shim, batch, fnName, args) {
    var sql = (args[0] && args[0][0]) || ''
    return sql.query || sql
}
*/

function getInstanceParameters(shim, queryable, query) {
    var cached_parameters = queryable._pool.__NR_db_parameters ||  null
    if (cached_parameters) {
        return cached_parameters
    }

    shim.logger.trace('NRLabs Oracle Instrumentation: Evaluating instance parameters ')
    var nrparameters = {host: null, port_path_or_id: null, database_name: null}
    var nrPool = queryable._pool
    if (nrPool) {
        var nrconnectString = nrPool.connectString
        if (nrconnectString) {
            var host = extractHost(nrconnectString)
            var port = extractPort(nrconnectString)
            var sid = extractSid(nrconnectString)
            nrparameters = {host: host, port_path_or_id: port, database_name: sid}
            if (nrparameters) {
                shim.setInternalProperty(nrPool, '__NR_db_parameters', nrparameters)
            }
        }
    }
    return nrparameters
}


function storeDatabaseName(shim, queryable, query) {
    if (queryable.__NR_storeDatabase) {
        var databaseName = shim.getDatabaseNameFromUseQuery(query)
        if (databaseName) {
            shim.setInternalProperty(queryable, '__NR_databaseName', databaseName)
        }
    }
}

function extractHost(connectString) {
    let rx = /\(HOST\s*=\s*(.*?)\s*\)/gm;
    let arr = rx.exec(connectString);
    return arr[1] || null;
}

function extractPort(connectString) {
    let rx = /\(PORT\s*=\s*(.*?)\s*\)/gm;
    let arr = rx.exec(connectString);
    return arr[1];
}

function extractSid(connectString) {
    let rx = /\(SID\s*=\s*(.*?)\s*\)/gm;
    let arr = rx.exec(connectString);
    return arr[1];
}