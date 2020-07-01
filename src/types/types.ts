export interface Planet {
  name:string;
  distance:number;
}

export interface Vehicle {
  name:string;
  total_no:number;
  max_distance:number;
  speed:number;
}
export interface FalconeData {
  token:string;
  planets:Array<string>;
  vehicles:Array<string>;
}
export interface Result {
  planet_name?:string;
  status?:string;
  error?:string
}
export interface Token {
  token:string
}
