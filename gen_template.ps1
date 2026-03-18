$path = "f:\BSPA_Tool\plaene\StundenplanLeer.docx"
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($path))
$js = "const TEMPLATE_BASE64 = `"$b64`";"
$js | Set-Content -Path "f:\BSPA_Tool\template_data.js" -Encoding utf8
