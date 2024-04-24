export const MAX_TIMEOUT_TIME = 2147483647
export const convertExpirationToMilliseconds = (unixTime: number): number => {
  let expirationTime = (unixTime - Math.round(+new Date() / 1000)) * 1000
  if (expirationTime > MAX_TIMEOUT_TIME) {
    expirationTime = MAX_TIMEOUT_TIME
  }

  return expirationTime
}
