export function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error(`${ str } is not a string type`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
