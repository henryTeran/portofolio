$u = 'https://henryteran.com/api/csp-report'

$cases = @(
  @{
    Name = 'legacy_csp_report'
    ContentType = 'application/csp-report'
    Body = '{"csp-report":{"document-uri":"https://henryteran.com/fr?x=1#top","effective-directive":"script-src-elem","blocked-uri":"https://evil.example.com/a.js?token=123#frag","disposition":"report"}}'
  },
  @{
    Name = 'reporting_api_reports_json'
    ContentType = 'application/reports+json'
    Body = '[{"type":"csp-violation","url":"https://henryteran.com/en?utm=1","body":{"effectiveDirective":"connect-src","blockedURL":"https://api.bad.example.com/v1?k=abc","disposition":"report"}}]'
  },
  @{
    Name = 'json_direct_object'
    ContentType = 'application/json'
    Body = '{"documentURL":"https://henryteran.com/es#contact","effectiveDirective":"img-src","blockedURL":"https://img.bad.example.com/p.png?sig=1","disposition":"report"}'
  },
  @{
    Name = 'json_array_mixed'
    ContentType = 'application/json'
    Body = '[{"csp-report":{"document-uri":"https://henryteran.com/fr","effective-directive":"style-src","blocked-uri":"inline"}},{"body":{"effectiveDirective":"font-src","blockedURL":"https://fonts.bad.example.com/f.woff2"}}]'
  },
  @{
    Name = 'invalid_payload'
    ContentType = 'application/json'
    Body = '{"foo":"bar"}'
  }
)

foreach ($c in $cases) {
  $code = curl.exe -s -o NUL -w "%{http_code}" -X POST "$u" -H "Content-Type: $($c.ContentType)" --data-raw $c.Body
  Write-Output "TEST=$($c.Name) STATUS=$code"
}

$getCode = curl.exe -s -o NUL -w "%{http_code}" -X GET "$u"
Write-Output "TEST=get_method STATUS=$getCode"
