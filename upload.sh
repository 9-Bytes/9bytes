#!/bin/bash
source .env

# FTP account information
USER="epiz_33867926"
PASS=$FTP_PASSWORD
HOST="ftpupload.net"

# Local directory to upload
LOCAL_DIR="build"

# Remote directory to upload to
REMOTE_DIR="/htdocs"

# Connect to FTP server and upload files
ncftpput -R -v -u $USER -p $PASS $HOST $REMOTE_DIR $LOCAL_DIR/*

# Check if the upload was successful
if [ "$?" -eq 0 ]
then
    # Print success message
    echo -e "🚀\033[1;32m Upload complete!\033[0m"
else
    # Print error message
    echo -e "❌\033[1;31m Upload failed!\033[0m"
fi
