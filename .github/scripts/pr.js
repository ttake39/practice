const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
    try {
        const args = require('minimist')(process.argv.slice(3));

        const token = args['github-token'];
        const featureBranch = args['feature-branch'];

        const octokit = github.getOctokit(token);

        const repoFull = args['repo'];
        const [owner, repo] = repoFull.split('/');

        await octokit.rest.pulls.update({
            owner,
            repo,
            pull_number,
            body: "test",
          });

        console.log('✅ GitHub Token:', token ? '[REDACTED]' : '❌ Not provided');
        console.log('📌 Feature Branch:', featureBranch);
        console.log('owner:', owner);
        console.log('repo:', repo);

    }catch(err){
        console.log(err.message);
    }
})();