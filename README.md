# gaminglicence.uk

Static website for GamingLicence Advisory, an independent iGaming licensing consultancy.

- `index.html` – single-page site
- `assets/` – styles, script, favicon
- `contact.php` – contact form handler (uses PHP `mail()` on Hostinger)
- `privacy.html` – privacy policy template

## Advisory records

`advisory-records.html?number=10442` opens the public advisory record for KickBahis. The records file contains public advisory information only.

Add a record with `node scripts/add-advisory-record.mjs "Brand name" www.example.com YYYY-MM-DD`. The script assigns the next record number and sets the end date one year after the start date. Commit the updated records file to publish it.

## Deploy (Hostinger)

hPanel → Websites → gaminglicence.uk → Advanced → **Git**: add this repository, branch `main`, install path empty (`public_html`). Enable auto-deployment with the webhook URL shown in hPanel (GitHub → Settings → Webhooks).

## To do before launch

Replace the `[placeholder]` company name, address, phone and company number in `index.html` and `privacy.html`, and set the inbox in `contact.php`.
