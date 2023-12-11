export function to_radians(degree: number) {
  return degree * (Math.PI / 180);
}

export function to_degrees(radians: number) {
  return radians * (180 / Math.PI);
}
