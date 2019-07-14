from socket import *
import time
import pymongo
import json
import thread


def client_server(user, addr) :
    loc = user.recv(1024)
    loc = json.loads(loc.decode('utf-8'))
    while True :
        try :
            data = user.recv(1024)
            data = json.loads(data.decode('utf-8'))
            insert_post(data)
        except Exception as e:
            print('server : ',e)
            break
        else :
            print('Send Success')
    return

try :
    connection = pymongo.MongoClient('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017')
except :
    print("MongoDB Connection Error")
    sys.exit()
else :
    print('MongoDB Connection Success')

#Database name='test' & Collection name='Null'
#Insert document
def insert_post(loc,value) :
    db = connection[loc[1][1:]]
    if loc[0] == '-i' :
        collection = db['in']
        collection.insert(get_post(value))
    else :
        collection = db['out']
        collection.insert(get_post(value))

#"now" is current time
#Make document
def get_post(value) :
	post = {
		"now":value[0],"PM25":value[1],"PM10":value[2],"TEMP":value[3],"HUMI":value[4]
	}
	return post

if __name__ == '__main__' :
    try :
        connection = pymongo.MongoClient('mongodb://ec2-13-125-244-112.ap-northeast-2.compute.amazonaws.com:27017')
    except :
        print("MongoDB Connection Error")
        sys.exit()
    else :
        print('MongoDB Connection Success')
    #AF_INET-v4, AF_INET6-v6
    #SOCK_STREAM-TCP,SOCK_DGRAM-UDP
    server = socket(AF_INET, SOCK_STREAM)
    #bind((addr,port#)),''->INADDR_ANY,' '->Broadcast
    server.bind(('',8080))
    #lisetn-Maximum user
    server.listen(10)
    print('Waiting Connect')
    while True :
        try :
            user, addr = server.accept()
            print('connected : ', user)
            thread.start_new_thread(client_server,(user, addr))
        except Exception as e :
            print('out : ', e)
            break
    print('Server closed')
