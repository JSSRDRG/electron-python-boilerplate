'''
    Log to the javascript console.
'''

import module.py.ipc as ipc

def error ( text:str = "") :
    '''
        Outputs an error message.
    '''
    ipc.send('{"f":"err","args":"' + text + '"}')

def info ( text:str = "") :
    '''
        Informative logging of information.
    '''
    ipc.send('{"f":"info","args":"' + text + '"}')

def log ( text:str = "") :
    '''
        For general output of logging information.
    '''
    ipc.send('{"f":"log","args":"' + text + '"}')

def warn ( text:str = "") :
    '''
        Outputs a warning message.
    '''
    ipc.send('{"f":"warn","args":"' + text + '"}')

# TODO: Add all methods from the Javascript console object 
# https://developer.mozilla.org/en-US/docs/Web/API/Console
