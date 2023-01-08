const {By} = require('selenium-webdriver');

class TranslateService {
    constructor(drivers, parser) {
        this.parser = parser;
        this.drivers = drivers;
        this.languages = process.env.LANGUAGES.split(',');
    }

    async translateText(text){
        const data = {};

        let promises = this.languages.map(async (language, index) => {
            await this.drivers[index].get(this.createUrl(language, text));
            await this.drivers[index].sleep(3000);
            data[language] = await this.translate(index);
        })

        return Promise.all(promises).then(() => {
            return data;
        })
    }

    async translate(index){
        let html = await this.drivers[index].findElement(By.css('body')).getAttribute("innerHTML");
        return await this.parser.parseData(html);
    }

    createUrl(toLanguage, text){
        return `https://translate.google.com/?sl=en&tl=${toLanguage}&text=${encodeURIComponent(text)}&op=translate`
    }

    getLanguages(){
        return this.languages;
    }
}

module.exports = TranslateService;
