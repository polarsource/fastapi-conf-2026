const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { test } = require('node:test')
const vm = require('node:vm')

const source = readFileSync(`${__dirname}/showtime.js`, 'utf8')

function screen(name, builtIn, x, y, width, height) {
  const frame = { origin: { x, y }, size: { width, height } }
  return {
    localizedName: name,
    deviceDescription: { objectForKey: () => builtIn },
    frame,
    visibleFrame: frame,
  }
}

function harness(screens, { deferWindowCreation = false } = {}) {
  const windows = []
  let pendingWindow
  const fullscreen = { entered: false }
  const button = name => ({ role: () => 'AXButton', name: () => name })
  const context = vm.createContext({
    ObjC: { import() {}, unwrap: value => value },
    delay() {
      if (pendingWindow) {
        windows.push(pendingWindow)
        pendingWindow = undefined
      }
    },
    $: {
      NSApplication: {},
      NSScreen: { screens: { count: screens.length, objectAtIndex: i => screens[i] } },
      CGDisplayIsBuiltin: id => id,
    },
    Application: Object.assign((name) => {
      if (name === 'Safari') {
        return {
          activate() {},
          windows: Object.assign(() => windows.slice(), { byId: id => windows[id] }),
          Document: ({ url }) => ({
            make() {
              const id = windows.length
              const window = { id: () => id, name: () => url, currentTab: { url } }
              if (deferWindowCreation)
                pendingWindow = window
              else
                windows.push(window)
              return window
            },
          }),
        }
      }
      assert.equal(name, 'System Events')
      return {
        processes: {
          byName: () => ({
            windows: Object.assign(() => fullscreen.entered ? [{
              name: () => '',
              entireContents: () => [button('Close fullscreen')],
            }] : [], {
              byName(name) {
                assert.ok(['http://localhost:3030/1', 'http://localhost:3030/presenter/1'].includes(name))
                return {
                  exists: () => true,
                  actions: { byName: () => ({ perform() {
                    if (name.endsWith('/presenter/1'))
                      fullscreen.presenterRaised = true
                  } }) },
                  entireContents: () => [{
                    ...button('Enter fullscreen'),
                    click() { fullscreen.entered = true },
                  }],
                }
              },
            }),
          }),
        },
      }
    }, { currentApplication: () => { throw new Error('Use the global JXA delay(), not an application Apple event') } }),
  })
  vm.runInContext(source, context)
  return { context, windows, fullscreen }
}

test('finds the laptop even when an external monitor is the primary display', () => {
  const { context } = harness([
    screen('Projector', false, 0, 0, 1920, 1080),
    screen('Laptop', true, -1728, -1117, 1728, 1117),
    screen('Other external', false, 1920, 0, 1920, 1080),
  ])
  assert.equal(vm.runInContext('run(["--check"])', context), 'Presenter: Laptop; slides: Projector')
  const bounds = vm.runInContext('windowBounds(getDisplays().laptop, getDisplays().primaryTop)', context)
  assert.deepEqual(JSON.parse(JSON.stringify(bounds)), { x: -1708, y: 1100, width: 1688, height: 1077 })
})

test('requires both a built-in screen and an extended external display', () => {
  for (const screens of [[], [screen('Laptop', true, 0, 0, 1728, 1117)], [screen('Projector', false, 0, 0, 1920, 1080)]]) {
    const { context, windows } = harness(screens)
    assert.throws(() => vm.runInContext('run(["--check"])', context), /extended mode/)
    assert.equal(windows.length, 0)
  }
})

test('waits for asynchronous Safari windows, enters fullscreen and restores presenter focus', () => {
  const { context, windows, fullscreen } = harness([
    screen('Laptop', true, 0, 0, 1728, 1117),
    screen('Projector', false, 1728, 1117, 1920, 1080),
  ], { deferWindowCreation: true })
  vm.runInContext('run([])', context)
  assert.equal(windows[0].currentTab.url, 'http://localhost:3030/presenter/1')
  assert.equal(windows[1].currentTab.url, 'http://localhost:3030/1')
  assert.equal(windows[0].bounds.x, 20)
  assert.equal(windows[1].bounds.x, 1748)
  assert.equal(windows[1].bounds.y, -1060)
  assert.equal(fullscreen.entered, true)
  assert.equal(fullscreen.presenterRaised, true)
  assert.equal(windows[0].index, 1)
})
