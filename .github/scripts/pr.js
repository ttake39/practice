const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
    try {
        const token = core.getInput('github-token');
        const featureBranch = core.getInput('feature-branch');

        // GitHubコンテキストからPR情報を取得
        const context = github.context;
        const prNumber = context.payload.pull_request?.number;
        const repo = context.repo.repo;
        const owner = context.repo.owner;

        console.log('✅ GitHub Token:', token ? '[REDACTED]' : '❌ Not provided');
        console.log('📌 Feature Branch:', featureBranch);
        console.log('🔍 PR Number:', prNumber);
        console.log('📦 Repo:', `${owner}/${repo}`);
    }catch(err){

    }
})();