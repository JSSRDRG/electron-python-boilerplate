'''
    Javascript IPC
'''

import zmq

sock = zmq.Context().socket(zmq.REQ)

# Connect to IPC socket
sock.connect("tcp://127.0.0.1:5555")

def send ( text:str = '' ) :
    sock.send(bytes(text, 'utf-8'))

    # Return response from socket
    return sock.recv()