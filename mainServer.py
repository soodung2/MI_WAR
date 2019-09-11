from socket import *
import pymongo
import json
import thread

get_port = 8080
refresh_port = 4040

def client_server(user, addr) :
    loc = user.recv(1024)
    loc = json.loads(loc.decode('utf-8'))
    while True :
        try :
            data = user.recv(1024)
            data = json.loads(data.decode('utf-8'))
            insert_post(loc, data)
        except Exception as e:
            print('server : ',e)
            break
        else :
            print('Send Success')
    return

#Database name='test' & Collection name='Null'
#Insert document
def insert_post(loc,value) :
    db = connection[loc[1][1:]]
    in_out = ''
    if loc[0] == '-i' :
        in_out = 'indoor'
    else :
        in_out = 'outdoor'
    collection = db[in_out]
    collection.insert(value)

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
    get_server = socket(AF_INET, SOCK_STREAM)
    refresh_server = socket(AF_INET, SOCK_STREAM)
    #bind((addr,port#)),''->INADDR_ANY,' '->Broadcast
    get_server.bind(('',get_port))
    refresh_server.bind(('',refresh_port))
    #lisetn-Maximum user
    get_server.listen(10)
    refresh_server.listen(100)
    print('Waiting Connect')
    while True :
        try :
            user, addr = get_server.accept()
            print('connected : ', user)
            thread.start_new_thread(client_server,(user, addr))
        except Exception as e :
            print('out : ', e)
            break
    print('Server closed')
