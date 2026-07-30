#!/bin/bash
set -e

echo "Configuring web server reverse proxy..."

# 1. Update Nginx configuration across all standard configuration locations
if command -v nginx >/dev/null 2>&1; then
  echo "Updating Nginx reverse proxy configuration for mathisi.in..."
  
  # Write config to conf.d (CentOS / RHEL / standard Nginx) and sites-available (Ubuntu / Debian)
  cat << 'EOF' | sudo tee /etc/nginx/conf.d/mathisi.conf /etc/nginx/sites-available/mathisi.in > /dev/null || true
server {
    listen 80;
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

  sudo ln -sf /etc/nginx/sites-available/mathisi.in /etc/nginx/sites-enabled/mathisi.in 2>/dev/null || true
  sudo nginx -t && (sudo systemctl reload nginx || sudo service nginx reload || sudo nginx -s reload) 2>/dev/null || true
fi

# 2. Update .htaccess in web roots for Apache / cPanel proxy fallbacks
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
