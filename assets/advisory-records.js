const number = new URLSearchParams(location.search).get('number');
const message = document.getElementById('record-message');
const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' });

function showMessage(text) {
  message.textContent = text;
  message.hidden = !text;
}

function setDate(id, value) {
  const time = document.getElementById(id);
  time.dateTime = value;
  time.textContent = dateFormat.format(new Date(value));
}

if (number !== null) {
  if (!/^[0-9]{5,12}$/.test(number)) {
    showMessage('Enter a valid advisory record number.');
  } else {
    showMessage('Looking up the record…');
    try {
      const response = await fetch(new URL('advisory-records.json', import.meta.url), { cache: 'no-cache' });
      if (!response.ok) throw new Error('Record file unavailable');
      const records = await response.json();
      const record = records.find(entry => String(entry.number) === number);

      if (record) {
        document.getElementById('record-name').textContent = record.name;
        document.getElementById('record-id').textContent = record.number;
        document.getElementById('record-domain').textContent = record.domain;
        setDate('record-start', record.startDate);
        setDate('record-end', record.endDate);
        if (record.statusLabel) {
          document.getElementById('record-status-label').textContent = record.statusLabel;
        }
        document.getElementById('record').hidden = false;
        showMessage('');
      } else {
        showMessage('No advisory record matches this number.');
      }
    } catch {
      showMessage('Advisory records could not be loaded. Please try again later.');
    }
  }
}
