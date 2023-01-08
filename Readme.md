**_Hello_**, developer who is tired of translating in 11 languages, 
here we have created an automated program for you that will 
speed up the time-consuming and boring work.
_**Works with Google translator, employers won't complain!!**_
---------
JUST DO 
`npm install` <br>
And then (t fot **translate**  )
`npm run t --text="some text for translate"` <br>
Result example<br>
`
[ar]
بعض النصوص للترجمة`
---------
Also you can specify `key` `npm run t --text="some text for translate" --key="my_key"` <br> 
Result example<br>
`[ar]
"my_key": "بعض النصوص للترجمة"
`
---------

**_!! Note <br>_**
If you getting any errors with `chromedriver` , just replace version in <br>
`package.json` file with your current `chrome browser` version

For example if you have `chrome` version of `108.*` then replace version of `chromedriver` in `package.json` file with this
`"chromedriver": "^108.0.0",`
---------