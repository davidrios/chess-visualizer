export const NORTH = 'n'
export const NORTH_EAST = 'ne'
export const EAST = 'e'
export const SOUTH_EAST = 'se'
export const SOUTH = 's'
export const SOUTH_WEST = 'sw'
export const WEST = 'w'
export const NORTH_WEST = 'nw'


export const path_in_line = (board_size, starting_position, direction) => {
  if (starting_position.y < 0 || starting_position.y > board_size.height - 1 ||
      starting_position.x < 0 || starting_position.x > board_size.width - 1) {
    throw new Error('position out of board bounds')
  }

  let steps = 0

  switch (direction) {
    case NORTH:
      return Array.apply(null, Array(starting_position.y))
                  .map((v, k) => k)
                  .reverse()
                  .map(i => ({ x: starting_position.x, y: i }))
    case NORTH_EAST:
      steps = Math.min.apply(null, [ board_size.width - 1 - starting_position.x, starting_position.y ])
      return Array.apply(null, Array(steps))
                  .map((v, k) => k + 1)
                  .map(i => ({ x: starting_position.x + i, y: starting_position.y - i }))
    case EAST:
      return Array.apply(null, Array(board_size.width - starting_position.x - 1))
                  .map((v, k) => k + starting_position.x + 1)
                  .map(i => ({ x: i, y: starting_position.y }))
    case SOUTH_EAST:
      steps = Math.min.apply(null, [ board_size.width - 1 - starting_position.x, board_size.height - 1 - starting_position.y ])
      return Array.apply(null, Array(steps))
                  .map((v, k) => k + 1)
                  .map(i => ({ x: starting_position.x + i, y: starting_position.y + i }))
    case SOUTH:
      return Array.apply(null, Array(board_size.height - starting_position.y - 1))
                  .map((v, k) => k + starting_position.y + 1)
                  .map(i => ({ x: starting_position.x, y: i }))
    case SOUTH_WEST:
      steps = Math.min.apply(null, [ starting_position.x, board_size.height - (starting_position.y + 1) ])
      return Array.apply(null, Array(steps))
                  .map((v, k) => k + 1)
                  .map(i => ({ x: starting_position.x - i, y: starting_position.y + i }))
    case WEST:
      return Array.apply(null, Array(starting_position.x))
                  .map((v, k) => k)
                  .reverse()
                  .map(i => ({ x: i, y: starting_position.y }))
    case NORTH_WEST:
      steps = Math.min.apply(null, [ starting_position.x, starting_position.y ])
      return Array.apply(null, Array(steps))
                  .map((v, k) => k + 1)
                  .map(i => ({ x: starting_position.x - i, y: starting_position.y - i }))
    default:
      throw new Error('invalid direction')
  }
}


export const knight_spread = (board_size, position) => {
  return [
    { x: position.x - 2, y: position.y - 1 },
    { x: position.x - 1, y: position.y - 2 },
    { x: position.x + 1, y: position.y - 2 },
    { x: position.x + 2, y: position.y - 1 },
    { x: position.x + 2, y: position.y + 1 },
    { x: position.x + 1, y: position.y + 2 },
    { x: position.x - 1, y: position.y + 2 },
    { x: position.x - 2, y: position.y + 1 }
  ].filter(point => point.x >= 0 && point.y >= 0 && point.x < board_size.width && point.y < board_size.height)
}


export default {
  K: (board_size, position) => Array.concat.apply(null,
    [ WEST, NORTH_WEST, NORTH, NORTH_EAST, EAST, SOUTH_EAST, SOUTH, SOUTH_WEST ]
    .map(direction => path_in_line(board_size, position, direction)[0] || [])),
  Q: (board_size, position) => Array.concat.apply(null,
    [ WEST, NORTH_WEST, NORTH, NORTH_EAST, EAST, SOUTH_EAST, SOUTH, SOUTH_WEST ]
    .map(direction => path_in_line(board_size, position, direction))),
  R: (board_size, position) => Array.concat.apply(null,
    [ WEST, NORTH, EAST, SOUTH ]
    .map(direction => path_in_line(board_size, position, direction))),
  B: (board_size, position) => Array.concat.apply(null,
    [ NORTH_WEST, NORTH_EAST, SOUTH_EAST, SOUTH_WEST ]
    .map(direction => path_in_line(board_size, position, direction))),
  N: knight_spread
}
