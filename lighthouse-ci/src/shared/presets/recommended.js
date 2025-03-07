/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

module.exports = {
  assertions: {
    'appcache-manifest': ['warn', {}],
    'aria-allowed-attr': ['warn', {}],
    'aria-required-attr': ['warn', {}],
    'aria-required-children': ['warn', {}],
    'aria-required-parent': ['warn', {}],
    'aria-roles': ['warn', {}],
    'aria-valid-attr-value': ['warn', {}],
    'aria-valid-attr': ['warn', {}],
    'audio-caption': ['warn', {}],
    'bootup-time': ['warn', {}],
    'button-name': ['warn', {}],
    'color-contrast': ['warn', {}],
    'content-width': ['warn', {}],
    'critical-request-chains': ['warn', {}],
    'definition-list': ['warn', {}],
    'document-title': ['warn', {}],
    'dom-size': ['warn', {}],
    'duplicate-id': ['warn', {}],
    'efficient-animated-content': ['warn', {}],
    'errors-in-console': ['warn', {}],
    'estimated-input-latency': ['error', {minScore: 0.9}],
    'external-anchors-use-rel-noopener': ['warn', {}],
    'final-screenshot': ['warn', {}],
    'first-contentful-paint': ['error', {minScore: 0.9}],
    'first-cpu-idle': ['error', {minScore: 0.9}],
    'first-meaningful-paint': ['error', {minScore: 0.9}],
    'font-display': ['warn', {}],
    'font-size': ['warn', {}],
    'frame-title': ['warn', {}],
    'geolocation-on-start': ['warn', {}],
    'html-has-lang': ['warn', {}],
    'html-lang-valid': ['warn', {}],
    'http-status-code': ['warn', {}],
    'image-alt': ['warn', {}],
    'image-aspect-ratio': ['warn', {}],
    'input-image-alt': ['warn', {}],
    'installable-manifest': ['warn', {}],
    'is-crawlable': ['warn', {}],
    'is-on-https': ['warn', {}],
    'js-libraries': ['warn', {}],
    'layout-table': ['warn', {}],
    'link-name': ['warn', {}],
    'link-text': ['warn', {}],
    'load-fast-enough-for-pwa': ['warn', {}],
    'main-thread-tasks': ['warn', {}],
    'mainthread-work-breakdown': ['warn', {}],
    'max-potential-fid': ['warn', {}],
    'meta-description': ['warn', {}],
    'meta-refresh': ['warn', {}],
    'meta-viewport': ['warn', {}],
    'network-requests': ['warn', {}],
    'network-rtt': ['warn', {}],
    'network-server-latency': ['warn', {}],
    'no-document-write': ['warn', {}],
    'no-vulnerable-libraries': ['warn', {}],
    'notification-on-start': ['warn', {}],
    'object-alt': ['warn', {}],
    'offline-start-url': ['warn', {}],
    'offscreen-images': ['warn', {}],
    'password-inputs-can-be-pasted-into': ['warn', {}],
    'redirects-http': ['warn', {}],
    'render-blocking-resources': ['warn', {}],
    'robots-txt': ['warn', {}],
    'screenshot-thumbnails': ['warn', {}],
    'service-worker': ['warn', {}],
    'speed-index': ['error', {minScore: 0.9}],
    'splash-screen': ['warn', {}],
    'tap-targets': ['warn', {}],
    'td-headers-attr': ['warn', {}],
    'th-has-data-cells': ['warn', {}],
    'themed-omnibox': ['warn', {}],
    'time-to-first-byte': ['warn', {}],
    'total-byte-weight': ['warn', {}],
    'unminified-css': ['warn', {}],
    'unminified-javascript': ['warn', {}],
    'unused-css-rules': ['warn', {}],
    'user-timings': ['warn', {}],
    'uses-http2': ['warn', {}],
    'uses-long-cache-ttl': ['warn', {}],
    'uses-optimized-images': ['warn', {}],
    'uses-passive-event-listeners': ['warn', {}],
    'uses-rel-preconnect': ['warn', {}],
    'uses-rel-preload': ['warn', {}],
    'uses-responsive-images': ['warn', {}],
    'uses-text-compression': ['warn', {}],
    'uses-webp-images': ['warn', {}],
    'valid-lang': ['warn', {}],
    'video-caption': ['warn', {}],
    'video-description': ['warn', {}],
    'without-javascript': ['warn', {}],
    'works-offline': ['warn', {}],
    'accesskeys': ['warn', {}],
    'bypass': ['warn', {}],
    'canonical': ['warn', {}],
    'deprecations': ['warn', {}],
    'diagnostics': ['warn', {}],
    'dlitem': ['warn', {}],
    'doctype': ['warn', {}],
    'hreflang': ['warn', {}],
    'interactive': ['error', {minScore: 0.9}],
    'label': ['warn', {}],
    'list': ['warn', {}],
    'listitem': ['warn', {}],
    'metrics': ['warn', {}],
    'plugins': ['warn', {}],
    'redirects': ['warn', {}],
    'tabindex': ['warn', {}],
    'viewport': ['warn', {}],
  },
};
