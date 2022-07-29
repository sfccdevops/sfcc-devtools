![Logo](https://sfccdevops.s3.amazonaws.com/logo-128.png "Logo")

> Support Browser Interaction with VS Code, Eclipse, and SFCC Business Manager via DevTools Web Inspector.

# ![sfcc-devtool-demo](https://sfcc-devtools.s3.us-east-1.amazonaws.com/sfcc-devtool-demo.gif?v=1.1.1)

## Features

- [X] Uses dwMarker HTML Comments
- [X] Adds new `SFCC` Side Panel to `Elements` Panel
- [X] Open ISML, Pipelines & Controllers in VS Code / Eclipse
- [X] Open Content Slots & Assets in Business Manager
- [X] Automatically Open Related Sites by Client ID & Site ID
- [X] Supports Light & Dark Themes

## Installation

> Select your browser:

[![Install Chrome](https://img.shields.io/badge/Install-Chrome-orange.svg?style=for-the-badge)](https://chrome.google.com/webstore/detail/sfcc-devtools/gdgdeiakmgocieipdpdaidanjbcchdka)
[![Install Firefox](https://img.shields.io/badge/Install-Firefox-red.svg?style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/sfcc-devtools/)
[![Install Edge](https://img.shields.io/badge/Install-Edge-blue.svg?style=for-the-badge)](https://microsoftedge.microsoft.com/addons/detail/sfcc-devtools/ngabmfehfcfkmiffgfigmfhghfgognle)

#### Once Installed:

1. Open Developer Console / Web Inspector in Browser
2. Select `Elements`/`Inspector` Tab
3. Select `SFCC` Tab in Side Panel

# ![sfcc-devtool-enable](https://sfcc-devtools.s3.us-east-1.amazonaws.com/sfcc-devtool-enable.gif?v=1.1.1)

Now you're ready to go. In your `Elements`/`Inspector` Tab, click on an SFCC comment block, like one of the examples below. This extension will convert the comment into links that allow you to interact with the SFCC resource.

```php
<!-- dwMarker="content" dwContentID="8a6c155cee595360a96c5ac853" -->
<!-- dwMarker="product" dwContentID="8a6c155cee595360a96c5ac853" -->
<!-- dwMarker="decorator" dwTemplateTitle="/default/common/layout/page.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/common/layout/page.isml" -->
<!-- dwMarker="linclude" dwTemplateTitle="/default/components/header/pageHeader.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/components/header/pageHeader.isml" -->
<!-- dwMarker="link" dwPipelineTitle="Login-Show (app_client_base)" dwIsController="true" dwPipelineURL="http://localhost:60606/target=/app_client_base/cartridge/controllers/Login.js&amp;start=Show" -->
<!-- dwMarker="page" dwPipelineTitle="SearchServices-GetPopularSuggestions (app_client_base)" dwPipelineURL="http://localhost:60606/target=/app_client_base/cartridge/controllers/SearchServices.js&amp;start=GetPopularSuggestions" dwIsController="true" dwTemplateTitle="/default/search/suggestionsPopular.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/search/suggestionsPopular.isml" -->
<!-- dwMarker="rinclude" dwPipelineTitle="Internal" dwIsController="false" dwTemplateTitle="/default/slots/category/carousels/carouselRouting.isml (app_client_base)" dwTemplateURL="http://localhost:60606/target=/app_client_base/cartridge/templates/default/slots/category/carousels/carouselRouting.isml" -->
<!-- dwMarker="slot" dwContentID="header-banner" dwContext="global"-->
```

Troubleshooting
---

> Need Help? Check out or Troubleshooting Page for help with any known issues or report new ones.

[![Create Issue](https://img.shields.io/badge/Get_Help-Troubleshooting-red.svg?style=for-the-badge&logo=github&logoColor=ffffff&logoWidth=16)](https://github.com/sfccdevops/sfcc-devtools/blob/develop/TROUBLESHOOTING.md)

About the Author
---

> [Peter Schmalfeldt](https://peterschmalfeldt.com/) is a Certified Senior Salesforce Commerce Cloud Developer with over 20 years of experience building eCommerce websites, providing everything you need to design, develop & deploy eCommerce applications for Web, Mobile & Desktop platforms.

Disclaimer
---

> The trademarks and product names of Salesforce®, including the mark Salesforce®, are the property of Salesforce.com. SFCC DevOps is not affiliated with Salesforce.com, nor does Salesforce.com sponsor or endorse the SFCC DevOps products or website. The use of the Salesforce® trademark on this project does not indicate an endorsement, recommendation, or business relationship between Salesforce.com and SFCC DevOps.
