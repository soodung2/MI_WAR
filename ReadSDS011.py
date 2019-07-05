import pymongo
import serial
import sys
import time
import datetime
import struct

#Request connection to arduino sensor
#"port"='/dev/ttyUSB0',"baudrate"=9600
try :
    print('Waiting for connection.....')
    SDS011 = serial.Serial(port='/dev/ttyUSB0',baudrate=9600)
except :
    print('Fail to connection')
    sys.exit()
else :
    print('Connection Success')

#Request connection to MongoDB
#Server Address 'mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com', port number=27017
try :
    connection = pymongo.MongoClient('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017')
except :
    print("MongoDB Connection Error")
    sys.exit()
else :
    print('MongoDB Connection Success')

#unpack respon val and calculator PM
def process_data(respon) :
    val = struct.unpack('<HHxxBB',respon[2:])
    pm25 = val[0]/10.0
    pm10 = val[1]/10.0
    return [pm25,pm10]

#read data from sensor
def read_response():
    byte = 0
    while byte != "\xaa":
        byte = SDS011.read(size=1)
    d = SDS011.read(size=9)
    return byte + d

#Control sensor
def read_data() :
    value = []
    respon = read_response()
    if respon[1] == '\xc0' :
        value = process_data(respon)
    return value


#Database name='test' & Collection name='Null'
#Insert document
def insert_post(value) :
    db = connection['test']
    collection = db['Null']
    collection.insert(get_post(value))

#"now" is current time
#Make document
def get_post(value) :
	post = {
		"now":datetime.datetime.now(),"PM25":value[0],"PM10":value[1]
	}
	return post

#Main
if __name__=="__main__" :
    try :
        while True :
            value = read_data()
            if  value is not None:
                insert_post(value)
                print('PM2.5 : {} PM10 : {}'.format(value[0],value[1]))
    #time.sleep is cycle, time.sleep(second)
            time.sleep(5)
    #Error branch point
    #Request Quit
    except KeyboardInterrupt :
        print('\nQuit')
    #Unknow error occur
    except Exception as e :
        print('Error Detected : {}'.format(e))
