#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ASCII Art
echo -e "${BLUE}"
echo "╭──────────────────────────────────────────────╮"
echo "│                                              │"
echo "│           🏮  MYSTIC INDIA  🏮              │"
echo "│                                              │"
echo "│     Journey Through India's Rich Heritage    │"
echo "│                                              │"
echo "╰──────────────────────────────────────────────╯"
echo -e "${NC}"

# Make script executable if it's not
if [ ! -x "$0" ]; then
    echo -e "${YELLOW}Making launch script executable...${NC}"
    chmod +x "$0"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    echo -e "Download from: ${BLUE}https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Print system info
echo -e "${BLUE}System Information:${NC}"
echo -e "• Node.js: $(node -v)"
echo -e "• npm: $(npm -v)"
echo -e "• OS: $(uname -s)"
echo ""

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies... This might take a minute ⏳${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install frontend dependencies. Please check your internet connection and try again.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Frontend dependencies installed successfully! ✅${NC}"
else
    echo -e "${GREEN}Frontend dependencies already installed ✅${NC}"
fi

# Install backend dependencies if node_modules doesn't exist
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies... This might take a minute ⏳${NC}"
    cd backend && npm install && cd ..
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install backend dependencies. Please check your internet connection and try again.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Backend dependencies installed successfully! ✅${NC}"
else
    echo -e "${GREEN}Backend dependencies already installed ✅${NC}"
fi

# Start the development server
echo -e "\n${BLUE}Starting Mystic India application...${NC}"
echo -e "${YELLOW}Frontend will be available at${NC} ${GREEN}http://localhost:8080/${NC}"
echo -e "${YELLOW}Backend API is running at${NC} ${GREEN}http://localhost:3001/${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}\n"

npm run dev

exit 0
