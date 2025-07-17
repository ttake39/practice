const core = require('@actions/core');
const github = require('@actions/github');

/**
 * script entry point (main処理)
 * @param {object} args - CLI引数をパースしたオブジェクト
 * @returns {Promise<void>}
 */
async function main(args){

    const token = args['github-token'];
    
}

module.exports = { main };