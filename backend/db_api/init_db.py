import sqlite3
import os

DB_FILE = "../programs.db"

# Delete the database file if it exists to ensure a clean start
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)

# Connect to the SQLite database (this will create the file)
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Create the 'destinations' table
cursor.execute("""
CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    desc TEXT NOT NULL,
    money REAL NOT NULL,
    rate TEXT NOT NULL
)
""")


cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    citizenship TEXT,
    zip TEXT,
    monthly_income REAL,
    assets REAL,
    housing_cost REAL,
    utility_cost REAL,
    dependent_care REAL
)
""")


# Commit the changes and close the connection
conn.commit()
conn.close()

print(f"Database '{DB_FILE}' created and populated successfully.")
print(f"Absolute path: {os.path.abspath(DB_FILE)}")