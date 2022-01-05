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
