const expect = require('chai').expect;

require('dotenv').config({path: "./.env"});
const ContributionMetadata = require('../src/ContributionMetadata');

describe('ContributionMetadata Class',  () => {
    let contributionMetadata;

    describe('getPoints()', () => {
        let points;
        let parsedPoints;

        beforeEach(async () => {
            contributionMetadata = new ContributionMetadata();
            await contributionMetadata.init(process.env.CONTRIB_LINK);
            points = contributionMetadata.getPoints();
            parsedPoints = parseInt(points);
        });

        it('should natively be a string', async () => {
            expect(points).to.be.a('string');
        });
        it('should natively be a string', async () => {
            expect(parsedPoints).to.be.a('number');
        });
        it('parsedInt should equal to or greater than zero', async () => {
            expect(parsedPoints >= 0).to.equal(true);
        });
    });
});
