import { bucket,BUCKET } from "../lib/firebase"

export const uploadImage = (files: any) => {
  return new Promise((resolve, reject) => {
    const img = files

    const imgName = Date.now()  + '.' + img?.originalname.split('.').pop()

    const file = bucket.file(imgName)

    const stream = file.createWriteStream({
      metadata: {
        contentType: img?.mimetype
      }
    })

    stream.on('error', (e: any) => {
      reject(e)
    })

    stream.on('finish', async () => {
      await file.makePublic()
      console.log('image upload')
      resolve(`https://storage.googleapis.com/${BUCKET}/${imgName}`)
    })


    stream.end(img?.buffer)
    })
}