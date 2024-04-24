export function validateHTMLContent(value: string): boolean {
  const content = value.replace(/<\/?[^>]+(>|$)/g, '').trim()
  return content.length > 0
}
