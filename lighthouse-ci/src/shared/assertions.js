/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const _ = require('./lodash.js');

/**
 * @typedef AssertionResult
 * @property {'auditRan'|keyof LHCI.AssertCommand.AssertionOptions} name
 * @property {string} operator
 * @property {number} expected
 * @property {number} actual
 * @property {number[]} values
 * @property {LHCI.AssertCommand.AssertionFailureLevel} [level]
 * @property {string} [auditId]
 */

/**
 * @param {LHCI.AssertCommand.AssertionFailureLevel | [LHCI.AssertCommand.AssertionFailureLevel, LHCI.AssertCommand.AssertionOptions] | undefined} assertion
 * @return {[LHCI.AssertCommand.AssertionFailureLevel, LHCI.AssertCommand.AssertionOptions]}
 */
function normalizeAssertion(assertion) {
  if (!assertion) return ['off', {}];
  if (typeof assertion === 'string') return [assertion, {}];
  return assertion;
}

/**
 * @param {number[]} values
 * @param {LHCI.AssertCommand.AssertionMergeMethod} mergeMethod
 * @param {keyof LHCI.AssertCommand.AssertionOptions} property
 */
function getValueForMergeMethod(values, mergeMethod, property) {
  values = values.filter(x => Number.isFinite(x));
  if (!values.length) throw new Error('All audit results failed');

  if (mergeMethod === 'median') {
    const medianIndex = Math.floor((values.length - 1) / 2);
    const sorted = values.slice().sort((a, b) => a - b);
    if (values.length % 2 === 1) return sorted[medianIndex];
    return (sorted[medianIndex] + sorted[medianIndex + 1]) / 2;
  }

  const useMin =
    (mergeMethod === 'optimistic' && property.startsWith('max')) ||
    (mergeMethod === 'pessimistic' && property.startsWith('min'));
  return useMin ? Math.min(...values) : Math.max(...values);
}

/**
 * @param {LH.Result[]} lhrs
 * @param {string} auditId
 * @param {LHCI.AssertCommand.AssertionOptions} options
 * @return {AssertionResult[]}
 */
function getAssertionResults(lhrs, auditId, options) {
  const auditResults = lhrs.map(lhr => lhr.audits[auditId]);
  if (auditResults.some(result => result === undefined)) {
    return [
      {
        name: 'auditRan',
        expected: 1,
        actual: 0,
        values: auditResults.map(result => result === undefined ? 0 : 1),
        operator: '>=',
      },
    ];
  }

  const scores = auditResults.map(audit => audit.score || 0);
  const lengths = auditResults.map(
    audit => audit.details && 'items' in audit.details && audit.details.items.length
  );

  const {minScore, maxLength, mergeMethod = 'optimistic'} = options;

  /** @type {AssertionResult[]} */
  const results = [];

  // Keep track of if we had a manual assertion so we know whether or not to automatically create a
  // default minScore assertion.
  let hadManualAssertion = false;

  if (maxLength !== undefined) {
    hadManualAssertion = true;
    const length = getValueForMergeMethod(lengths, mergeMethod, 'maxLength');
    if (length > maxLength) {
      results.push({
        name: 'maxLength',
        expected: maxLength,
        actual: length,
        values: lengths,
        operator: '<=',
      });
    }
  }

  const realMinScore = minScore === undefined && !hadManualAssertion ? 1 : minScore;
  if (realMinScore !== undefined) {
    const score = getValueForMergeMethod(scores, mergeMethod, 'minScore');
    if (score < realMinScore) {
      results.push({
        name: 'minScore',
        expected: realMinScore,
        actual: score,
        values: scores,
        operator: '>=',
      });
    }
  }

  return results;
}

/**
 * @param {LHCI.AssertCommand.Options} options
 * @param {LH.Result[]} lhrs
 * @return {AssertionResult[]}
 */
function getAllAssertionResults(options, lhrs) {
  const {preset = '', ...optionOverrides} = options;
  let optionsToUse = optionOverrides;
  const presetMatch = preset.match(/lighthouse:(.*)$/);
  if (presetMatch) {
    const presetData = require(`./presets/${presetMatch[1]}.js`);
    optionsToUse = _.merge(_.cloneDeep(presetData), optionsToUse);
  }

  const {assertions = {}} = optionsToUse;

  /** @type {AssertionResult[]} */
  const results = [];
  const auditsToAssert = new Set(Object.keys(assertions).map(_.kebabCase));
  for (const auditId of auditsToAssert) {
    const [level, assertionOptions] = normalizeAssertion(assertions[auditId]);
    if (level === 'off') continue;
    for (const result of getAssertionResults(lhrs, auditId, assertionOptions)) {
      results.push({...result, auditId, level});
    }
  }

  return results;
}

module.exports = {getAllAssertionResults};
