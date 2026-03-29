import pytest
import sqlite3
import os
from db_api.helper_funcs import (
    add_programs_table,
    add_program,
    retrieve_used_urls,
    get_database_data
)

@pytest.fixture
def temp_db(tmp_path, monkeypatch):
    """Fixture to create a temporary database for testing."""
    import db_api.helper_funcs
    db_file = tmp_path / "test_info.db"
    db_path = str(db_file)
    monkeypatch.setattr(db_api.helper_funcs, 'DEFAULT_DB_FILE', db_path)
    
    # Initialize the database table
    add_programs_table()
    
    yield db_path

def test_add_programs_table(temp_db):
    """Test that the table is created without errors and exists."""
    # It was already initialized in the fixture, so let's check its existence
    db_path = temp_db
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='programs';")
        assert cursor.fetchone() is not None

def test_add_program(temp_db):
    """Test adding a program to the database."""
    res = add_program("http://example.com/xyz", "Example affiliate", 45.0, "5%")
    assert "Successfully added" in res
    
    # Verify via retrieve_used_urls
    urls = retrieve_used_urls()
    assert "http://example.com/xyz" in urls
    assert len(urls) == 1

def test_get_database_data(temp_db):
    """Test fetching full rows as dictionaries."""
    add_program("http://example.com/1", "Desc1", 10.0, "1%")
    add_program("http://example.com/2", "Desc2", 20.0, "2%")
    
    data = get_database_data()
    assert len(data) == 2
    assert data[0]["url"] == "http://example.com/1"
    assert data[1]["url"] == "http://example.com/2"
    assert "desc" in data[0]
    assert data[0]["desc"] == "Desc1"
    assert "id" in data[0]
