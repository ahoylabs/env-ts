import { __internal_for_testing__, main } from '../src'

describe('main', () => {
  test('main', async () => {
    // const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const res = await main('env.ts', 'app')
    console.log(res)
    expect(res).toContain('NEXT_PUBLIC_BOUNTY_PROGRAM_ID')
    // consoleSpy.mockRestore()
  })
  test('getListofEnvVars', () => {
    const repo = 'app'
    const appVars = __internal_for_testing__.getListofEnvVars(repo)
    console.log(appVars)
    expect(appVars).toContain('NEXT_PUBLIC_BOUNTY_PROGRAM_ID')
    expect(appVars).not.toContain('//')
  })
})
