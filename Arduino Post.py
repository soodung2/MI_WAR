import datetime
import serial
import pymongo
import sys
import time


try :
    connection = pymongo.MongoClient('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017')
except :
    print("MongoDB Connection Error")
    sys.exit()
else :
    print('MongoDB Connection Success')

def insert_post(line) :
    db = connection['test2']
    collection = db['Null']
    collection.insert(get_post(line))


def get_post(line) :
  post = {
    "PM25":line[line.find('5:')+2:line.find('\t')],"PM10":line[line.find('10:')+2:line.find('\t',20)],
    "Humi":line[line.find('y:')+2:line.find('%')],"Temp":line[line.find('e:')+2:line.find('*')],"NOW":str(datetime.datetime.now())
  }
  return post

def main():
  port = serial.Serial("/dev/ttyUSB0", baudrate=9600)

  line = port.readline()
  while True:
    line = port.readline()
    print(line)
    insert_post(line)


  print("\n\n")


main()
