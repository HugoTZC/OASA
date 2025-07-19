#!/bin/bash

# ==========================================
# OASA Environment Switcher
# ==========================================
# Script to easily switch between local and production environments
# Usage: ./switch-backend.sh local   (for localhost)
#        ./switch-backend.sh prod    (for production)
#        ./switch-backend.sh status  (show current config)

ENV_FILE=".env.local"
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

show_status() {
    echo -e "${BLUE}📊 Current Backend Configuration:${NC}"
    echo "=================================="
    if grep -q "^NEXT_PUBLIC_BACKEND_URL=http://localhost:3001" "$ENV_FILE" 2>/dev/null; then
        echo -e "Environment: ${GREEN}LOCAL DEVELOPMENT${NC}"
        echo -e "Backend URL: ${GREEN}http://localhost:3001${NC}"
    elif grep -q "^NEXT_PUBLIC_BACKEND_URL=https://oasa-backend.onrender.com" "$ENV_FILE" 2>/dev/null; then
        echo -e "Environment: ${YELLOW}PRODUCTION${NC}"
        echo -e "Backend URL: ${YELLOW}https://oasa-backend.onrender.com${NC}"
    else
        echo -e "Environment: ${RED}UNKNOWN${NC}"
    fi
    echo ""
}

if [ "$1" = "local" ]; then
    echo -e "${BLUE}🔄 Switching to LOCAL backend (localhost:3001)...${NC}"
    
    # Switch to local
    sed -i 's/^NEXT_PUBLIC_BACKEND_URL=https:\/\/oasa-backend\.onrender\.com$/# NEXT_PUBLIC_BACKEND_URL=https:\/\/oasa-backend.onrender.com/' "$ENV_FILE"
    sed -i 's/^# NEXT_PUBLIC_BACKEND_URL=http:\/\/localhost:3001$/NEXT_PUBLIC_BACKEND_URL=http:\/\/localhost:3001/' "$ENV_FILE"
    
    # If neither was found, add the local one
    if ! grep -q "NEXT_PUBLIC_BACKEND_URL=http://localhost:3001" "$ENV_FILE"; then
        echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:3001" >> "$ENV_FILE"
    fi
    
    echo -e "${GREEN}✅ Switched to LOCAL backend${NC}"
    echo -e "${YELLOW}🔄 Please restart your dev server: npm run dev${NC}"
    echo ""
    
elif [ "$1" = "prod" ]; then
    echo -e "${BLUE}🔄 Switching to PRODUCTION backend (oasa-backend.onrender.com)...${NC}"
    
    # Switch to production
    sed -i 's/^NEXT_PUBLIC_BACKEND_URL=http:\/\/localhost:3001$/# NEXT_PUBLIC_BACKEND_URL=http:\/\/localhost:3001/' "$ENV_FILE"
    sed -i 's/^# NEXT_PUBLIC_BACKEND_URL=https:\/\/oasa-backend\.onrender\.com$/NEXT_PUBLIC_BACKEND_URL=https:\/\/oasa-backend.onrender.com/' "$ENV_FILE"
    
    # If neither was found, add the production one
    if ! grep -q "NEXT_PUBLIC_BACKEND_URL=https://oasa-backend.onrender.com" "$ENV_FILE"; then
        echo "NEXT_PUBLIC_BACKEND_URL=https://oasa-backend.onrender.com" >> "$ENV_FILE"
    fi
    
    echo -e "${GREEN}✅ Switched to PRODUCTION backend${NC}"
    echo -e "${YELLOW}🔄 Please restart your dev server: npm run dev${NC}"
    echo ""
    
elif [ "$1" = "status" ]; then
    show_status
    
else
    echo -e "${YELLOW}Usage: $0 {local|prod|status}${NC}"
    echo "  local  - Switch to localhost:3001"
    echo "  prod   - Switch to oasa-backend.onrender.com"
    echo "  status - Show current configuration"
    echo ""
    show_status
    exit 1
fi

show_status
