// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(async function() {
  // about:blank never fires a load event so just wait until we see the URL change
  function navigateToAboutBlankAndWait() {
    const listenerPromise = new Promise(resolve => {
      self.SDK.targetManager.addEventListener(SDK.TargetManager.Events.InspectedURLChanged, resolve);
    });

    TestRunner.navigate('about:blank');
    return listenerPromise;
  }

  TestRunner.addResult('Tests that audits panel prevents run of unauditable pages.\n');
  await TestRunner.navigatePromise('resources/lighthouse-basic.html');

  await TestRunner.loadTestModule('lighthouse_test_runner');
  await TestRunner.showPanel('lighthouse');

  TestRunner.addResult('\n\n**Prevents audit with no categories**');
  LighthouseTestRunner.openStartAudit();
  const containerElement = LighthouseTestRunner.getContainerElement();
  const ensureDisabledNames = ['Performance', 'Accessibility', 'Best practices', 'SEO', 'Progressive Web App'];
  for (const checkboxName of ensureDisabledNames) {
    const checkboxes = Array.from(containerElement.querySelectorAll('.checkbox'));
    for (const checkbox of checkboxes) {
      if (checkbox.textElement.textContent !== checkboxName) {
        continue;
      }

      if (checkbox.checkboxElement.checked) {
        checkbox.checkboxElement.click();
      }
    }
  }
  LighthouseTestRunner.dumpStartAuditState();

  TestRunner.addResult('\n\n**Allows audit with a single category**');
  const checkboxes = Array.from(containerElement.querySelectorAll('.checkbox'));
  for (const checkbox of checkboxes) {
    if (checkbox.textElement.textContent !== 'Performance') {
      continue;
    }

    checkbox.checkboxElement.click();
  }
  LighthouseTestRunner.dumpStartAuditState();

  TestRunner.addResult('\n\n**Allows audit on undockable page**');
  // Extension page and remote debugging previously caused crashes (crbug.com/734532)
  // However, the crashes have been resolved, so these should now pass.
  LighthouseTestRunner.forcePageAuditabilityCheck();
  LighthouseTestRunner.dumpStartAuditState();

  TestRunner.addResult('\n\n**Prevents audit on internal page**');
  await navigateToAboutBlankAndWait();
  TestRunner.addResult(`URL: ${TestRunner.mainTarget.inspectedURL()}`);
  LighthouseTestRunner.dumpStartAuditState();

  TestRunner.completeTest();
})();
