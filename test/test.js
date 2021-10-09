const expect = require('chai').expect;

require('dotenv').config({ path: "./.env" });
const ContributionMetadata = require('../src/ContributionMetadata');

describe('ContributionMetadata Class', () => {
    let contributionMetadata;

    describe('getMetadata()', () => {
        let metadata;

        before(async () => {
            contributionMetadata = new ContributionMetadata();

            await contributionMetadata.init(process.env.CONTRIB_LINK);
            metadata = contributionMetadata.getMetadata();
            console.log(metadata);
        });

        for (const reqAttr of ["points", 'level', 'reviews', 'ratings', 'questions', 'placesAdded', 'edits', 'facts', 'videos', 'qa', 'roadsAdded', 'listsPublished']) {
            it('metadata should have attribute ' + reqAttr, async () => {
                expect(metadata[reqAttr]).to.not.be.null;
                expect(metadata[reqAttr]).to.be.a('string');
                let parseIntAttr = parseInt(metadata[reqAttr]);
                expect(parseIntAttr).to.be.a('number');
                expect(parseIntAttr >= 0).to.equal(true);
            })
        }
    });
});
