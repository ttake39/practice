const core = require('@actions/core');
const github = require('@actions/github');

/**
 * script entry point (main処理)
 * @param {object} args - CLI引数をパースしたオブジェクト
 * @returns {Promise<void>}
 */
async function main(args){

    try{
        console.info(`INFO: [Starg] Main`);
        const token = args['github-token'];
    } catch(err) {
        console.error(`ERROR: ${err.message}`);
    } finally {
        console.info(`INFO: [End] Main`);
    }
}

module.exports = { main };