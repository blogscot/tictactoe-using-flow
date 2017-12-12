// @flow

declare type Circle = { type: 'Circle' }
declare type Cross = { type: 'Cross' }
declare type Empty = { type: 'Empty' }

declare type CellType = Circle | Cross | Empty

declare type Row = [CellType, CellType, CellType]
declare type BoardType = [Row, Row, Row]

// used with flat boards
declare type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

declare type Player = 0 | 1

declare type Just<A> = { type: 'Just', result: A }
declare type Nothing = { type: 'Nothing' }
declare type Maybe<A> = Just<A> | Nothing

declare type Result = Maybe<[Player, Row]>

declare type Status = Result | { type: 'Running' }

declare type State = { board: BoardType, player: Player, status: Status }
