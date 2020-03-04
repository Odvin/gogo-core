#!/bin/bash
echo "sleeping for 1 seconds"
sleep 1

echo db_setup.sh time now: `date +"%T" `

mysql -uroot -p$MYSQL_ROOT_PASSWORD -h mysql-db <<EOF
ALTER USER '$MYSQL_USER' IDENTIFIED WITH mysql_native_password BY '$MYSQL_PASSWORD';
flush privileges;
EOF

mysql -u$MYSQL_USER -p$MYSQL_PASSWORD -h mysql-db < /db-operations/seeds.sql
