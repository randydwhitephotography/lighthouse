/**
 * @license Copyright 2017 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import {strict as assert} from 'assert';

import Audit from '../../../audits/accessibility/aria-required-children.js';

describe('Accessibility: aria-required-children audit', () => {
  it('generates an audit output', () => {
    const artifacts = {
      Accessibility: {
        violations: [{
          id: 'aria-required-children',
          nodes: [],
          help: 'http://example.com/',
        }],
      },
    };

    const output = Audit.audit(artifacts);
    assert.equal(output.score, 0);
  });

  it('generates an audit output (single node)', () => {
    const artifacts = {
      Accessibility: {
        violations: [{
          id: 'aria-required-children',
          nodes: [{node: {}, relatedNodes: []}],
          help: 'http://example.com/',
        }],
      },
    };

    const output = Audit.audit(artifacts);
    assert.equal(output.score, 0);
  });
});
