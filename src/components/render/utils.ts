export function to_radians(degree: number) {
  return degree * (Math.PI / 180);
}

export function to_degrees(radians: number) {
  return radians * (180 / Math.PI);
}

export function count_ones(n: number) {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}
