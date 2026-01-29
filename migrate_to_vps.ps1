# Configuration
$VPS_IP = "84.32.84.32"
$VPS_USER = "root"
$DB_NAME = "gatching"
$BACKUP_DIR = "C:\gatching_temp_backup"

Write-Host "🚀 Starting Database Migration to VPS ($VPS_IP)..." -ForegroundColor Cyan

# 1. Clean previous backups
if (Test-Path $BACKUP_DIR) {
    Remove-Item -Recurse -Force $BACKUP_DIR
}
mkdir $BACKUP_DIR | Out-Null

# 2. Dump Local MongoDB
Write-Host "📦 Exporting Local Database..." -ForegroundColor Yellow
mongodump --db $DB_NAME --out $BACKUP_DIR

if (-not (Test-Path "$BACKUP_DIR\$DB_NAME")) {
    Write-Host "❌ Failed to export local database! converting to manual mode..." -ForegroundColor Red
    exit
}

# 3. Upload to VPS
Write-Host "aaS Uploading to VPS (You may be asked for password)..." -ForegroundColor Yellow
scp -r "$BACKUP_DIR\$DB_NAME" "${VPS_USER}@${VPS_IP}:/root/db_upload"

# 4. Restore on VPS
Write-Host "📥 Importing on VPS..." -ForegroundColor Yellow
ssh "${VPS_USER}@${VPS_IP}" "mongorestore --drop --db $DB_NAME /root/db_upload && rm -rf /root/db_upload"

Write-Host "✅ Migration Completed Successfully!" -ForegroundColor Green
Pause
