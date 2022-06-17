function instrumentOracleDB(shim, oracledb, moduleName) {
    shim.setDatastore("ORACLE")

    shim.recordOperation(oracledb, 'getConnection', {callback: shim.LAST});

    var proto = oracledb.Connection.prototype
    //close and release both call _close
    shim.recordOperation(proto, ['break', 'changePassword', '_close', 'commit', 'createLob', 'getSodaDatabase', 'ping', 'rollback', 'subscribe', 'unsubscribe'], {callback: shim.LAST})
    shim.recordQuery(proto, ['execute', 'executeMany', 'getStatementInfo', 'queryStream'], {query: shim.FIRST, callback: shim.LAST})
    shim.recordBatchQuery(proto, 'batch', {
        query: findBatchQueryArg,
        callback: shim.LAST
    })
}

function findBatchQueryArg(shim, batch, fnName, args) {
    var sql = (args[0] && args[0][0]) || ''
    return sql.query || sql
}

exports = module.exports = {
    instrumentOracleDB: instrumentOracleDB
};