#!/bin/bash

SUDO_PASS="${SUDO_PASSWORD:-White@2026@@}"

echo "Configuring domain web routing for mathisi.in..."

# 1. Target all public_html web root folders on GoDaddy
for webroot in "$HOME/public_html" "/home/$USER/public_html" "/var/www/html" "/var/www/mathisi.in"; do
  if [ -d "$webroot" ] || mkdir -p "$webroot" 2>/dev/null; then
    echo "Writing reverse proxy rules to webroot: $webroot"
    
    # Apache / cPanel .htaccess reverse proxy to port 9002
    cat << 'EOF' > "$webroot/.htaccess" 2>/dev/null || true
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:9002/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:9002/$1 [P,L]
EOF

    # PHP Proxy Fallback in case Apache/Nginx executes index.php
    cat << 'EOF' > "$webroot/index.php" 2>/dev/null || true
<?php
$target = 'http://127.0.0.1:9002' . $_SERVER['REQUEST_URI'];
$ch = curl_init($target);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);
curl_close($ch);

foreach (explode("\r\n", $header) as $hdr) {
    if (!empty($hdr) && !str_contains(strtolower($hdr), 'transfer-encoding')) {
        header($hdr);
    }
}
echo $body;
EOF
  fi
done

# 2. If Nginx system service is active, update Nginx sites configuration directly
if command -v nginx >/dev/null 2>&1; then
  echo "Updating Nginx service configuration..."
  echo "$SUDO_PASS" | sudo -S rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
  
  echo "$SUDO_PASS" | sudo -S tee /etc/nginx/sites-available/mathisi.in /etc/nginx/conf.d/mathisi.conf > /dev/null << 'EOF' || true
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name mathisi.in www.mathisi.in 68.178.173.224 _;

    location / {
        proxy_pass http://127.0.0.1:9002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

  echo "$SUDO_PASS" | sudo -S ln -sf /etc/nginx/sites-available/mathisi.in /etc/nginx/sites-enabled/mathisi.in 2>/dev/null || true
  echo "$SUDO_PASS" | sudo -S nginx -t && (echo "$SUDO_PASS" | sudo -S systemctl reload nginx 2>/dev/null || echo "$SUDO_PASS" | sudo -S service nginx reload 2>/dev/null || echo "$SUDO_PASS" | sudo -S nginx -s reload 2>/dev/null) || true
fi

echo "Domain routing configuration completed!"
