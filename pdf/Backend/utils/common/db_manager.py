import couchdb
from database_config import COUCHDB_URL, DB_NAMES

class DatabaseManager:
    def __init__(self) -> None:
        """
        Initialize CouchDB connection and create/access databases.
        """
        self.couch = couchdb.Server(COUCHDB_URL)
        self.databases = {db: self.get_or_create_db(db) for db in DB_NAMES}

    def get_or_create_db(self, db_name: str):
        """
        Checks if a database exists; if not, creates it.
        """
        return self.couch[db_name] if db_name in self.couch else self.couch.create(db_name)

# Instantiate a global db_manager to be used across the project
db_manager = DatabaseManager()