## Manual Install

> Here is how to install this browser extension in your favorite browsers:

<details><summary>Add to Google Chrome</summary>

1. Download [Webkit Extension](https://github.com/sfccdevops/sfcc-devtools/raw/master/dist/sfcc-devtools-webkit.crx)
2. Click **Keep** when prompted to download the file
3. Go to the following URL in a new Google Chrome tab:  `chrome://extensions`
4. In the top right corner, Enable **Developer Mode**
5. Drag and Drop `./dist/sfcc-devtools-webkit.crx` file into Extension page

</details>

<details><summary>Add to Firefox</summary>

1. Download [Firefox Addon](https://github.com/sfccdevops/sfcc-devtools/raw/master/dist/sfcc-devtools-firefox.zip)
2. Open Firefox
3. Go to the following URL in a new tab:  `about:debugging#/runtime/this-firefox`
4. In the top right corner, Click **Load Temporary Add-on...**
5. Select the `./dist/sfcc-devtools-firefox.zip` file

</details>

<details><summary>Add to Opera</summary>

1. Download [Webkit Extension](https://github.com/sfccdevops/sfcc-devtools/raw/master/dist/sfcc-devtools-webkit.crx)
2. Go to the following URL in a new Opera tab:  `chrome://extensions`
3. In the top right corner, Enable **Developer Mode**
4. Drag and Drop `./dist/sfcc-devtools-webkit.crx` file into Extension page
5. Select **Yes, Install** when prompted

</details>

## Developers

> Here is how to develop the browser extension on your local developer machine:

<details><summary>Build Extension</summary>

```bash
git clone git@github.com:sfccdevops/sfcc-devtools.git
cd sfcc-devtools
npm install
npm run pack
```

</details>

<details><summary>Load Unpacked Extension to Google Chrome</summary>

1. Open Google Chrome
2. Go to the following URL in a new tab:  `chrome://extensions`
3. In the top right corner, Enable **Developer Mode**
4. Click the **LOAD UNPACKED** link in the header
5. Select the `./src` folder

</details>

<details><summary>Load Temporary Add-on to Firefox</summary>

1. Open Terminal in project root and run `npm run pack:firefox`
2. Open Firefox
3. Go to the following URL in a new tab:  `about:debugging`
4. Select `Enable add-on debugging` checkbox
5. In the top right corner, Click **Load Temporary Add-on**
6. Select the `./dist/sfcc-devtools-firefox.zip` file

</details>

<details><summary>Load Unpacked Extension to Opera</summary>

1. Open Google Chrome
2. Go to the following URL in a new tab:  `chrome://extensions`
3. In the top right corner, Enable **Developer Mode**
4. Click the **Load Unpacked** button
5. Select the `./src` folder

</details>

<details><summary>Pack Extensions</summary>

```bash
cd sfcc-devtools
npm run pack
```

</details>
