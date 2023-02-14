import { bucket } from "../lib/firebase";

export const removeImage = (imgUrl: string) => {
  return new Promise((resolve, reject) => {
    const file = bucket.file(imgUrl)

    file.delete()
    .then(() => {
      resolve("File Deleted")
    })
    .catch((error) => {
      reject(error)
    })
  })
}