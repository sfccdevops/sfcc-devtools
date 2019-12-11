(() => {
  'use strict'

  if (browser.devtools.panels.elements.createSidebarPane) {
    browser.devtools.panels.elements.createSidebarPane('SFCC', sidebar => {
      if (sidebar) {
        sidebar.setPage('sidebar.html')
      }
    })
  }
})()
