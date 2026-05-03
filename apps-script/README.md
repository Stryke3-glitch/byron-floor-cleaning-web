# Byron Floor Cleaning — Apps Script backend

This directory holds the source for the Google Apps Script Web App that
receives estimate-form submissions from the website. Lead data is appended
to a Google Sheet and a notification email is sent via `MailApp`.

The deployment is intentionally manual. You don't need `clasp` or any
extra tooling unless you want it.

## What you'll set up (once)

1. A Google Sheet (where leads land).
2. An Apps Script project bound to that Sheet.
3. A Web App deployment of that script.
4. The deployment's `/exec` URL, pasted into Cloudflare Pages as the
   `PUBLIC_FORM_ENDPOINT` environment variable.

## Step-by-step

### 1. Create the Google Sheet

- Sign in as the Google account that should *own* the leads (the same
  account where you want notification emails to land).
- Visit <https://sheets.new> and name the file something like
  `Byron Floor Cleaning — Leads`.
- Leave the first sheet empty. The script will create a `Leads` tab and
  add a header row on the first submission.

### 2. Open the bound Apps Script project

In the Sheet, choose **Extensions → Apps Script**. A new tab opens with
an empty `Code.gs` file.

### 3. Paste in the source

- Replace the contents of `Code.gs` with this repo's
  [`apps-script/Code.gs`](./Code.gs).
- (Optional) Open the manifest via **Project Settings →
  Show "appsscript.json" manifest file in editor**, then replace the
  manifest with this repo's [`apps-script/appsscript.json`](./appsscript.json).
- At the top of `Code.gs`, set `OWNER_EMAIL` to the address that should
  receive lead notifications. The default is `byronfloorcleaning@gmail.com`.
- Save (⌘/Ctrl + S). Name the project `Byron Floor Cleaning — Form Backend`.

### 4. Deploy as a Web App

- Click **Deploy → New deployment**.
- Select type: **Web app**.
- *Description:* `v1 form endpoint`.
- *Execute as:* **Me** (the Sheet owner).
- *Who has access:* **Anyone** (this allows anonymous POSTs from
  visitors' browsers; the script itself runs under your account).
- Click **Deploy**. Authorize the requested scopes
  (`Send email as you`, `See, edit, create, and delete only the
  spreadsheets you've used with this app`).
- Copy the **Web app URL** that ends in `/exec`.

### 5. Wire it to the website

- In Cloudflare Pages → **Settings → Environment variables**:
  - Add `PUBLIC_FORM_ENDPOINT` with the `/exec` URL.
  - Add it for both **Production** and **Preview** environments.
- Trigger a redeploy of the Pages site so the value is baked into the
  built form.

### 6. Test

- Open the deployed site (preview or production), wait at least
  2 seconds, fill out the estimate form, and submit.
- Check that:
  1. A row was appended to the `Leads` tab in the Sheet.
  2. The owner email received a notification.
  3. The browser saw a successful "Got it. Talk soon." state.

## Updating the script later

When you change `Code.gs`, paste the new version into the Apps Script
editor and run **Deploy → Manage deployments → Edit (pencil) → Version:
New version → Deploy**. The `/exec` URL stays the same as long as you
edit the existing deployment instead of creating a new one.

## Email and quota notes

- `MailApp.sendEmail` runs under the deploying account. Google publishes
  daily sending quotas for Apps Script that vary by account type
  (consumer Gmail, Google Workspace, etc.) and that Google can adjust
  at any time. See the current numbers in Google's docs:
  <https://developers.google.com/apps-script/guides/services/quotas>.
- For a small NJ floor-cleaning lead form the volume is far under any
  realistic quota, but if you ever notice missed notifications, that
  page is where to check first.

## Spam handling

The script enforces two cheap, no-cost defenses:

- A **honeypot** field named `website` that is hidden from real users.
  If it's filled in, the script silently returns success without
  recording anything.
- A **time trap** that rejects submissions arriving less than 2 seconds
  after the form was rendered.

If spam ever becomes a real problem, add Cloudflare Turnstile in front
of the form (free) before reaching for anything heavier.

## Sheet schema

The `Leads` tab is created with this header row on first submission:

```
timestamp · source · name · phone · email · address · propertyType ·
floorType · sqft · service · referrer · notes
```

To add new fields later, append them to the end of the `FIELDS` array in
`Code.gs` and add a matching column in the Sheet. Do not reorder.

## Local development

You don't need this script running to develop the front-end. Without
`PUBLIC_FORM_ENDPOINT` set, the form will show an inline error on submit
("The form is not configured yet…") instead of POSTing anywhere. That's
the intended local behavior — the form's HTML and validation can be
exercised offline.
