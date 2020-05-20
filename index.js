const CONTRIBUTION_METADATA = require('./src/ContributionMetadata');

module.exports.getContributionMetadata = (link) => {
    let contributionMetadata = new CONTRIBUTION_METADATA();
    return contributionMetadata.getMetadata(link);
}
