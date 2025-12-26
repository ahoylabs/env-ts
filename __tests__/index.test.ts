import { __internal_for_testing__, main } from '../src'

describe('main', () => {
  test('main', async () => {
    const res = await main('env.ts', 'app')
    expect(res).toContain('NEXT_PUBLIC_BOUNTY_PROGRAM_ID')
  })

  test('getListofEnvVars', () => {
    const repo = 'app'
    const appVars = __internal_for_testing__.getListofEnvVars(repo)
    expect(appVars).toContain('NEXT_PUBLIC_BOUNTY_PROGRAM_ID')
    expect(appVars).not.toContain('//')
  })

  test('main throws error for invalid repo', async () => {
    await expect(main('env.ts', 'invalid-repo')).rejects.toThrow('Invalid repo')
  })
})
