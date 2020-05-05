import module.py.ipc as ipc
import module.py.document as document
import module.py.console as console

import sys

def print (text:any = '') :
    '''
         Print to shell
    '''
    sys.stdout.write(text)
    console.log(str(text))
