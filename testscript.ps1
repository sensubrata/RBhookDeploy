
$value = (ls env:testvar).value
$value
#(Get-Content index.html) | ForEach-Object { $_ -replace "test", %testvar% } | Set-Content index.html