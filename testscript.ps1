
[string]$value = (ls env:testvar).value
$value
(Get-Content index.html) | ForEach-Object { $_ -replace "test", $value } | Set-Content index.html