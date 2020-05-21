const expect = require('chai').expect;

require('dotenv').config({path: "./.env"});
const ContributionMetadata = require('../src/ContributionMetadata');

describe('ContributionMetadata Class',  () => {
    let contributionMetadata;

    describe('getMetadata()', () => {
        let metadata;

        beforeEach(async () => {
            contributionMetadata = new ContributionMetadata();
            await contributionMetadata.init(process.env.CONTRIB_LINK);
            metadata = contributionMetadata.getMetadata();
        });

        it('should have each attribute be a string', async () => {
            for (let attr in metadata) {
                if (metadata.hasOwnProperty(attr)) {
                    expect(metadata[attr]).to.be.a('string');
                }
            }
        });

        it('each attribute should be able to parse into an Int', async () => {
            for (let attr in metadata) {
                if (metadata.hasOwnProperty(attr)) {
                    let parseIntAttr = parseInt(metadata[attr]);
                    expect(parseIntAttr).to.be.a('number');
                }
            }
        });

        it('parsedInt attribute should equal to or greater than zero', async () => {
            for (let attr in metadata) {
                if (metadata.hasOwnProperty(attr)) {
                    let parseIntAttr = parseInt(metadata[attr]);
                    expect(parseIntAttr >= 0).to.equal(true);
                }
            }
        });
    });
});
