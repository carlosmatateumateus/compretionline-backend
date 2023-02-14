import { bucket,BUCKET } from "../lib/firebase"

export const uploadImage = (image: any) => {
  return new Promise((resolve, reject) => {
    const imgName = Date.now()  + '.' + image?.originalname.split('.').pop()

    const file = bucket.file(imgName)

    const stream = file.createWriteStream({
      metadata: {
        contentType: image?.mimetype
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


    stream.end(image?.buffer)
    })
}