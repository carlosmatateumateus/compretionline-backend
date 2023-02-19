import { api } from "../lib/axios"

export default function getDate() {
  return new Promise(async (resolve, reject) => {
    await api.get('http://worldtimeapi.org/api/timezone/Africa/Luanda') 
    .then((response) => {
      console.table(response.data)
      resolve(response.data.datetime)
    })
    .catch((error) => {
      reject(error)
    })
  })
} 