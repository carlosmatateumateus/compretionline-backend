import { PrismaClient } from '@prisma/client'
import { smartphones, computers, musicals } from '../src/utils/seedData'
const prisma = new PrismaClient()

const user = {
  id: "db2edb3c-b06b-11ed-afa1-0242ac120002",
  email: "compretionline@gmail.com"
}

const locations = [
  "Brasil, São Paulo",
  "Africal do sul, Joanesburgo",
  "Egipto, Cairo",
  "Afeganistão, Cabul",
  "Andorra, Andorra-a-Velha",
  "Colômbia, Bogotá",
  "Coreia do Sul, Seul",
  "Emirados Árabes Unidos, Abu Dabi",
  "Espanha, Madrid",
  "Estado da Palestina, Jerusalém Oriental",
  "Estados Unidos	Washington, D.C."
]

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum arcu a massa tincidunt, sit amet tristique urna porta. In justo lacus, volutpat in tellus et, tincidunt gravida leo. Donec ultrices ultrices sodales. Aliquam id urna a lectus consequat molestie. Phasellus mollis porta neque. Vestibulum consequat, augue in dignissim consectetur, mauris diam vehicula nisl, et pharetra purus felis ut erat. Integer nec nunc tellus. In augue est, luctus at nulla varius, venenatis vulputate nulla.`

async function main() {
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      id: user.id,
      email: user.email
    }
  })

  
  smartphones.map(async (smarphone) => {    
    await prisma.product.create({
      data: {
        userId: user.id,
        title: smarphone.title.toLocaleLowerCase(),
        price: parseFloat((Math.random() * 2000.44).toFixed(2)),
        location: locations[Math.floor(Math.random() * locations.length)],
        category: "smartphones",
        description,
        photo: smarphone.photo,
        createdAt: new Date()
      }
    })
  })

  computers.map(async (computer) => {
    await prisma.product.create({
      data: {
        userId: user.id,
        title: computer.title.toLocaleLowerCase(),
        price: parseFloat((Math.random() * 2000.44).toFixed(2)),
        location: locations[Math.floor(Math.random() * locations.length)],
        category: "computadores",
        description,
        photo: computer.photo,
        createdAt: new Date()
      }
    })
  })

  musicals.map(async (musical) => {
    await prisma.product.create({
      data: {
        userId: user.id,
        title: musical.title.toLocaleLowerCase(),
        price: parseFloat((Math.random() * 2000.44).toFixed(2)),
        location: locations[Math.floor(Math.random() * locations.length)],
        category: "musical",
        description,
        photo: musical.photo,
        createdAt: new Date()
      }
    })
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Products created 🛒')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })