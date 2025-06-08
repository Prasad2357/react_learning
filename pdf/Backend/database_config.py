import urllib.parse

# Encode special characters in password
COUCHDB_PASSWORD_ENCODED = urllib.parse.quote("123456")

# CouchDB URL
COUCHDB_URL = f"http://admin:{COUCHDB_PASSWORD_ENCODED}@127.0.0.1:5984/"
DB_NAMES = ["registered_user","pdf_storer"]