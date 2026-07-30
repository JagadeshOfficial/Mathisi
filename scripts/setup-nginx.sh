#!/bin/bash
set -e

# Setup Nginx reverse proxy for mathisi.in -> http://127.0.0.1:9002
if command -v nginx >/dev/null 2>&1; then
  echo "Updating Nginx reverse proxy configuration for mathisi.in..."
  
  cat << 'EOF' | sudo tee /etc/nginx/sites-available/mathisi.in > /dev/null || true
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
  sudo nginx -t && (sudo systemctl reload nginx 2>/dev/null || sudo service nginx reload 2>/dev/null) || true
fi
