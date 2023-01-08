const {Builder, By, Key} = require('selenium-webdriver');
let instance = null;

class Selenium {
    constructor() {
        if(!instance){
            instance = this;
        }
        this.drivers = [];
        this.driversCount = 0;
        return instance;
    }

    async initDrivers (browser) {
        // same as languages lengths
        this.driversCount = process.env.LANGUAGES.split(',').length;

        for (let i = 0; i < this.driversCount; i++) {
            let driver =  await new Builder().forBrowser(browser).build();
            driver.manage().window().setRect({width: 1000, height: 700});
            await driver.get(process.env.TRANSLATIONURL);
            this.drivers.push(driver);
        }
    }

    getDrivers(){
        return this.drivers;
    }
    getDriversCount(){
        return this.driversCount;
    }

    destroyDrivers(){
        if(this.drivers && this.drivers.length && this.driversCount){
            for (let i = 0; i < this.driversCount ; i++) {
                this.drivers[i].quit();
            }
        }
    }
}

module.exports =  Selenium;
