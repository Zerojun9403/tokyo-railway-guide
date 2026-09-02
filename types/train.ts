export type TrainStatus = 
"normal"
| "origin" 
| "delayed"
| "upcoming" ;

export type Train = {
  id: string;

  time: string;

  minutesUntilDeparture: number;

  trainType?: string;

  destinationKo?: string;
  destinationJa?: string;

  trainNumber?: string;

  directionId: string;

  status?: TrainStatus;
};
