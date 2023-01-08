const cheerio = require('cheerio');
class HtmlParser {
    async parseData(html) {
        const $ = cheerio.load(html);
        const a =  $('[jsname="W297wb"]');

        let allText = '';

        for (const aKey in a) {
            if(a[aKey] && a[aKey].children && a[aKey].children[0]){
                allText += a[aKey].children[0].data
            }
        }

        return allText;
    }
}

module.exports = HtmlParser;
