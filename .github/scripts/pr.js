(async () => {
    try {
        const args = require('minimist')(process.argv.slice(2));

        const token = args['github-token'];
        const featureBranch = args['feature-branch'];

        console.log('✅ GitHub Token:', token ? '[REDACTED]' : '❌ Not provided');
        console.log('📌 Feature Branch:', featureBranch);

    }catch(err){
        console.log(err.message);
    }
})();