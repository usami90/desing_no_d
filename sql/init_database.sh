#run the setup script to create the DB and the schema in the DB
mysql -u docker -pdocker test_database < "/docker-entrypoint-initdb.d/01_DB_DDL.sql"
mysql -u docker -pdocker test_database < "/docker-entrypoint-initdb.d/all_users_insert.sql"
mysql -u docker -pdocker test_database < "/docker-entrypoint-initdb.d/all_skills_insert.sql"