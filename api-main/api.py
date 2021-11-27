import sqlite3 as sql

def fetch_data():
	conn = sql.connect("internhub.db")
	data = {}
	cur = conn.cursor()
	cur.execute("SELECT * FROM USERS")
	rows = cur.fetchall()
	for row in rows:
		data[row[0]] = {"fname":row[1],"email":row[2],"user_type":row[3]}
	conn.close()
	return data

from fastapi import FastAPI,Request

app = FastAPI()

origins = ["*"]

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def get_userdata():
	return fetch_data()

@app.post('/userdata')
async def user_data(req:Request):
	conn = sql.connect("internhub.db")
	data = await req.json()
	sid = data["data"]["sid"]
	full_name = data["data"]["name"]
	email = data["data"]["email"]
	user_type = data["data"]["userType"]
	sqli = "INSERT INTO USERS(sid,full_name,email,user_type) VALUES(?,?,?,?)"
	conn.execute(sqli,(sid,full_name,email,user_type))
	conn.commit()
	return data

#insert
#http requests 
# post , get	
# response print 






# For Creating A Table
# #Creating table
# sql ='''CREATE TABLE USERS(
#    sid CHAR(255) PRIMARY KEY,
#    full_name CHAR(255) NOT NULL,
#    email CHAR(255),
#    user_type CHAR(255)
# )'''
# conn.execute(sql)

#For Inserting Data Into Table
# sql = "INSERT INTO USERS(sid,full_name,email,user_type) VALUES(?,?,?,?)"
# conn.execute(sql,("S160552","GURUNADH","s160552@rguktsklm.ac.in","student"))

# sql = "INSERT INTO USERS(sid,full_name,email,user_type) VALUES(?,?,?,?)"
# conn.execute(sql,("TEST123","TESTER","test@internhub.com","student"))

#FOR updating data into table
# sql = ''' UPDATE USERS
#               SET user_type = ? 
#               WHERE sid = ?'''
#     cur = conn.cursor()
#     cur.execute(sql, ("S160552","admin"))
# conn.commit()

#FOR SELECTING DATA
# cur = conn.cursor()
# cur.execute("SELECT * FROM tasks")
# rows = cur.fetchall()
# for row in rows:
#     print(row)
