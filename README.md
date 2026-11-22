# gaminglicence.uk

Static website for GamingLicence Advisory, an independent iGaming licensing consultancy.

- `index.html` – single-page site
- `assets/` – styles, script, favicon
- `contact.php` – contact form handler (uses PHP `mail()` on Hostinger)
- `privacy.html` – privacy policy template

## Deploy (Hostinger)

hPanel → Websites → gaminglicence.uk → Advanced → **Git**: add this repository, branch `main`, install path empty (`public_html`). Enable auto-deployment with the webhook URL shown in hPanel (GitHub → Settings → Webhooks).

## To do before launch

Replace the `[placeholder]` company name, address, phone and company number in `index.html` and `privacy.html`, and set the inbox in `contact.php`.
