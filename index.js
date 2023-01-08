require('dotenv').config();
process.setMaxListeners(11);

// initialize services
const Selenium = require('./services/Selenium');
const TranslateService = require('./services/TranslateService');
const HtmlParser = require('./helpers/HtmlParser');

// create new selenium driver and dom parser
const selenium = new Selenium();
const parser = new HtmlParser();

// get command arguments
// browser -> default chrome
// text -> must exist
let browser = process.env.npm_config_browser || 'chrome';
let text    = process.env.npm_config_text    || null;
let key     = process.env.npm_config_key     || null;

if(!text){
    console.log(`
        Please specify some text to translate, otherwise there is not any reason to use this program :)
        example -> npm run translate --text="Hi there"    
    `)
    process.exit(0);
}

(async () => {
    try {
        // try to initialize drivers
        await selenium.initDrivers(browser);
        // initialize translator service
        const translateService = new TranslateService(selenium.getDrivers(), parser)
        // get results
        let results = await translateService.translateText(text);
        let languages = translateService.getLanguages();

        console.log(`----- TRANSLATED -----`)
        // just to print with order that specified in env file
        for (let i = 0; i < languages.length; i++) {
            console.log(`[${languages[i]}]`)
            if(key){
                console.log(`"${key}": "${results[languages[i]]}"`)
            }else{
                console.log(`${results[languages[i]]}`)
            }
            console.log(`------------------------------------`)
        }
        // destroy drivers
        selenium.destroyDrivers();
    }catch (e){
        if(e.message) {
            console.error(e.message)
        }
    }
})();
