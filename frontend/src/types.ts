export type Proposal = {
  id: SuiID;
  title: string;
  description: string;
  votedYesCount: string;
  votedNoCount: string;
  creator: string;
  voter_registry: string[];
};
