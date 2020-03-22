const Utils = (() => {
    /**
     * Extracts the base url given a url
     * @param {String} url input url
     * @return {String} base url
     */
    const extractBaseUrl = (url) => {
        const pathArray = url.split( '/' );
        const protocol = pathArray[0];
        const host = pathArray[2];
        return protocol + '//' + host;
    }

    /**
     * Converts time in seconds to HH:MM:SS format
     * @param {Number} seconds time in seconds 
     * @return {String} time in HH:MM:SS
     */
    const secondsToHHMMSS = (seconds) => new Date(1000 * seconds).toISOString().substr(11, 8);

    return {
        extractBaseUrl,
        secondsToHHMMSS
    }
})();