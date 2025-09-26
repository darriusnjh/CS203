import os
from loadvectordb import vectordb
vectordb_client = vectordb()
query = "men leather shoes" 

content = vectordb_client.query_vectordb(query)
print(content)
