#  ![icon](src/icons/48.png) SFCC DevTools

> Support Browser Interaction with VS Code, Eclipse, and SFCC Business Manager via DevTools Web Inspector.

# ![sfcc-devtool-demo](https://sfcc-devtools.s3.us-east-1.amazonaws.com/sfcc-devtool-demo.gif?v=1.0.0)

[Red Van Workshop](https://redvanworkshop.com) is a Salesforce Commerce Cloud Certified Partner.  We built this Extension to connect the Browsers Web Inspector to VS Code, Eclipse & Business Manager. We hope you will find it as useful as we do, and if you want to help make it better, we'd love to hear from you.

## Features

- [X] Uses dwMarker HTML Comments
- [X] Adds new `SFCC` Side Panel to `Elements` Panel
- [X] Open ISML, Pipelines & Controllers in VS Code / Eclipse
- [X] Open Content Slots & Assets in Business Manager
- [X] Automatically Open Related Sites by Client ID & Site ID
- [X] Supports Light & Dark Themes

## Installation

> Select your browser:

[![Install Chrome](https://img.shields.io/badge/Install-Chrome-blue.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/sfcc-devtools/gdgdeiakmgocieipdpdaidanjbcchdka)
[![Install Firefox](https://img.shields.io/badge/Install-Firefox-orange.svg?style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/sfcc-devtools/)
[![Install Opera*](https://img.shields.io/badge/Install-Opera_&ast;-red.svg?style=for-the-badge)](https://addons.opera.com/en/extensions/details/sfcc-devtools/)

_`*` Currently Requires Beta / Developer versions of Opera, or use of our Chrome Extension._

#### Once Installed:

1. Open Developer Console / Web Inspector in Browser
2. Select `Elements`/`Inspector` Tab
3. Select `SFCC` Tab in Side Panel

# ![sfcc-devtool-enable](https://sfcc-devtools.s3.us-east-1.amazonaws.com/sfcc-devtool-enable.gif?v=1.0.0)

Now you're ready to go. In your `Elements`/`Inspector` Tab, click on an SFCC comment block, like one of the examples below. This extension will convert the comment into links that allow you to interact with the SFCC resource.

```php
<!-- dwMarker="content" dwContentID="8a6c155cee595360a96c5ac853" -->
<!-- dwMarker="decorator" dwTemplateTitle="/default/common/layout/page.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/common/layout/page.isml" -->
<!-- dwMarker="linclude" dwTemplateTitle="/default/components/header/pageHeader.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/components/header/pageHeader.isml" -->
<!-- dwMarker="link" dwPipelineTitle="Login-Show (app_client_base)" dwIsController="true" dwPipelineURL="http://localhost:60606/target=/app_client_base/cartridge/controllers/Login.js&amp;start=Show" -->
<!-- dwMarker="page" dwPipelineTitle="SearchServices-GetPopularSuggestions (app_client_base)" dwPipelineURL="http://localhost:60606/target=/app_client_base/cartridge/controllers/SearchServices.js&amp;start=GetPopularSuggestions" dwIsController="true" dwTemplateTitle="/default/search/suggestionsPopular.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/search/suggestionsPopular.isml" -->
<!-- dwMarker="rinclude" dwPipelineTitle="Internal" dwIsController="false" dwTemplateTitle="/default/slots/category/carousels/carouselRouting.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/slots/category/carousels/carouselRouting.isml" -->
<!-- dwMarker="slot" dwContentID="header-banner" dwContext="global"-->
```

## Manual Install

> Here is how to install this browser extension in your favorite browsers:

<details><summary>Add to Google Chrome</summary>

1. Download [Webkit Extension](https://github.com/redvanworkshop/sfcc-devtools/raw/master/dist/sfcc-devtools-webkit.crx)
2. Click **Keep** when prompted to download the file
3. Go to the following URL in a new Google Chrome tab:  `chrome://extensions`
4. In the top right corner, Enable **Developer Mode**
5. Drag and Drop `./dist/sfcc-devtools-webkit.crx` file into Extension page

</details>

<details><summary>Add to Firefox</summary>

1. Download [Firefox Addon](https://github.com/redvanworkshop/sfcc-devtools/raw/master/dist/sfcc-devtools-firefox.zip)
2. Open Firefox
3. Go to the following URL in a new tab:  `about:debugging#/runtime/this-firefox`
4. In the top right corner, Click **Load Temporary Add-on...**
5. Select the `./dist/sfcc-devtools-firefox.zip` file

</details>

<details><summary>Add to Opera</summary>

1. Download [Webkit Extension](https://github.com/redvanworkshop/sfcc-devtools/raw/master/dist/sfcc-devtools-webkit.crx)
2. Go to the following URL in a new Opera tab:  `chrome://extensions`
3. In the top right corner, Enable **Developer Mode**
4. Drag and Drop `./dist/sfcc-devtools-webkit.crx` file into Extension page
5. Select **Yes, Install** when prompted

</details>

## Developers

> Here is how to develop the browser extension on your local developer machine:

<details><summary>Build Extension</summary>

```bash
git clone git@github.com:redvanworkshop/sfcc-devtools.git
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

## Troubleshooting

> `OPEN IN EDITOR` button does not work

# ![sfcc-devtool-error](https://sfcc-devtools.s3.us-east-1.amazonaws.com/sfcc-devtool-error.gif?v=1.0.0)

**SOLUTION:** Make sure you have either [VS Code w/ Prophet Debugger](https://marketplace.visualstudio.com/items?itemName=SqrTT.prophet) or [Eclipse w/ UX Studio](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FSiteDevelopment%2FInstallUXStudio.html) running, with your SFCC project opened.  Once you've opened your SFCC project, re-clicking the button should correctly open the file.

**Firefox Users:** You likely see an error page in your browser, rather than the fancy error message in your SFCC Side Panel. The same solution applies to Firefox. We are just required to open `localhost` links in a new browser tab as Firefox blocks access to adding `http://localhost:60606` to `content_security_policy`, which is needed, in this case, to open the file in the background ( like in Google Chrome ).


Disclaimer
===

The trademarks and product names of Salesforce®, including the mark Salesforce®, are the property of Salesforce.com. Red Van Workshop is not affiliated with Salesforce.com, nor does Salesforce.com sponsor or endorse the Red Van Workshop products or website. The use of the Salesforce® trademark on this project does not indicate an endorsement, recommendation, or business relationship between Salesforce.com and Red Van Workshop.
