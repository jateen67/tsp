export interface TSPResult {
  animations: Animation[];
}

export type Animation = {
  compare?: number[][];
  cross?: number[][];
  backtrack?: number[][];
  finalPath?: number[][];
};
