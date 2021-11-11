(() => {
  'use strict'

  /**
   * Bind Event Listeners
   */
  const bindEvents = () => {
    let timeout

    const $assetList = document.getElementById('asset-list')
    const $assetListToggle = document.getElementById('asset-list-toggle')
    const $controller = document.getElementById('open-controller')
    const $error = document.getElementById('error')
    const $sidebar = document.getElementById('sidebar')
    const $slotList = document.getElementById('slot-list')
    const $slotListToggle = document.getElementById('slot-list-toggle')
    const $template = document.getElementById('open-template')

    const showError = (target, err) => {
      if (target && err) {
        clearTimeout(timeout)

        target.classList.add('error')
        target.classList.remove('loading')
        target.classList.remove('success')

        $error.style.display = 'block'
      }
    }

    const openIDE = evt => {
      evt.preventDefault()

      const $target = evt.target

      if (!$target) {
        return
      }

      // Check if this is FireFox as it will not allow AJAX calls to `http://localhost`
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        window.open($target.href, 'ide')
        return
      }

      // For Chrome we can do a little more elegant opening of files
      $target.classList.add('loading')
      $target.classList.remove('error')
      $target.classList.remove('success')

      $error.style.display = 'none'

      const ajax = new XMLHttpRequest()

      try {
        ajax.open('GET', $target.href, true)
        ajax.onreadystatechange = () => {
          if (ajax.readyState === 4) {
            clearTimeout(timeout)

            $target.classList.remove('loading')
            $target.classList.add('success')

            timeout = setTimeout(() => {
              $target.classList.remove('success')
            }, 3000)
          }
        }

        ajax.onerror = err => {
          showError($target, err.target)
        }

        ajax.send()
      } catch (err) {
        showError($target, err.target)
      }
    }

    const toggleAssetList = evt => {
      evt.preventDefault()
      evt.stopImmediatePropagation()

      const $target = evt.target

      if (!$target) {
        return
      }

      $target.classList.toggle('expanded')
      $assetList.classList.toggle('collapsed')
    }

    const toggleSlotList = evt => {
      evt.preventDefault()
      evt.stopImmediatePropagation()

      const $target = evt.target

      if (!$target) {
        return
      }

      $target.classList.toggle('expanded')
      $slotList.classList.toggle('collapsed')
    }

    const closeDropDowns = evt => {
      const $target = evt.target

      if (!$target || $target.id !== 'sidebar') {
        return
      }

      evt.preventDefault()
      evt.stopImmediatePropagation()

      if ($assetList && $assetListToggle) {
        $assetListToggle.classList.remove('expanded')
        $assetList.classList.add('collapsed')
      }

      if ($slotList && $slotListToggle) {
        $slotList.classList.add('collapsed')
        $slotListToggle.classList.remove('expanded')
      }
    }

    // Unbind / Bind Click events for IDE Buttons
    if ($controller) {
      $controller.removeEventListener('click', openIDE)
      $controller.addEventListener('click', openIDE)
    }

    if ($template) {
      $template.removeEventListener('click', openIDE)
      $template.addEventListener('click', openIDE)
    }

    if ($assetListToggle) {
      $assetListToggle.removeEventListener('click', toggleAssetList)
      $assetListToggle.addEventListener('click', toggleAssetList)
    }

    if ($slotListToggle) {
      $slotListToggle.removeEventListener('click', toggleSlotList)
      $slotListToggle.addEventListener('click', toggleSlotList)
    }

    if ($sidebar) {
      $sidebar.removeEventListener('click', closeDropDowns)
      $sidebar.addEventListener('click', closeDropDowns)
    }
  }

  /**
   * Convert SFCC Marker to Title
   * @param {string} title
   */
  const cleanTitle = title => {
    if (!title) {
      return
    }

    if (browser.i18n) {
      title = title.replace('linclude', browser.i18n.getMessage('labelLocalInclude'))
        .replace('rinclude', browser.i18n.getMessage('labelRemoteInclude'))
        .replace('content', browser.i18n.getMessage('labelContentAsset'))
        .replace('slot', browser.i18n.getMessage('labelContentSlot'))
    }

    return title
  }

  /**
   * Generate HTML for Sidebar using Props parsed from Comment
   * @param {string} props
   * @param {string} domain
   * @param {string} siteId
   */
  const generateSidebar = (props, domain, siteId, client) => {
    let html = `<h1>${cleanTitle(props.type)}</h1>`

    const openInIDE = (browser.i18n) ? browser.i18n.getMessage('openInIDE') : 'Open in Editor'
    const openInBM = (browser.i18n) ? browser.i18n.getMessage('openInBM') : 'Open in Business Manager'
    const instances = (typeof client === 'object') ? Object.keys(client) : null

    // This has a Pipeline or Controller
    if (props.pipeline) {
      html = html.concat(`<h2>${getLabel(props.pipeline.ide ? props.pipeline.ide.split(/(\\|\/)/g).pop() : props.pipeline.title)}</h2>`)
      html = html.concat(`<a class="button" id="open-controller" href="${props.pipeline.ide}" target="_blank">${openInIDE}</a>`)
    }

    // This has a Template
    if (props.template) {
      html = html.concat(`<h2>${getLabel(props.template.ide.split(/(\\|\/)/g).pop())}</h2>`)
      html = html.concat(`<a class="button" id="open-template" href="${props.template.ide}" target="_blank">${openInIDE}</a>`)
    }

    // This is a Content Slot
    if (props.type === 'slot' && props.id && domain && siteId) {
      const context = (props.context) ? props.context : 'null'
      const contextId = (props.contextId) ? props.contextId : 'null'
      const slotURL = `https://${domain}/on/demandware.store/Sites-Site/default/StorefrontEditing-Slot?SlotID=${props.id}&ContextName=${context}&ContextUUID=${contextId}&Site=${siteId}`

      html = html.concat(`<h2>${getLabel(props.id)}</h2>`)
      html = html.concat(`<a class="button primary ${(instances && instances.length > 1) ? 'has-dropdown' : ''}" href="${slotURL}" target="_blank">${openInBM}</a>`)

      if (instances && instances.length > 1) {
        html = html.concat(`<a class="button dropdown" id="slot-list-toggle" data-dropdown="slot-list"><span>▾</span></a>`)

        instances.sort()

        html = html.concat('<div id="slot-list" class="dropdown-list collapsed"><ul>')

        instances.forEach((instance, index) => {
          const altSlotURL = `https://${client[instance].domain}/on/demandware.store/Sites-Site/default/StorefrontEditing-Slot?SlotID=${props.id}&ContextName=${context}&ContextUUID=${contextId}&Site=${siteId}`
          html = html.concat(`<li><a class="alt ${client[instance].instanceType}" href="${altSlotURL}" target="_blank">${instances[index]}</a></li>`)
        })

        html = html.concat('</ul></div>')
      }
    }

    // This is a Content Asset
    if (props.type === 'content' && props.id && domain) {
      const assetURL = `https://${domain}/on/demandware.store/Sites-Site/default/ViewLibraryContent_52-Start?ContentUUID=${props.id}`

      html = html.concat(`<h2>${getLabel(props.id)}</h2>`)
      html = html.concat(`<a class="button primary" href="${assetURL}" target="_blank">${openInBM}</a>`)

      // TODO: Check if we actually need this bit since it might actually not work like we think
      // html = html.concat(`<a class="button primary ${(instances && instances.length > 1) ? 'has-dropdown' : ''}" href="${assetURL}" target="_blank">${openInBM}</a>`)

      // if (instances && instances.length > 1) {
      //   html = html.concat(`<a class="button dropdown" id="asset-list-toggle" data-dropdown="asset-list"><span>▾</span></a>`)

      //   instances.sort()

      //   html = html.concat('<div id="asset-list" class="dropdown-list collapsed"><ul>')

      //   instances.forEach((instance, index) => {
      //     const altAssetURL = `https://${client[instance].domain}/on/demandware.store/Sites-Site/default/ViewLibraryContent_52-Start?ContentUUID=${props.id}`
      //     html = html.concat(`<li><a class="alt ${client[instance].instanceType}" href="${altAssetURL}" target="_blank">${instances[index]}</a></li>`)
      //   })

      //   html = html.concat('</ul></div>')
      // }
    }

    return html
  }

  /**
   * Generate Label from Title & Extension
   * @param {string} title
   */
  const getLabel = title => {
    const ext = title.split('.').pop()
    const controller = (browser.i18n) ? browser.i18n.getMessage('labelController') : 'Controller'
    const template = (browser.i18n) ? browser.i18n.getMessage('labelTemplate') : 'Template'
    const id = (browser.i18n) ? browser.i18n.getMessage('labelID') : 'ID'

    if (ext === 'js' || title.indexOf('.js&') > -1) {
      return `${controller}:&nbsp; <span>${title.replace('.js&amp;start=', '&nbsp;&rarr;&nbsp; ')}</span>`
    }

    if (ext === 'isml') {
      return `${template}:&nbsp; <span>${title}</span>`
    }

    return `${id}:&nbsp; <span>${title}</span>`
  }

  /**
   * Get Operating System ( for native font support )
   */
  const getOS = () => {
    const platform = window.navigator.platform
    const mac = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windows = ['Win32', 'Win64', 'Windows', 'WinCE']

    if (mac.indexOf(platform) !== -1) {
      return 'platform-mac'
    } else if (windows.indexOf(platform) !== -1) {
      return 'platform-windows'
    } else if (/Linux/.test(platform)) {
      return 'platform-linux'
    }
  }

  /**
   * Get Property from Comment
   * @param {string} comment
   * @param {string} prop
   */
  const getProp = (comment, prop) => {
    var regex = new RegExp(prop + '="([^"]+)"')
    var match = comment.match(regex)

    return (match) ? match[1] : null
  }

  /**
   * Parse HTML for `data-locate` data attributes and replace with locale text
   */
  const i18n = () => {
    if (browser.i18n) {
      const $messages = document.querySelectorAll('[data-locale]')

      $messages.forEach(message => {
        message.textContent = browser.i18n.getMessage(message.dataset.locale)
      })
    }
  }

  /**
   * Inspect Selected DOM Element and check for Comment Blocks
   */
  const inspect = () => {
    // We don't really care if there is an error here, as nothing would have loaded anyway, so we can skip it
    const onError = () => undefined

    // Get Selected Element
    const selectedElement = (result, exception) => {
      if (exception) {
        return
      }

      // Some browsers return selected element as an array
      if (Array.isArray(result)) {
        result = result[0]
      }

      // Cache Sidebar DOM Selection
      const $sidebar = document.getElementById('sidebar')

      const invalidComment = (browser.i18n) ? browser.i18n.getMessage('invalidComment') : 'No SFCC Comment Selected'

      // Check if we have a result from our selection
      if (result) {
        // Before we use the result, get some details about the page we're on
        const getPageInfo = data => {
          const page = (data && typeof data[0] !== 'undefined') ? data[0] : null

          // If no page info detected, we have nothing to show
          if (!page) {
            $sidebar.innerHTML = `<i>${invalidComment}</i>`
            return
          }

          const info = parseCommentInfo(result)
          const location = page.location || null
          const siteId = page.siteId || null
          const url = new URL(location)
          const domain = url.hostname

          // Add domain to page info before passing over
          page.domain = url.hostname

          if (info && domain && siteId) {
            browser.storage.local.get(page.clientId).then(response => {
              const client = (response && response.hasOwnProperty(page.clientId) && response[page.clientId].hasOwnProperty(page.siteId)) ? response[page.clientId][page.siteId] : null
              $sidebar.innerHTML = generateSidebar(info, domain, siteId, client)
              bindEvents()
            })
          } else {
            $sidebar.innerHTML = `<i>${invalidComment}</i>`
          }
        }

        // Get Current Page URL Info
        if (browser.devtools) {
          browser.devtools.inspectedWindow.eval(`{
            const pageInfo = {
              location: window.location.href,
              clientId: window.CQuotient.clientId,
              instanceType: window.CQuotient.instanceType,
              realm: window.CQuotient.realm,
              siteId: window.CQuotient.siteId
            };
            pageInfo;
          }`).then(getPageInfo, onError)
        }
      } else {
        $sidebar.innerHTML = `<i>${invalidComment}</i>`
      }
    }

    // Store Client Information if they've opened SFCC DevTools SidePanel
    const storePageData = (data) => {
      const page = (data && typeof data[0] !== 'undefined') ? data[0] : null

      // Exit if Page is not set
      if (!page || typeof page.location === 'undefined') {
        return
      }

      const url = new URL(page.location)

      // Exit if URL is not set
      if (!url || typeof url.hostname === 'undefined') {
        return
      }

      page.domain = url.hostname

      // split domain for parts
      const domain = page.domain.split('.')
      const subdomain = (domain && domain.length > 0) ? domain[0].split('-') : null
      const key = (subdomain && subdomain.length > 0) ? subdomain[0] : null

      // Exit if key could not be set
      if (!key) {
        return
      }

      // Check if we've already got this client's site stored for them
      browser.storage.local.get(page.clientId).then((client) => {
        const hasClient = (typeof client !== 'undefined' && client.hasOwnProperty(page.clientId))
        const hasSite = (hasClient && typeof client[page.clientId] !== 'undefined' && client[page.clientId].hasOwnProperty(page.siteId))
        const hasSubdomain = (hasSite && typeof client[page.clientId] !== 'undefined' && typeof client[page.clientId][page.siteId] !== 'undefined' && client[page.clientId][page.siteId].hasOwnProperty(key))

        if (!hasClient || !hasSite || !hasSubdomain) {
          // Clone data
          const store = Object.assign({}, client)
          const info = Object.assign({}, page)

          // Remove duplicate data
          delete info.location
          delete info.siteId
          delete info.clientId

          // Prep data for storage
          store[page.clientId] = (hasClient) ? store[page.clientId] : {}
          store[page.clientId][page.siteId] = (hasSite) ? store[page.clientId][page.siteId] : {}
          store[page.clientId][page.siteId][key] = info

          // Save to Local Storage
          browser.storage.local.set(store).then(() => {}, onError)
        }
      }, onError)
    }

    // Use inspector to parse DOM and return node if Comment Block
    if (browser.devtools) {
      browser.devtools.inspectedWindow.eval(`{
        const node = $0;
        node.nodeType === Node.COMMENT_NODE && node.nodeValue;
      }`).then(selectedElement, onError)

      browser.devtools.inspectedWindow.eval(`{
        const pageInfo = {
          location: window.location.href,
          clientId: window.CQuotient.clientId,
          instanceType: window.CQuotient.instanceType,
          realm: window.CQuotient.realm,
          siteId: window.CQuotient.siteId
        };
        pageInfo;
      }`).then(storePageData, onError)
    }
  }

  /**
   * Parse SFCC Comment Block
   * @param {string} comment
   */
  const parseCommentInfo = comment => {
    if (!comment) {
      return
    }

    // Check if this is an SFCC comment block
    const match = comment.match(/dwMarker="([^"]+)"/)

    // Check that we have a match
    if (match) {
      const context = getProp(comment, 'dwContext')
      const contextId = getProp(comment, 'dwContextID')
      const controller = getProp(comment, 'dwIsController')
      const id = getProp(comment, 'dwContentID')
      const pipelineTitle = getProp(comment, 'dwPipelineTitle')
      const pipelineUrl = getProp(comment, 'dwPipelineURL')
      const templateTitle = getProp(comment, 'dwTemplateTitle')
      const templateUrl = getProp(comment, 'dwTemplateURL')

      // Store SFCC Props parsed from Comment Block
      const sfccProps = {
        type: match[1]
      }

      // Set SFCC Context
      if (context) {
        sfccProps.context = context
      }

      // Set SFCC Context ID
      if (contextId) {
        sfccProps.contextId = contextId
      }

      // Set SFCC Controller
      if (controller) {
        sfccProps.controller = controller
      }

      // Set SFCC ID
      if (id) {
        sfccProps.id = id
      }

      // Set SFCC Pipeline Info
      if (pipelineTitle && pipelineUrl) {
        const pipeline = pipelineTitle.split(' ')
        sfccProps.pipeline = {
          cartridge: (pipeline.length === 2) ? pipeline[1].replace(/[^a-z_]/g, '') : null,
          title: pipeline[0],
          ide: pipelineUrl
        }
      }

      // Set SFCC Template Info
      if (templateTitle && templateUrl) {
        const template = templateTitle.split(' ')
        sfccProps.template = {
          cartridge: (template.length === 2) ? template[1].replace(/[^a-z_]/g, '') : null,
          title: template[0],
          ide: templateUrl
        }
      }

      return sfccProps
    }
  }

  if (browser.devtools) {
    // Listen for DOM selection changes
    browser.devtools.panels.elements.onSelectionChanged.addListener(inspect)

    // Add Current Dev Console Theme as Class Name [light|dark]
    document.body.classList.add(browser.devtools.panels.themeName)
    document.body.classList.add(getOS())

    // Initialize Selection
    inspect()

    // Update Locale
    i18n()
  }
})()
