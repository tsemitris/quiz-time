/**
 * Sorts an object array by a given property.
 * Example: [ { name: 'H' }, { name: 'A' } ]
 * @param array - The object array to pass in
 * @param property - The object key to sort by
 */
export function sortArrayByText(array: any[], property: string): string[] {
  return array.sort((a, b) => {
    const textA = a[property];
    const textB = b[property];
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
}
