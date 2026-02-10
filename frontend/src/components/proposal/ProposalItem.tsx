import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC } from "react";
import { EcText } from "../Shared";
import { SuiObjectData } from "@mysten/sui/client";

type ProposalItemProps = {
  id: string;
};

export const ProposalItem: FC<ProposalItemProps> = ({ id }) => {
  const {
    data: dataResponse,
    isPending,
    error,
  } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
    },
  });

  if (isPending) return <EcText isCentered text="Loading..." />;
  if (error) return <EcText isError text={`Error: ${error.message}`} />;
  if (!dataResponse.data) return <EcText text="Not Found..." />;

  const proposal = parseProposal(dataResponse.data);

  if (!proposal) return <EcText text="No data found" />;

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:border-blue-500 transition-colors">
      <h2 className="text-xl font-semibold mb-2">Title: {proposal.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{proposal.description}</p>
    </div>
  );
};

function parseProposal(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") return null;

  const { voted_yes_count, voted_no_count, expiration, ...rest } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.content.fields as any;

  return {
    ...rest,
    votedYesCount: Number(voted_yes_count),
    votedNoCount: Number(voted_no_count),
    expiration: Number(expiration),
  };
}
