import os
from sqlite3 import connect
from contextlib import contextmanager

DEFAULT_DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "programs.db")

@contextmanager
def get_db_connection():
    conn = connect(DEFAULT_DB_FILE, check_same_thread=False)
    try:
        yield conn
    finally:
        conn.close()
def add_programs_table():
    def __init__(self):
        self.__name__ = "create_program_table_tool"

    """
    Adds sample programs table for testing.
    """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS programs (
            id INTEGER PRIMARY KEY,
            url TEXT NOT NULL,
            desc TEXT NOT NULL,
            money REAL NOT NULL,
            rate TEXT NOT NULL
        )
        """)
        conn.commit()
    return "Programs table created successfully."


class AddProgram:
    def __init__(self):
        self.__name__ = "append_program_tool"

    def __call__(self, url: str, desc: str, money: float, rate: str):
        """
            Adds a new affiliate program or entry to the database.
            """
        add_programs_table()
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                               INSERT INTO programs (url, desc, money, rate)
                               VALUES (?, ?, ?, ?);
                               """, (url, desc, money, rate))
                conn.commit()
                return f"Successfully added {url} to the database."
        except Exception as e:
            return f"Database error: {str(e)}"

class RetrieveProgram:
    def __init__(self):
        self.__name__ = "retrieve_program_tool"

    def __call__(self, url: str, desc: str, money: float, rate: str) -> dict:
        """
        Retrieves given database information.
        """
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM programs WHERE url = ? AND desc = ? AND money = ? AND rate = ?;",
                           (url, desc, money, rate))
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                result = dict(zip(columns, row))
                print(result)
                return result
            return None


class RetrieveUsedUrls:
    def __init__(self):
        self.__name__ = "retrieve_urls_tool"

    def __call__(self):
        """
        Retrieves a list of all the URLs currently stored in the database.
        """
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""SELECT url
                              FROM programs;""")
            # Flatten the list of tuples into a simple list of strings
            return [row[0] for row in cursor.fetchall()]


class GetDatabaseData:
    def __init__(self):
        self.__name__ = "get_database_tool"

    def __call__(self):
        """
        Retrieves all records and columns from the programs database.
        """
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM programs;")
            # Convert tuples to dictionaries so the AI sees column names
            columns = [col[0] for col in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]

