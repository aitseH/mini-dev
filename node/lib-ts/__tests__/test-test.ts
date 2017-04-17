import {foo} from '../src/foo'

describe('first test', () => {
  it('modules should exists', () => {

    expect(foo).toEqual('foo')
    
  })
})