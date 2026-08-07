#!/bin/sh
# Health check script for Dokploy
curl -f http://localhost:3000/ > /dev/null 2>&1 || exit 1
