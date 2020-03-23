export interface ApiResponse < T > {
  messages?: T,
  id?: number,
  content?: string,
  author?: string,
  timestamp?: number
}