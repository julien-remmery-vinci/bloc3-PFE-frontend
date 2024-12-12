export interface ScoreQuery {
    sub_category: string;
    score?: number; 
  };
  
export  interface Score {
    total: number;
    details_now: ScoreQuery[]; 
    details_commitment_pact: ScoreQuery[];
  };
  