
[string]$value = (ls env:testvar).value
[string]$clientId = (ls env:clientId).value
[string]$redirectUri = (ls env:redirectUri).value
[string]$webhookURL = (ls env:webhookURI).value
$value
$clientId
$redirectUri
$webhookURL

(Get-Content "..\wwwroot\index.html") | ForEach-Object { $_ -replace "test", $value } | Set-Content "..\wwwroot\index.html"
(Get-Content "..\wwwroot\js\Script.js") | ForEach-Object { $_ -replace "clientId99", $clientId } | Set-Content "..\wwwroot\js\Script.js"
(Get-Content "..\wwwroot\js\Script.js") | ForEach-Object { $_ -replace "redirectUri99", $redirectUri } | Set-Content "..\wwwroot\js\Script.js"
(Get-Content "..\wwwroot\js\Script.js") | ForEach-Object { $_ -replace "webhookURL99", $webhookURL } | Set-Content "..\wwwroot\js\Script.js"
<##>
