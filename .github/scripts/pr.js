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

        // Body 作成
        const newBody = upsertPreviewPath(pr.body,featureBranch);

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

/**
 * 
 * @param {*} body 
 * @param {*} newPath 
 */
function upsertPreviewPath(body, newPath){
    const makerStart = '<!-- PREVIEW_S3_PATH_START -->';
    const makerEnd = '<!-- PREVIEW_S3_PATH_END -->';
    const newBlock = `${makerStart}\n${newBlock}\n${makerEnd}`;

    if(body.include(makerStart) && body.include(makerEnd)){

        // StartとEndに囲まれていたら更新
        return body.replase(
            new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, 'm'),
            newBlock
        );
    }else{
        return `${makerStart}\n${newPath}\n${makerEnd}`
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