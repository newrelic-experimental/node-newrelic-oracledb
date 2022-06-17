'use strict'

exports.initialize = function initialize(shim, oracledb) {
    shim.setDatastore("ORACLE")
    shim.__wrappedPoolConnection = false

    //A Connection object is obtained by a Pool class getConnection() or Oracledb class getConnection() call.
    //TODO: wrap getConnection calls to capture instance properties

    var proto = oracledb.Connection.prototype
    //close and release both call _close
    shim.recordOperation(proto, ['break', 'changePassword', '_close', 'commit', 'createLob', 'getSodaDatabase', 'ping', 'rollback', 'subscribe', 'unsubscribe'], {callback: shim.LAST})
    shim.recordQuery(proto, ['execute', 'executeMany', 'getStatementInfo'], describeQuery)
    shim.recordQuery(proto, ['queryStream'], describeStreamQuery)

    // there is no true batch query for oracledb. executeMany is a single query with many binds and hence can be dealt with the same as execute
    /*
    shim.recordBatchQuery(proto, 'executeMany', {
        query: findBatchQueryArg,
        callback: shim.LAST
    })
    */
}

function describeQuery(shim, func, name, args) {
    //shim.logger.trace('Recording query')
    //console.log("Recording query...")

    var query = ''
    if (shim.isString(args[0])) {
        query = args[0]
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
    var parameters = {host: null, port_path_or_id: null, database_name: null}
    var databaseName = queryable.__NR_databaseName || null
    //TODO

    //storeDatabaseName(shim, queryable, query)
    return parameters
}


function storeDatabaseName(shim, queryable, query) {
    if (queryable.__NR_storeDatabase) {
        var databaseName = shim.getDatabaseNameFromUseQuery(query)
        if (databaseName) {
            shim.setInternalProperty(queryable, '__NR_databaseName', databaseName)
        }
    }
}
