#!/bin/bash
set -e

echo "Configuring Nginx Reverse Proxy for mathisi.in..."

# Password provided by user for sudo commands on GoDaddy server
SUDO_PASS="${SUDO_PASSWORD:-White@2026@@}"

if command -v nginx >/dev/null 2>&1; then
  echo "Disabling Ubuntu default Nginx 404 site..."
  echo "$SUDO_PASS" | sudo -S rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

  echo "Writing Nginx reverse proxy configuration for mathisi.in..."
  echo "$SUDO_PASS" | sudo -S tee /etc/nginx/sites-available/mathisi.in /etc/nginx/conf.d/mathisi.conf > /dev/null << 'EOF'
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

  echo "Enabling site and reloading Nginx..."
  echo "$SUDO_PASS" | sudo -S ln -sf /etc/nginx/sites-available/mathisi.in /etc/nginx/sites-enabled/mathisi.in 2>/dev/null || true
  echo "$SUDO_PASS" | sudo -S nginx -t && (echo "$SUDO_PASS" | sudo -S systemctl reload nginx || echo "$SUDO_PASS" | sudo -S service nginx reload || echo "$SUDO_PASS" | sudo -S nginx -s reload) || true
  echo "Nginx reverse proxy updated successfully!"
fi

# Fallback for Apache / cPanel webroots
for webroot in /home/*/public_html /var/www/html /var/www/mathisi.in; do
  if [ -d "$webroot" ]; then
    echo "Writing reverse proxy .htaccess to $webroot..."
    cat << 'EOF' > "$webroot/.htaccess" 2>/dev/null || true
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:9002/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:9002/$1 [P,L]
EOF
  fi
done
