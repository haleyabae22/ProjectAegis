from sqlite3 import connect

DB_FILE = "../info.db"
# check_same_thread=False prevents errors if ADK runs the tool in a background async task
conn = connect(DB_FILE, check_same_thread=False)
cursor = conn.cursor()

def add_program(url: str, desc: str, money: float, rate: str) -> str:
    """
    Adds a new affiliate program or entry to the database.
    """
    try:
        cursor.execute("""
        INSERT INTO programs (url, desc, money, rate) 
        VALUES (?, ?, ?, ?);
                     """, (url, desc, money, rate))
        conn.commit()
        return f"Successfully added {url} to the database."
    except Exception as e:
        return f"Database error: {str(e)}"

def retrieve_used_urls() -> list:
    """
    Retrieves a list of all the URLs currently stored in the database.
    """
    cursor.execute("""SELECT url FROM programs;""")
    # Flatten the list of tuples into a simple list of strings
    return [row[0] for row in cursor.fetchall()]

def get_database_data() -> list:
    """
    Retrieves all records and columns from the programs database.
    """
    cursor.execute("SELECT * FROM programs;")
    # Convert tuples to dictionaries so the AI sees column names (highly recommended!)
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]