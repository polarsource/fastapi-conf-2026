ObjC.import('AppKit')
ObjC.import('CoreGraphics')

function getDisplays() {
  $.NSApplication.sharedApplication
  const screens = $.NSScreen.screens
  const displays = []
  for (let i = 0; i < screens.count; i++) {
    const screen = screens.objectAtIndex(i)
    const id = ObjC.unwrap(screen.deviceDescription.objectForKey('NSScreenNumber'))
    displays.push({
      name: ObjC.unwrap(screen.localizedName),
      builtIn: Boolean($.CGDisplayIsBuiltin(id)),
      frame: screen.frame,
      visibleFrame: screen.visibleFrame,
    })
  }
  const laptop = displays.find(display => display.builtIn)
  const external = displays.find(display => !display.builtIn)
  if (!laptop || !external)
    throw new Error('Connect an external display in extended mode and keep the laptop screen on.')
  return { laptop, external, primaryTop: displays[0].frame.size.height }
}

function windowBounds(display, primaryTop) {
  const frame = display.visibleFrame
  // AppKit uses bottom-left coordinates; Safari uses top-left coordinates.
  return {
    x: Math.round(frame.origin.x + 20),
    y: Math.round(primaryTop - frame.origin.y - frame.size.height + 20),
    width: Math.round(frame.size.width - 40),
    height: Math.round(frame.size.height - 40),
  }
}

function run(args) {
  const { laptop, external, primaryTop } = getDisplays()
  if (args[0] === '--check')
    return `Presenter: ${laptop.name}; slides: ${external.name}`

  const safari = Application('Safari')
  const systemEvents = Application('System Events')

  function openWindow(url, display) {
    const existingIds = safari.windows().map(window => window.id())
    safari.Document({ url }).make()
    // Safari can return from make() before its new window appears.
    for (let attempt = 0; attempt < 100; attempt++) {
      const created = safari.windows().find(window => !existingIds.includes(window.id()))
      if (created) {
        const window = safari.windows.byId(created.id())
        window.bounds = windowBounds(display, primaryTop)
        return window
      }
      delay(0.1)
    }
    throw new Error(`Safari did not create a window for ${url}.`)
  }

  safari.activate()
  const presenter = openWindow('http://localhost:3030/presenter/1', laptop)
  const slides = openWindow('http://localhost:3030/1', external)
  slides.index = 1
  safari.activate()
  delay(1)

  try {
    const process = systemEvents.processes.byName('Safari')
    process.frontmost = true
    const findButton = (window, name) => window.entireContents()
      .find(element => element.role() === 'AXButton' && element.name() === name)
    let audienceWindow
    let enterFullscreen
    for (let attempt = 0; attempt < 60; attempt++) {
      audienceWindow = process.windows.byName(slides.name())
      if (audienceWindow.exists())
        enterFullscreen = findButton(audienceWindow, 'Enter fullscreen')
      if (enterFullscreen)
        break
      delay(0.5)
    }
    if (!enterFullscreen)
      throw new Error('Slidev did not load its fullscreen control.')
    audienceWindow.actions.byName('AXRaise').perform()
    enterFullscreen.click()
    let entered = false
    for (let attempt = 0; attempt < 30; attempt++) {
      delay(0.2)
      // Safari moves HTML fullscreen content into a separate unnamed window.
      if (process.windows().some(window => window.name() === '' && findButton(window, 'Close fullscreen'))) {
        entered = true
        break
      }
    }
    if (!entered)
      throw new Error('Slidev did not enter full screen.')
    delay(1)
    presenter.index = 1
    safari.activate()
    process.windows.byName(presenter.name()).actions.byName('AXRaise').perform()
  }
  catch (error) {
    throw new Error(`Safari windows opened, but fullscreen setup failed: ${error.message}. Allow your terminal app in System Settings > Privacy & Security > Accessibility and Automation, then retry.`)
  }
}
