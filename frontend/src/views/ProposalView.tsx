import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../config/networkConfig";
import { SuiObjectData } from "@mysten/sui/client";
import { ProposalItem } from "../components/proposal/ProposalItem";
import { EcText } from "../components/Shared";

const ProposalView = () => {
  const dashboardId = useNetworkVariable("dashboardId");

  const {
    data: dataResponse,
    isPending,
    error,
  } = useSuiClientQuery("getObject", {
    id: dashboardId,
    options: {
      showContent: true,
    },
  });

  if (isPending) return <EcText isCentered text="Loading..." />;
  if (error) return <EcText isError text={`Error: ${error.message}`} />;
  if (!dataResponse.data) return <EcText text="Not Found..." />;

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">New Proposals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getDashboardFields(dataResponse.data)?.proposals_ids.map((id) => (
          <ProposalItem key={id} id={id} />
        ))}
      </div>
    </>
  );

  function getDashboardFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") return null;
    return data.content.fields as {
      id: SuiID;
      proposals_ids: string[];
    };
  }
};

export default ProposalView;
