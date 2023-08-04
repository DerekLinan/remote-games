/**
 * Unexpected results may occur if min and max are not integers.
 * @param min inclusive
 * @param max inclusive
 * @returns
 */
export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function delay(milliseconds: number) {
  new Promise(res => setTimeout(res, milliseconds));
}
