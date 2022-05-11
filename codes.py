class PrintCode:
  def __init__(self, codes):
    self.codes = codes
    print('Nantsi iOutput yakho:')
    print('---------------------')

  def tokenise(self):
    outputDict = {'error': 'ayiko'}
    outputDict['new'] = self.codes
    return outputDict