const CONTRIBUTION_METADATA = require('./src/ContributionMetadata');

module.exports.getContributionMetadata = (link) => {
    let contributionMetadata = new CONTRIBUTION_METADATA(link);
    return contributionMetadata.getMetadata();
}
