/**
 * Byron Floor Cleaning — estimate form backend.
 *
 * Receives application/x-www-form-urlencoded POSTs from the website's
 * estimate form, validates them, appends a row to the bound Google Sheet,
 * and emails a notification to OWNER_EMAIL via MailApp.
 *
 * Deploy: Extensions → Apps Script (from a Google Sheet) → paste this file
 * → Deploy → New deployment → Web app → "Anyone" can access → run as you.
 * Paste the resulting /exec URL into your Cloudflare Pages env var
 * PUBLIC_FORM_ENDPOINT.
 */

// === Configuration ===
var OWNER_EMAIL = 'byronfloorcleaning@gmail.com';
var SHEET_NAME = 'Leads';
var REPLY_SUBJECT = 'New estimate request — Byron Floor Cleaning';

// Order matches Sheet header row. Add new fields at the end.
var FIELDS = [
  'timestamp',
  'source',
  'name',
  'phone',
  'email',
  'address',
  'propertyType',
  'floorType',
  'sqft',
  'service',
  'referrer',
  'notes',
];

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Honeypot — bots fill this; real users do not.
    if (p.website && String(p.website).trim() !== '') {
      return jsonResponse({ ok: true });
    }

    // Time trap — reject submissions that arrive < 2 seconds after page load.
    var loadedAt = parseInt(p.loadedAt, 10);
    if (loadedAt && Date.now() - loadedAt < 2000) {
      return jsonResponse({ ok: false, error: 'too_fast' }, 400);
    }

    // Required fields
    var required = ['name', 'phone', 'address', 'floorType', 'service'];
    for (var i = 0; i < required.length; i++) {
      var k = required[i];
      if (!p[k] || !String(p[k]).trim()) {
        return jsonResponse({ ok: false, error: 'missing_' + k }, 400);
      }
    }

    appendLead(p);
    sendNotification(p);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  // Friendly fallback if the URL is opened in a browser.
  return HtmlService.createHtmlOutput(
    '<p>Byron Floor Cleaning estimate endpoint. Submit via the website form.</p>'
  );
}

function appendLead(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(FIELDS);
    sheet.setFrozenRows(1);
  }
  // Ensure header row exists
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FIELDS);
    sheet.setFrozenRows(1);
  }
  var row = FIELDS.map(function (k) {
    if (k === 'timestamp') return new Date();
    return p[k] != null ? String(p[k]) : '';
  });
  sheet.appendRow(row);
}

function sendNotification(p) {
  var lines = [
    'New estimate request:',
    '',
    'Name: ' + (p.name || ''),
    'Phone: ' + (p.phone || ''),
    'Email: ' + (p.email || ''),
    'Address: ' + (p.address || ''),
    'Property type: ' + (p.propertyType || ''),
    'Floor type: ' + (p.floorType || ''),
    'Sq ft: ' + (p.sqft || ''),
    'Service: ' + (p.service || ''),
    'Heard about us: ' + (p.referrer || ''),
    'Notes: ' + (p.notes || ''),
    '',
    'Source page: ' + (p.source || ''),
    'Received: ' + new Date().toString(),
  ].join('\n');

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    replyTo: p.email || OWNER_EMAIL,
    subject: REPLY_SUBJECT,
    body: lines,
  });
}

function jsonResponse(obj, status) {
  // Apps Script doesn't honor HTTP status codes from web apps; status arg is informational.
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
