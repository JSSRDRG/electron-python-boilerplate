'''
    Python version of the Document Object Model
'''
import module.py.ipc as ipc

def get_anchors () :
    result = ipc.send('{"f":"dom","args":"' + text + '","child":"anchors"}')
    return result

anchors = property(get_anchors)

def getElementById (element) :
    result = ipc.send('{"f":"dom","args":"' + element + '","child":"gebi"}')
    return result