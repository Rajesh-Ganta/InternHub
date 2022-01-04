from os import name
import sqlite3 as sql
import uvicorn
import email, smtplib, ssl
from sqlite3.dbapi2 import ProgrammingError

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import datetime
from datetime import date

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

@app.post('/register')
async def user_data(req:Request):
	conn = sql.connect("internhub.db")
	data = await req.json()
	sid = data["data"]["sid"]
	full_name = data["data"]["name"]
	email = data["data"]["email"]
	user_type = "student"
	sqli = "INSERT INTO USERS(sid,full_name,email,user_type) VALUES(?,?,?,?)"
	conn.execute(sqli,(sid,full_name,email,user_type))
	conn.commit()
	return data


#fetching data
def fetch_note_data():
    con = sql.connect("internhub.db")
    data = []
    cur = con.cursor()
    cur.execute("SELECT * FROM NOTIFICATION")
    rows = cur.fetchall()
    for row in rows:
    	data.append({"notification_id":row[0],"logo":row[1],"company_name":row[2],"tag_line":row[3],"isDelete":row[4],"isViewed":row[5]})
    con.close()
    return data

@app.get('/notify')
def get_notification():
	return fetch_note_data()

def insert_note_data(data):
    con= sql.connect("internhub.db")
    query = "INSERT INTO NOTIFICATION( logo, company_name, tag_line,isDelete,isViewed) VALUES(?,?,?,?,?)"
    con.execute(query,(data["logo"],data["company_name"],data["tag_line"],"0","0"))
    con.commit()
    con.close()

@app.post('/notify_post')
async def user_data(req:Request):
    data = await req.json()
    insert_note_data(data)
    return data

def delete_note_data(id):
    con=sql.connect("internhub.db")
    sqli="UPDATE NOTIFICATION SET isDelete = ? WHERE notification_id = ?"
    con.execute(sqli,("1",id))
    con.commit()
    con.close()

@app.post('/delete_not')
async def del_not(req:Request):
    data = await req.json()
    print(data)
    delete_note_data(data["id"])
    return data

def view_note_data(id):
    con=sql.connect("internhub.db")
    query="UPDATE NOTIFICATION SET isViewed = ? WHERE notification_id = ?"
    con.execute(query,("1",id))
    con.commit()
    con.close()

def fetch_notices():
  conn = sql.connect("internhub.db")
  data = []
  cur  = conn.cursor()
  query = "SELECT * FROM JOB_NOTICES"
  cur.execute(query)
  rows = cur.fetchall()
  for row in rows:
    data.append({
                  "notice_id" : row[0],
                  "company_name" : row[1],
                  "company_sector" : row[2],
                  "company_website" : row[3],
                  "visit_date" : row[4],
                  "logo_url" : row[5],
                  "address" : row[6],
                  "registration_type" : row[7],
                  "poc" : row[8],
                  "poc_email_phone" : row[9],
                  "job_description" : row[10],
                  "posting_place" : row[11],
                  "package_details" : row[12],
                  "eligibility_criteria" : row[13],
                  "bond_details" : row[14],
                  "job_duration" : row[15],
                  "stiphend" : row[16],
                  "job_role" : row[17],
                  "recruitment_type" : row[18],
                  "number_recruits" : row[19],
                  "cse" : row[20],
                  "ece" : row[21],
                  "mech" : row[22],
                  "civil" : row[23],
                  "chem" : row[24],
                  "mme" : row[25],
                  "resume_shortlist" : row[26],
                  "online_test" : row[27],
                  "aptitude_test" : row[28],
                  "technical_test" : row[29],
                  "group_discussion" : row[30],
                  "technical_interview" : row[31],
                  "mr_interview" : row[32],
                  "hr_interview" : row[33],
                  "other_details" : row[34],
                  "third_party_details" : row[35],
                  "create_date": row[36]
                })
  conn.close()
  return data

@app.get('/get_notices')
def get_notices():
	return fetch_notices()

def delete_notice(notice_id):
  conn = sql.connect("internhub.db")
  query = "DELETE FROM JOB_NOTICES WHERE notice_id = " + str(notice_id)
  conn.execute(query)
  conn.commit()

@app.post('/del_notice')
async def del_notices(req: Request):
  data = await req.json()
  print(data)
  return delete_notice(data["notice_id"])

def insert_notice(data):
  conn = sql.connect("internhub.db")
  query = '''INSERT INTO JOB_NOTICES
              (
              company_name ,company_sector ,company_website ,visit_date ,logo_url ,
              address ,registration_type ,poc ,poc_email_phone ,job_description ,
              posting_place ,package_details ,eligibility_criteria ,bond_details ,job_duration ,
              stiphend ,job_role ,recruitment_type ,number_recruits ,cse ,
              ece ,mech ,civil ,chem ,mme ,
              resume_shortlist ,online_test ,aptitude_test ,technical_test ,group_discussion ,
              technical_interview ,mr_interview ,hr_interview ,other_details ,third_party_details,'create_date'
              )
              VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
              '''
  conn.execute(query,(data["company_name"], data["company_sector"], data["company_website"], data["visit_date"], data["logo_url"],
                      data["address"], data["registration_type"], data["poc"], data["poc_email_phone"], data["job_description"],
                      data["posting_place"], data["package_details"], data["eligibility_criteria"], data["bond_details"], data["job_duration"],
                      data["stiphend"], data["job_role"], data["recruitment_type"], data["number_recruits"],data["cse"],
                      data["ece"], data["mech"], data["civil"], data["chem"], data["mme"],
                      data["resume_shortlist"], data["online_test"], data["aptitude_test"], data["technical_test"], data["group_discussion"],
                      data["technical_interview"], data["mr_interview"], data["hr_interview"], data["other_details"], data["third_party_details"], date.today()
                      )
              )
  conn.commit()
  conn.close()
  send_mails()
  #insert_note_data({"company_name": data["company_name"], "logo" :data["logo_url"], "tag_line": "Be the Frist to apply to " + data["company_name"]})

@app.post('/create_notice')
async def create_notice(req: Request):
  data = await req.json()
  return insert_notice(data)

def send_mails(receiver = "S160215@rguktsklm.ac.in"):
  smtp_server = "smtp.gmail.com"
  sender_email = "test.internhub@gmail.com"  # Enter your address
  password = "internhub@123"

  receiver_email = receiver  # Enter receiver address
  subject = "Check out the new notice about Internship!"
  # body_plain = "This is an email with attachment sent from Python"

  body_html = '''
  <html>
    <body>
      <h3>Dear Students,</h3>
        There is a Notice posted in Placement Portal InternHub.<br>
        About an Intern or Job Oppurtunity <br>
        Visit the website and go through the details of offer<br>
        Note: Complete your registration process as early as possible <a href="http://192.168.111.86:4200/admindb/posts" target="blank">click here</a>
      <h4>- Thanks and Regards</h4>
      Team Intern Hub
    </body>
  </html>
  '''
  # Create a multipart message and set headers
  message = MIMEMultipart()
  message["From"] = sender_email
  message["To"] = receiver_email
  message["Subject"] = subject
  #message["Bcc"] = receiver_email  # Recommended for mass emails

  # Add body to email
  # message.attach(MIMEText(body_plain, "plain"))
  message.attach(MIMEText(body_html, "html"))


  # to attach a file
  '''
  filename = "Israel Resume.pdf"  # In same directory as script

  # Open PDF file in binary mode
  with open(filename, "rb") as attachment:
      # Add file as application/octet-stream
      # Email client can usually download this automatically as attachment
      part = MIMEBase("application", "octet-stream")
      part.set_payload(attachment.read())

  # Encode file in ASCII characters to send by email
  encoders.encode_base64(part)

  # Add header as key/value pair to attachment part
  part.add_header(
      "Content-Disposition",
      f"attachment; filename= {filename}",
  )

  # Add attachment to message and convert message to string
  message.attach(part)
  '''
  text = message.as_string()

  # Log in to server using secure context and send email
  context = ssl.create_default_context()
  with smtplib.SMTP_SSL(smtp_server, 465, context=context) as server:
      server.login(sender_email, password)
      server.sendmail(sender_email, receiver_email, text)
      print("Sent successfully")

@app.post('/mail')
async def mail(req: Request):
  data = await req.json()
  return send_mails(data["mail"])

# create student profile
def create_profile(data):
    print("Create Student Called")
    con = sql.connect("Internhub.db")
    query = '''INSERT INTO PersonalData(first_name,
               last_name,email,dob,address1,address2,
               city,state,pincode)
               VALUES (?,?,?,?,?,?,?,?,?)'''
    con.execute(query,(
                data["fname"],
                data["lname"],data["email"],data["dob"],
                data["address1"],data["address1"],
                data["city"], data["state"], data["pin"]
    ))
    con.commit()
    print(data["fname"])

    query = '''INSERT INTO EducationalData(
              collegename,
               rollnumber,
               branch,
               clgjoining,
                clgcompletion,
                e1s1 ,
                e1s2 ,
                e2s1 ,
                e2s2 ,
                e3s1 ,
                e3s2 ,
                e4s1 ,
                e4s2 ,
                enggcgpa ,
                pucbranch,
                pucjoiningdate,
                puccompletiondate ,
                p1cgpa ,
                p2cgpa ,
                puccgpa ,
                sscboard ,
                ssccompletiondate ,
                ssccgpa ,
                skills ,
                resume )
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'''
    con.execute(query,(
                data["clg_name"],data["roll_number"],data["enggbranch"],data["enggdatejoin"],data["enggdatecomplete"],data["engge1s1"],data["engge1s2"],
                data["engge2s1"],data["engge2s2"],data["engge3s1"],data["engge3s2"],data["engge4s1"],data["engge4s2"],data["enggcgpa"],data["pucbranch"],
                data["pucdatejoin"],data["pucdatecomplete"],data["puc1"],data["puc2"],
                data["puccgpa"],data["xboard"],
                data["xdate"], data["xcgpa"], data["skills"],data["path"]
    ))
    con.commit()
    con.close()
    return data["roll_number"]

@app.post('/create_student')
async def create_student(req: Request):
    data = await req.json()
    return create_profile(data)

def fetch_profile_data():
    con = sql.connect("internhub.db")
    data = []
    cur = con.cursor()
    cur.execute("SELECT * FROM PersonalData")
    rows = cur.fetchall()
    for row in rows:
        data.append({
            "sid":row[0],
            "firstname":row[1],
            "lastname":row[2],
            "email":row[3],
            "dob":row[4],
            "address1":row[5],
            "address2":row[6],
            "city":row[7],
            "state":row[8],
            "pincode":row[9]
        })
    con.close()
    return data

@app.get('/profile_data')
def view():
    return fetch_data()

def insert_applications(data):
  print("insert called")
  con = sql.connect("internhub.db")
  query = '''INSERT INTO APPLICATIONS(
           student_id ,
           name ,
           email ,
           phone ,
           company_name,
           applied_time,
           notice_id
           ) VALUES( ?, ?, ?, ?, ?, ?, ?)'''
  con.execute(query, (data["student_id"], data["name"], data["email"], data["phone"], data["company_name"], datetime.datetime.now(),data["notice_id"]))
  con.commit()
  con.close()
  return True

@app.post('/insert_application')
async def insert_application(req: Request):
    data = await req.json()
    return insert_applications(data)


#fetching data
def fetch_applications():
    con = sql.connect("internhub.db")
    data = []
    cur = con.cursor()
    cur.execute("SELECT * FROM APPLICATIONS")
    rows = cur.fetchall()
    for row in rows:
    	data.append({"application_id":row[0],"student_id":row[1],"name":row[2],"email":row[3],"phone":row[4],"company_name":row[5], "applied_time" : row[6], "notice_id": row[7]})
    con.close()
    return data

#CREATE TABLE "APPLICATIONS" ( "application_id" INTEGER, "student_id" VARCHAR(255), "name" VARCHAR(255), "email" VARCHAR(255), "phone" VARCHAR(255), "company_name" VARCHAR(255), "applied_time" VARCHAR(255), "notice_id" VARCHAR(255), PRIMARY KEY("application_id" AUTOINCREMENT) )

@app.get('/fetch_application')
def fetch_application():
  return fetch_applications()


def fetch_profile(email):
    print("fetch called")
    con = sql.connect("internhub.db")
    cur = con.cursor()
    query = "SELECT * from PersonalData WHERE email = '" + str(email) + "'"
    print(query)
    cur.execute(query)
    rows = cur.fetchall()
    sid = ""
    data = []
    for row in rows:
        sid = row[0]
        data.append({
            "sid":row[0],
            "fname":row[1],
            "lname":row[2],
            "email":row[3],
            "dob":row[4],
            "address1":row[5],
            "address2":row[6],
            "city":row[7],
            "state":row[8],
            "pin":row[9]
        })
    query = "SELECT * from EducationalData WHERE eid = '" + str(sid) + "'"
    cur.execute(query)
    print(query)
    rows = cur.fetchall()
    print(rows)
    for row in rows:
      data.append({
          "eid":row[0],
          "clg_name":row[1],
          "roll_number":row[2],
          "enggbranch":row[3],
          "enggdatejoin":row[4],
          "enggdatecomplete":row[5],
          "engge1s1":row[6],
          "engge1s2":row[7],
          "engge2s1":row[8],
          "engge2s2":row[9],
          "engge3s1":row[10],
          "engge3s2":row[11],
          "engge4s1":row[12],
          "engge4s2":row[13],
          "enggcgpa":row[14],
          "pucbranch":row[15],
          "pucdatejoin":row[16],
          "pucdatecomplete":row[17],
          "puc1":row[18],
          "puc2":row[19],
          "puccgpa":row[20],
          "xboard":row[21],
          "xdate":row[22],
          "xcgpa":row[23],
          "skills":row[24],
          "path":row[25]
      })
    con.close()
    print(data)
    data[0].update(data[1])
    return data[0]

# create student profile
def create_profile(data):
    print("Create Student Called")
    con = sql.connect("internhub.db")
    query = '''INSERT INTO PersonalData(first_name,
               last_name,email,dob,address1,address2,
               city,state,pincode)
               VALUES (?,?,?,?,?,?,?,?,?)'''
    con.execute(query,(
                data["fname"],
                data["lname"],data["email"],data["dob"],
                data["address1"],data["address1"],
                data["city"], data["state"], data["pin"]
    ))
    con.commit()
    print(data)

    query1 = '''INSERT INTO EducationalData(
              collegename,
               rollnumber,
               branch,
               clgjoining,
                clgcompletion,
                e1s1 ,
                e1s2 ,
                e2s1 ,
                e2s2 ,
                e3s1 ,
                e3s2 ,
                e4s1 ,
                e4s2 ,
                enggcgpa ,
                pucbranch,
                pucjoiningdate,
                puccompletiondate ,
                p1cgpa ,
                p2cgpa ,
                puccgpa ,
                sscboard ,
                ssccompletiondate ,
                ssccgpa ,
                skills ,
                resume )
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'''
    con.execute(query1,(
                data["clg_name"],data["roll_number"],data["enggbranch"],data["enggdatejoin"],data["enggdatecomplete"],data["engge1s1"],data["engge1s2"],
                data["engge2s1"],data["engge2s2"],data["engge3s1"],data["engge3s2"],data["engge4s1"],data["engge4s2"],data["enggcgpa"],data["pucbranch"],
                data["pucdatejoin"],data["pucdatecomplete"],data["puc1"],data["puc2"],
                data["puccgpa"],data["xboard"],
                data["xdate"], data["xcgpa"], data["skills"],data["path"]
    ))
    con.commit()
    con.close()
    return data["roll_number"]

@app.get('/profile_data/{email}')
async def profile_data(email):
    print(email)
    return fetch_profile(email)

#insert
#http requests
# post , get
# response print


# old fetch notices
# def fetch_notices():
#   conn = sql.connect("internhub.db")
#   data = []
#   cur  = conn.cursor()
#   query = "SELECT * FROM NOTICES"
#   cur.execute(query)
#   rows = cur.fetchall()
#   for row in rows:
#     data.append({"notice_id": row[0], "company_name":row[1], "role":row[2], "offer_type":row[3],"package":row[4], "visit_date":row[5], "logo_url" : row[6]})
#   conn.close()
#   return data


# Creating table

# conn = sql.connect("internhub.db")
# query = "CREATE TABLE NOTICES(
#    notice_id CHAR(255) PRIMARY KEY,
#    company_name CHAR(255) NOT NULL,
#    role CHAR(255),
#    offer_type CHAR(255),
#    package char(255),
#    visit_date char(255),
#      logo_url char(255))"
# conn.execute(query)
# conn.commit()


# Creating JOB_NOTICE table
# conn = sql.connect("internhub.db")
# query = """CREATE TABLE JOB_NOTICES(
#             notice_id INTEGER  PRIMARY KEY AUTOINCREMENT,
#             company_name CHAR(255),
#             company_sector CHAR(255),
#             company_website CHAR(255),
#             visit_date CHAR(255),
#             logo_url CHAR(255),
#             address CHAR(255),
#             registration_type CHAR(255),
#             poc CHAR(255),
#             poc_email_phone CHAR(255),
#             job_description CHAR(255),
#             posting_place CHAR(255),
#             package_details CHAR(255),
#             eligibility_criteria CHAR(255),
#             bond_details CHAR(255),
#             job_duration CHAR(255),
#             stiphend CHAR(255),
#             job_role CHAR(255),
#             recruitment_type CHAR(255),
#             number_recruits CHAR(255),
#             cse CHAR(255),
#             ece CHAR(255),
#             mech CHAR(255),
#             civil CHAR(255),
#             chem CHAR(255),
#             mme CHAR(255),
#             resume_shortlist CHAR(255),
#             online_test CHAR(255),
#             aptitude_test CHAR(255),
#             technical_test CHAR(255),
#             group_discussion CHAR(255),
#             technical_interview CHAR(255),
#             mr_interview CHAR(255),
#             hr_interview CHAR(255),
#             other_details CHAR(255),
#             third_party_details CHAR(255),
#              create_date CHAR(255)
#         )"""
# conn.execute(query)
# conn.commit()

# Inserting JOB_notices
# conn = sql.connect("internhub.db")
# query = '''INSERT INTO JOB_NOTICES
#             (
#             company_name ,company_sector ,company_website ,visit_date ,logo_url ,
#             address ,registration_type ,poc ,poc_email_phone ,job_description ,
#             posting_place ,package_details ,eligibility_criteria ,bond_details ,job_duration ,
#             stiphend ,job_role ,recruitment_type ,number_recruits ,cse ,
#             ece ,mech ,civil ,chem ,mme ,
#             resume_shortlist ,online_test ,aptitude_test ,technical_test ,group_discussion ,
#             technical_interview ,mr_interview ,hr_interview ,other_details ,third_party_details
#             )
#             VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
#             '''
# conn.execute(query,("A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A","A"))
# conn.commit()


# inserting data into table

# For Inserting Data Into Table
# conn = sql.connect("internhub.db")
# sql = "INSERT INTO NOTICES(notice_id, company_name, role, offer_type, package, visit_date, logo_url) VALUES(?,?,?,?,?,?,?)"
# conn.execute(sql,("1","Wipro","BackEnd Developer","Intern", "3.5 LPA", "31-12-2021","data:image/png;base64,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"))
# conn.execute(sql,("2","TCS","FrontEnd Developer","Job", "5 LPA", "05-12-2021","https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D10158627739211250&imgrefurl=https%3A%2F%2Fm.facebook.com%2FTataConsultancyServices%2Fphotos%2Fa.450323011249%2F10158627739211250%2F%3Ftype%3D3%26p%3D30&tbnid=QIunxyBEBH7CdM&vet=12ahUKEwir9LLK7bf0AhX0oUsFHSDaDusQMygJegUIARDiAQ..i&docid=d6SiYg-ndOGvgM&w=900&h=900&q=tcs%20logo&ved=2ahUKEwir9LLK7bf0AhX0oUsFHSDaDusQMygJegUIARDiAQ"))
# conn.execute(sql,("3","HCL","BackEnd Developer","Intern", "3.6 LPA", "04-12-2021","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAADNCAMAAAC8cX2UAAAAmVBMVEUAZrP///8AX7AAZLKFqtMAYbGpwuAAZ7MAXa8AVqyryOP7/f7d6fQAXbCfvNygv91BgsEAWa0AV6zz+Px6oc7n8fgAU6v2+fzm8Pi5z+bU5fKFstgrd7vK3+9RhcEib7hai8Nmksdvmcplm8w4fL6/1uqVt9pXk8hEisRhns9yo9E0c7gddryVvN5KkchSicMee76gx+RGfL09h6iuAAAEZElEQVR4nO3Z23aqOhQGYExIEymoATlIS/EEuqu2bt//4TZobWVGVrvGKOyb/xtj3eg0zcyJGZZlAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHSMG/4+4hwkBPukqn9CiLuRRnu/ntJPCMLM+psIaQmmlLDy9ct8sZyeLRfzl9Nzzqsvqm/kH5sT1v+QOFs5Dw3jSbMXYv1AjJ+/IqTFtCfXC3s0K7LUDYMgiOM4CMLETbNiNrKXLznT4qY9XpLmnI2w+salO2jKdo1eSP1EAgaF/ExbaJ2vHrI0DGjQhzh0U2djaSGvzW1pSLDoPW05/If2omSNCGGFNOJVffxYRdZqlgSPLSl/JZa+smur0Yx+O5P9L/KITnY6aaQtI2NcrsuBRfuDMSRtivzSrNobYzJlZre6Jf032osRa4w913RcHu16sjljk7GR3GO1tcN6f5sLIMvP7UaOOSC9r3HuZaQTybt3mzb3N7Sb6YnVWa9Lup0Dd1ZuJvvKZFOmxmZ/0lY92fTz2Pb6zro6X2LSC8f32A1PF3RCx9Vy4GyZ0s8L+5n52quf2EoPpU1XiVtPqi7pOkife1/j3KPny2NRjhoe6Lgk70pa2qabOixzXY3H9by2hNqMmw7V52xvjNbI6/1AU5NkQLtB0O8HM8Vl9EqXajJldIfeK3I8m/4wXKu+s7a80bfPHip405Y+0iUQ29Vg0NbNGlRIumUGzrD3rNmaLrnvZZpzz/jZjP/oNFZL46A7esZwdY2Vf531YOtbamus1IX+See5NJ9eUedZUmJHn16BSxiT4w659G26xlPj0Xv3zibmRnWz/dF4/So2pTt7fJo0vNNxGbwOq2P8yUjbEs3eV1cy75aq0+biQJvLVO/HODfOl2AyrC+Kn4YLOttuVT5LvTIXeSTkNfHq4eXv6WNwUx3kYm1M9kr3nbXlvdNOOOTGL4yteK60hHFpG7grFmlVv1hgyh/KaUqegsVzden2zauciPyhyWfdrXxpVMfxslkvsQndBMnpvIe1UcgP4rTcHPNqLeTHlePSTXCo7nFVZWcUCemDc9drd1W6OtJOzJoHk4z+pRGHj4BoZeR9cae8qZLbRvzuVa5N8NZdmW4kVZcctwEsp91J5uw6ItuMzmjLOATZSp03sHmVa1X4nR10bE/7nZE7QWScu87XSy8t7SL5rsSLk2z0LvSlfjOvcq06fKrpQ7P8HsSjZnEs8oBEhMubCKHlvJxlScukx0laOPY8964XDS4Ko96/ry4Eu8ra4iu7abpuniNiTwLsZd7ojlBMrufTcuzU7w7dJAzD5PLe0BmV08Up58oTn5U6z6e0vTbbDi8nUjCCDjGnAWbE+c04l/lud3q5OJ12u7z6on5LTsKNP9im05ct37/y/9lb/Pqb5gWzJdT8T4YWv5omAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtPgPZkVPvYGqcpcAAAAASUVORK5CYII="))
# conn.execute(sql,("4","Ramersoft","BackEnd Developer","Job", "4.0 LPA", "06-12-2021","data:image/png;base64,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"))
# conn.commit()


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


# _profile tables creation

# query1 ='''CREATE TABLE PersonalData(
#    sid INTEGER PRIMARY KEY AUTOINCREMENT,
#    first_name TEXT NOT NULL,
#    last_name TEXT NOT NULL,
#    email CHAR(255),
#    dob TEXT,
#    address1 TEXT,
#    address2 TEXT,
#    city CHAR(255),
#    state CHAR(255),
#    pincode CHAR(255)
# )'''
# query2 = '''CREATE TABLE EducationalData(
#     eid INTEGER PRIMARY KEY AUTOINCREMENT,
#     collegename CHAR(255),
#     rollnumber CHAR(10),
#     branch CHAR(255),
#     clgjoining TEXT,
#     clgcompletion TEXT,
#     e1s1 REAL,
#     e1s2 REAL,
#     e2s1 REAL,
#     e2s2 REAL,
#     e3s1 REAL,
#     e3s2 REAL,
#     e4s1 REAL,
#     e4s2 REAL,
#     enggcgpa REAL,
#     pucbranch CHAR(100),
#     pucjoiningdate TEXT,
#     puccompletiondate TEXT,
#     p1cgpa REAL,
#     p2cgpa REAL,
#     puccgpa REAL,
#     sscboard TEXT,
#     ssccompletiondate TEXT,
#     ssccgpa REAL,
#     skills TEXT,
#     resume TEXT
# )'''


# con = sql.connect("internhub.db")
# con.execute(query1)
# con.execute(query2)
# con.close()


# applications table
# query = '''CREATE TABLE APPLICATIONS(
#    application_id INTEGER PRIMARY KEY AUTOINCREMENT,
#    student_id VARCHAR(255),
#    name VARCHAR(255),
#    email VARCHAR(255),
#    phone VARCHAR(255),
#    company_name VARCHAR(255),
#    applied_time VARCHAR(255),
#    notice_id VARCHAR(255)
# )'''

# con = sql.connect("internhub.db")
# con.execute(query)
# con.close()


# insert application query
# query = '''INSERT INTO APPLICATIONS(
#            student_id ,
#            name ,
#            email ,
#            phone ,
#            company_name,
#            notice_id
#            ) VALUES( ?, ?, ?, ?, ?, ?)'''

# con = sql.connect("internhub.db")
# con.execute(query, ("S160215", "G.Rajesh", "rajeshganta123456@gmail.com", "9492733997", "TCS", "1" ))
# con.commit()
# con.close()



if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='192.168.111.86')
