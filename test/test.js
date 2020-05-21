const expect = require('chai').expect;

require('dotenv').config();
const ContributionMetadata = require('../src/ContributionMetadata');

describe('ContributionMetadata Class', async function () {
    let contributionMetadata = new ContributionMetadata();
    await contributionMetadata.init(process.env.CONTRIB_LINK);

    describe('getPoints', function () {
        let points = contributionMetadata.getPoints();
        expect(points).to.be.a('string');

        let parsedPoints = parseInt(points);
        expect(parsedPoints).to.be.a('number', 'if able to parseInt');
        expect(parsedPoints >= 0).to.equal(true, 'parsedInt should equal to or greater than zero');
    })
});
