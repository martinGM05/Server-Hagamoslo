import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class RoleService {
    // static createRole(role: string) {
    //     return prisma.roles.create({
    //         data: { rol: role }
    //     })
    // }

    static getRoles() {
        return prisma.roles.findMany()
    }
}

export default RoleService;