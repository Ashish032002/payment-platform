
import os, csv, pymysql

cfg = {
    "host": os.getenv("DB_HOST", "127.0.0.1"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASS", "root"),
    "database": os.getenv("DB_NAME", "appdb"),
    "cursorclass": pymysql.cursors.DictCursor
}
conn = pymysql.connect(**cfg)
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS bronze_payments (id INT PRIMARY KEY, user_id INT, amount DECIMAL(10,2));")
conn.commit()

in_csv = os.path.join(os.path.dirname(__file__), "input", "payments.csv")
if os.path.exists(in_csv):
    with open(in_csv, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cur.execute("REPLACE INTO bronze_payments (id,user_id,amount) VALUES (%s,%s,%s)",
                        (row["id"], row["user_id"], row["amount"]))
    conn.commit()

cur.execute("CREATE TABLE IF NOT EXISTS silver_payments LIKE bronze_payments;")
cur.execute("REPLACE INTO silver_payments SELECT * FROM bronze_payments;")
conn.commit()

cur.execute("CREATE TABLE IF NOT EXISTS gold_payment_summary AS SELECT user_id, SUM(amount) as total FROM silver_payments GROUP BY user_id;")
conn.commit()
print("ETL complete.")
