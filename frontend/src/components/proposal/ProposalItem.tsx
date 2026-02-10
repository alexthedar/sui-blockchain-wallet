import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { EcText } from "../Shared";
import { SuiObjectData } from "@mysten/sui/client";
import { VoteModal } from "./VoteModal";

type ProposalItemProps = {
  id: string;
};

export const ProposalItem: FC<ProposalItemProps> = ({ id }) => {
  const [isModelOpen, setModalOpen] = useState(false);
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
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:border-blue-500 transition-colors"
      >
        <h2 className="text-xl font-semibold mb-2">Title: {proposal.title}</h2>
        <p className="text-gray-700 dark:text-gray-300">
          {proposal.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <div className="flex items-center text-green-600">
              <span className="mr-1">👍</span>
              {proposal.votedYesCount}
            </div>
            <div className="flex items-center text-red-600">
              <span className="mr-1">👎</span>
              {proposal.votedNoCount}
            </div>
          </div>
          <div>
            <EcText text={formatUnixTime(proposal.expiration)} />
          </div>
        </div>
      </div>
      <VoteModal isOpen={isModelOpen} onClose={() => setModalOpen(false)} />
    </>
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

function formatUnixTime(timestampSec: number) {
  return new Date(timestampSec * 1000).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
