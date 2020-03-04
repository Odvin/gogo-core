#!/bin/bash
echo "sleeping for 5 seconds"
sleep 5

echo db_setup.sh time now: `date +"%T" `
mysql -h mysql-db -u ggUser -p topSecret51 < /db-operations/privileges.sql
