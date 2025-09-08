
# ETL (lightweight)
Runnable Python ETL that:
1) Reads CSV from `etl/input/`
2) Loads into MySQL using `mysqlclient` or `pymysql`
3) Creates bronze/silver/gold demo tables

Configure via env:
- DB_HOST (default localhost)
- DB_PORT (3306)
- DB_USER (root)
- DB_PASS (root)
- DB_NAME (appdb)
