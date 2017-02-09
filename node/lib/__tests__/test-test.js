import lib, {foo} from '../lib'

describe('first test', () => {
  it('modules should exists', () => {

    expect(lib.foo).toEqual('foo')

    expect(foo).toEqual('foo')
  })
})