#Just to register the deploy process, this is not a real deployment script
#SSH Command
rm -rf /var/www/red-box/

#Local Command
npm run build
scp -r .\build\ root@69.62.97.68:/var/www/red-box 

#SSH Command
sudo chown -R www-data:www-data /var/www/red-box
sudo chmod -R 755 /var/www/red-box

