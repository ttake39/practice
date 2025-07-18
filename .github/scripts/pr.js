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
        const repo = args['repo'];
        const prNumber = args['pr-number'];
        const featureBranch = args['feature-branch'];
        const [owner,repoName] = repo.split('/');

        console.info(`token:${token}`);
        console.info(`repo:${owner}`);
        console.info(`repo:${repoName}`);
        console.info(`PR Number:${prNumber}`);
        console.info(`feature Branch:${featureBranch}`);

        // octkit 初期化
        const octokit = github.getOctokit(token);

        // PR情報取得
        const { data: pr } = await octokit.rest.pulls.get({
            owner,
            repo: repoName,
            pull_number: parseInt(prNumber,10)
        });

        const newMessage = "Message test";
        const newBody = `${newMessage}\n\n${pr.body || ''}`;

        await octokit.rest.pulls.update({
            owner,
            repo: repoName,
            pull_number: parseInt(prNumber,10),
            body: newBody
        });
    } catch(err) {
        console.error(`ERROR: ${err.message}`);
    } finally {
        console.info(`INFO: [End] Main`);
    }
}
// CLIから
if (require.main === module) {
    const minimist = require('minimist');
    const args = minimist(process.argv.slice(2));
    main(args);
  }

// 外部から
module.exports = { main };