const number = new URLSearchParams(location.search).get('number');
const message = document.getElementById('record-message');
const dateFormat = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long', timeZone: 'UTC' });

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
  document.getElementById('record-number').value = number;
  if (!/^[0-9]{5,12}$/.test(number)) {
    showMessage('Geçerli bir danışmanlık kayıt numarası girin.');
  } else {
    showMessage('Kayıt sorgulanıyor…');
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
        document.getElementById('record').hidden = false;
        showMessage('');
      } else {
        showMessage('Bu numarayla eşleşen bir danışmanlık kaydı bulunamadı.');
      }
    } catch {
      showMessage('Kayıtlar şu anda yüklenemedi. Biraz sonra tekrar deneyin.');
    }
  }
}
