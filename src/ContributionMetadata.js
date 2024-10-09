const axios = require("axios");

/**
 * removed the published lists as those no longer count
 * added some new contribution categories
 * renamed "questions" to "answers"
 * parse number helper function added
 * add star after each of s- so regardless if singular (for 1) or plural - it will handle
 * ^we found this out by console.log the responseBody and test it on regex101.com 
 * updated regex to handle commas as noticed first digit cutting off when comma present
 */

// note too: regex is limited to english version of google maps as it uses english words to match

class ContributionMetadata {
  async init(link) {
    this.responseBody = await this.getResponseBody(link);
  }

  // helper method for parsing numbers from strings
  static parseNumber(str) {
    const intAmount = str.replace(/,/g, ""); // remove commas
    return parseInt(intAmount, 10); // parse as an integer
  }

  /**
   * gets how many points is associated with your Local Guide Profile
   * @public
   * @return {number} # of points
   */
  getPoints() {
    let pattern = /((\d|,)+) Points/g;
    const pointsString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(pointsString);
  }

  /**
   * Gets what level you are on your Local Guide Profile.
   * @public
   * @return {number} - Your level.
   */
  getLevel() {
    let pattern = /Level (\d+) Local Guide/g;
    const levelString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(levelString);
  }

  /**
   * Gets how many reviews you have associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of reviews.
   */
  getReviews() {
    let pattern = /(\d+(?:,\d+)*) reviews/g;
    const reviewsString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(reviewsString);
  }

  /**
   * Gets how many ratings you gave associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of ratings.
   */
  getRatings() {
    let pattern = /(\d+(?:,\d+)*) ratings*/g;
    const ratingsString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(ratingsString);
  }

  /**
   * Gets how many photos you uploaded associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of photos.
   */
  getPhotos() {
    let pattern = /(\d+(?:,\d+)*) photos*/g;
    const photosString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(photosString);
  }

  /**
   * Gets how many videos you uploaded associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of videos.
   */
  getVideos() {
    let pattern = /(\d+(?:,\d+)*) videos*/g;
    const videosString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(videosString);
  }

  /**
   * Gets how many captions you added associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of captions.
   */
  getCaptions() {
    let pattern = /(\d+(?:,\d+)*) captions*/g;
    const captionsString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(captionsString);
  }

  /**
   * Gets how many answers you provided associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of answers.
   */
  getAnswers() {
    let pattern = /(\d+(?:,\d+)*) answers*/g;
    const answersString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(answersString);
  }

  /**
   * Gets how many edits you made associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of edits.
   */
  getEdits() {
    let pattern = /(\d+(?:,\d+)*) edits*/g;
    const editsString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(editsString);
  }

  /**
   * Gets how many reports of incorrect info you made associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of reports of incorrect info.
   */
  getReportedIncorrect() {
    let pattern = /(\d+(?:,\d+)*) reported incorrect/g;
    const reportedIncorrectString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(reportedIncorrectString);
  }

  /**
   * Gets how many facts you checked associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of facts checked.
   */
  getFactsChecked() {
    let pattern = /(\d+(?:,\d+)*) facts* checked/g;
    const factsCheckedString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(factsCheckedString);
  }

  /**
   * Gets how many places you added associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of places added.
   */
  getPlacesAdded() {
    let pattern = /(\d+(?:,\d+)*) places* added*/g;
    const placesAddedString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(placesAddedString);
  }

  /**
   * Gets how many roads you added associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of roads added.
   */
  getRoadsAdded() {
    let pattern = /(\d+(?:,\d+)*) roads* added/g;
    const roadsAddedString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(roadsAddedString);
  }

  /**
   * Gets how many Q&As you answered associated with your Local Guide Profile.
   * @public
   * @return {number} - The number of Q&As.
   */
  getQA() {
    let pattern = /(\d+(?:,\d+)*) Q\\\\u0026A/g;
    const qaString = this.getMatch(pattern);
    return ContributionMetadata.parseNumber(qaString);
  }

  /**
   * gets all the metadata in one object
   * @public
   * @return {JSON} metadata
   */
  async getMetadata() {
    return {
      points: this.getPoints(),
      level: this.getLevel(),
      reviews: this.getReviews(),
      ratings: this.getRatings(),
      photos: this.getPhotos(),
      videos: this.getVideos(),
      captions: this.getCaptions(),
      answers: this.getAnswers(),
      edits: this.getEdits(),
      factsChecked: this.getFactsChecked(),
      placesAdded: this.getPlacesAdded(),
      roadsAdded: this.getRoadsAdded(),
      qa: this.getQA(),
      reportedIncorrect: this.getReportedIncorrect(),
    };
  }

  /**
   * gets the match result based on the pattern searching through the response body of the web page
   * @private
   * @param {RegExp} pattern Pattern used to find matches within the body
   * @param {string} body Entire web page body
   * @return {string} first group match result if found, empty string if not found.
   */
  getMatch(pattern) {
    let matches = pattern.exec(this.responseBody);
    console.log(this.responseBody); // referencing variable in the class
    console.log(matches);
    return matches.length > 0 ? matches[1] : "";
  }

  /**
   * gets the web page response body as a string
   * @private
   * @param {string} link Link to your contribution page
   * @return {string} response data which is a string of the entire web page
   */
  async getResponseBody(link) {
    return (await axios.get(link)).data;

    // Ensure the link is formatted correctly for the proxy
    // const formattedLink = link.replace('https://www.google.com/maps/contrib/', '/maps/contrib/');
    // return (await axios.get(`/.netlify/functions/proxy${formattedLink}`)).data;
  }

  /**
   * Gets the web page response body as a string
   * @private
   * @param {string} link Link to your contribution page
   * @return {string} response data which is a string of the entire web page
   */
  async getResponseBody(link) {
    return (await axios.get(link)).data;
  }
}

module.exports = ContributionMetadata;
