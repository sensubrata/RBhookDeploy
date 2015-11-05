
[string]$value = (ls env:testvar).value
$value
(Get-Content "..\wwwroot\index.html") | ForEach-Object { $_ -replace "test", $value } | Set-Content "..\wwwroot\index.html"