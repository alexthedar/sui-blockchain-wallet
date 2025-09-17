import { SuiObjectResponse } from "@mysten/sui/client";
import { FC } from "react";

type SuiObjProps = {
  objRes: SuiObjectResponse;
};

export const SuiObject: FC<SuiObjProps> = ({ objRes }) => {
  const owner = objRes.data?.owner;
  return (
    <div className="p-2 border rounded-lg bg-gray-50 dark:text-gray-800">
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Object Id:</strong> {objRes.data?.objectId}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Type:</strong> {objRes.data?.type}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Owner:</strong>{" "}
        {typeof owner === "object" && owner !== null && "AddressOwner" in owner
          ? owner.AddressOwner
          : "Unknown Owner"}
      </p>
    </div>
  );
};
