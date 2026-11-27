// The switch in the page's privacy note. analytics.js, loaded from
// kansolabs.org, announces every change
// of the visitor's choice with an event, and the note follows it. Until that
// file has run, the note says the setting is not known yet and the button
// stays hidden. The button is kanso-ui's, rendered at build time; this sets
// the text of its label, the innermost element that holds it.
;(function () {
  'use strict'

  var status = document.getElementById('analytics-status')
  var choice = document.getElementById('analytics-choice')
  var toggle = document.getElementById('analytics-toggle')
  if (!status || !choice || !toggle) return

  function label() {
    var walker = document.createTreeWalker(toggle, NodeFilter.SHOW_TEXT)
    var node
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim()) return node
    }
    return null
  }

  function draw() {
    var analytics = window.kansoAnalytics
    if (!analytics) return
    var on = analytics.status() === 'granted'
    status.textContent = on
      ? 'Analytics is on for Kanso Labs sites in this browser.'
      : 'Analytics is off for Kanso Labs sites in this browser.'
    var text = label()
    if (text) text.nodeValue = on ? 'Turn it off' : 'Turn it on'
    choice.hidden = false
  }

  toggle.addEventListener('click', function () {
    var analytics = window.kansoAnalytics
    if (!analytics) return
    if (analytics.status() === 'granted') analytics.deny()
    else analytics.grant()
  })

  window.addEventListener('kanso-analytics', draw)
  draw()
})()
