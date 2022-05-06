import WorkerService from '../../lib/service/WorkerService'

describe('Test for Worker service', () => {

    test('1) Get all users', async () => {
        const users = await WorkerService.getAllWorkersAndClients()
        // console.log(users)
        expect(users).not.toEqual([])
    })

    test('2) Change role worker', async () => {
        const user = await WorkerService.changeRoleWorker(8, 2, 'Tengo una laptop', 1)
        // console.log(user)
        expect(user).toBe('Se cambió el rol del usuario')
    })

})