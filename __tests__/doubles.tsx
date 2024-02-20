import { PlayerData, Positions, User } from '../src/lib/data/models'

export const samplePlayerData: PlayerData = {
  playerNumber: 12,
  playerNickname: 'Player Name',
  mainPosition: Positions.GOALKEEPER,
  secondPosition: Positions.DEFENDER,
  playerHeight: 156,
  playerWeight: 67,
  birthday: new Date(),
  gamesPerYearIndex: 1,
  competitionGamesIndex: 1,
  attack: 34,
  defense: 34,
  fitness: 34,
  goal: 34,
  pass: 34,
  teamWork: 34
}

export const sampleUser: User = {
  id: 'string',
  email: 'string',
  name: 'string',
  lastName: 'string',
  playerData: samplePlayerData
}
