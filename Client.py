import serial
import sys
import datetime
import struct
import json
from socket import *


HOST = 'ec2-54-180-155-65.ap-northeast-2.compute.amazonaws.com'
PORT = 8080
ADDR = (HOST,PORT)
client = socket(AF_INET, SOCK_STREAM)


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

def get_post(line) :
  post = {
    "PM25":line[line.find('5:')+2:line.find('\t')],"PM10":line[line.find('10:')+3:line.find('\t',20)],
    "Humi":line[line.find('y:')+2:line.find('%')],"Temp":line[line.find('e:')+2:line.find('*')], "NOW":str(datetime.datetime.now())
  }
  return post

#Main
if __name__=="__main__" :
    if(len(sys.argv) != 3) :
        print('-i/-o -bugilding_Name')
        print('-i -> indoor, -o -> outdoor')
        sys.exit()
    if(sys.argv[1] != '-i' and sys.argv[1] !='-o') :
        sys.exit()
    loc = json.dumps(sys.argv[1:])
    client.connect(ADDR)
    client.sendall(loc.encode('utf-8'))
    line = SDS011.readline()
    try :
        while True :
            line = SDS011.readline()
            value = json.dumps(get_post(line))
            if  value is not None:
                try :
                    client.sendall(value.encode('utf-8'))
                except Exception as e :
                    print('While transmitting, Problem detected : ',e)
                else :
                    print(line)
    #Error branch point
    #Request Quit
    except KeyboardInterrupt :
        print('\nQuit')
    #Unknow error occur
    except Exception as e :
        print('Error Detected : {}'.format(e))
