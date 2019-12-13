(() => {
  'use strict'

  const bindEvents = () => {
    let timeout

    const $controller = document.getElementById('open-controller')
    const $template = document.getElementById('open-template')
    const $error = document.getElementById('error')

    const showError = (target, err) => {
      clearTimeout(timeout)

      target.classList.add('error')
      target.classList.remove('loading')
      target.classList.remove('success')

      $error.style.display = 'block'

      console.error(err)
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

    // Unbind / Bind Click events for IDE Buttons
    if ($controller) {
      $controller.removeEventListener('click', openIDE)
      $controller.addEventListener('click', openIDE)
    }

    if ($template) {
      $template.removeEventListener('click', openIDE)
      $template.addEventListener('click', openIDE)
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

    title = title.replace('linclude', 'Local Include')
      .replace('rinclude', 'Remote Include')
      .replace('content', 'Content Asset')
      .replace('slot', 'Content Slot')

    return title
  }

  /**
   * Generate HTML for Sidebar using Props parsed from Comment
   * @param {string} props
   * @param {string} domain
   * @param {string} siteID
   */
  const generateSidebar = (props, domain, siteID) => {
    let html = `<h1>${cleanTitle(props.type)}</h1>`

    // This has a Pipeline or Controller
    if (props.pipeline) {
      html = html.concat(`<h2>${getLabel(props.pipeline.ide ? props.pipeline.ide.split(/(\\|\/)/g).pop() : props.pipeline.title)}</h2>`)
      html = html.concat(`<a class="button" id="open-controller" href="${props.pipeline.ide}" target="_blank">Open in Editor</a>`)
    }

    // This has a Template
    if (props.template) {
      html = html.concat(`<h2>${getLabel(props.template.ide.split(/(\\|\/)/g).pop())}</h2>`)
      html = html.concat(`<a class="button" id="open-template" href="${props.template.ide}" target="_blank">Open in Editor</a>`)
    }

    // This is a Content Slot
    if (props.type === 'slot' && props.id && domain && siteID) {
      const context = (props.context) ? props.context : 'null'
      const contextId = (props.contextId) ? props.contextId : 'null'

      html = html.concat(`<h2>ID:&nbsp; <span>${props.id}</span></h2>`)
      html = html.concat(`<a class="button" href="https://${domain}/on/demandware.store/Sites-Site/default/StorefrontEditing-Slot?SlotID=${props.id}&ContextName=${context}&ContextUUID=${contextId}&Site=${siteID}" target="_blank">Open in Business Manager</a>`)
    }

    // This is a Content Asset
    if (props.type === 'content' && props.id && domain) {
      html = html.concat(`<h2>ID:&nbsp; <span>${props.id}</span></h2>`)
      html = html.concat(`<a class="button" href="https://${domain}/on/demandware.store/Sites-Site/default/ViewLibraryContent_52-Start?ContentUUID=${props.id}" target="_blank">Open in Business Manager</a>`)
    }

    return html
  }

  /**
   * Generate Label from Title & Extension
   * @param {string} title
   */
  const getLabel = title => {
    var ext = title.split('.').pop()

    if (ext === 'js' || title.indexOf('.js&') > -1) {
      return `Controller:&nbsp; <span>${title.replace('.js&amp;start=', '&nbsp;&rarr;&nbsp; ')}</span>`
    }

    if (ext === 'isml') {
      return `Template:&nbsp; <span>${title}</span>`
    }

    return `Title:&nbsp; <span>${title}</span>`
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

      // Check if we have a result from our selection
      if (result) {
        // Before we use the result, get some details about the page we're on
        const getPageInfo = location => {
          if (location && typeof location[0] !== 'undefined') {
            const url = new URL(location[0])
            const domain = url.hostname
            const match = url.pathname.match(/\/s\/([a-zA-Z0-9_-]+)\/*/)
            const siteID = (match) ? match[1] : null

            // Parse Comment & Update Side Bar
            const info = parseCommentInfo(result)

            if (info) {
              $sidebar.innerHTML = generateSidebar(info, domain, siteID)
              bindEvents()
            } else {
              $sidebar.innerHTML = '<i>No SFCC Comment Selected</i>'
            }
          }
        }

        // Get Current Page URL Info
        if (browser.devtools) {
          browser.devtools.inspectedWindow.eval(`{ window.location.href }`).then(getPageInfo, onError)
        }
      } else {
        $sidebar.innerHTML = '<i>No SFCC Comment Selected</i>'
      }
    }

    // Use inspector to parse DOM and return node if Comment Block ( nodeType === 8 )
    if (browser.devtools) {
      browser.devtools.inspectedWindow.eval(`{ const node = $0; node.nodeType === 8 && node.nodeValue; }`).then(selectedElement, onError)
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
  }
})()
