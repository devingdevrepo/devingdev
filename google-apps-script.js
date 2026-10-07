// Paste this into Extensions → Apps Script in your Google Sheet.
// Then Deploy → New deployment → Web app → "Execute as: Me", "Who has access: Anyone".

const SECRET = "PUT-THE-SAME-SECRET-AS-IN-.env.local"; // must match SUBSCRIBE_WEBHOOK_SECRET

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["email", "subscribed_at", "source", "consent"]);
  }

  // Skip duplicates.
  const emails = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat()
    : [];
  if (!emails.includes(data.email)) {
    sheet.appendRow([data.email, data.subscribedAt, data.source, data.consent]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
