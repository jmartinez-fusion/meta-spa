async function blobToBase64(blob: Blob): Promise<string> {
  return await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        throw new Error('Error al convertir el Blob a Base64')
      }
    }
    reader.readAsDataURL(blob)
  })
}

export default blobToBase64
