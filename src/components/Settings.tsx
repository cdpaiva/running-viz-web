/*
    Settings needs to get information about the current user configuration
    Specially, it should check if the user has already synced his polar account
*/

import { useLoaderData } from "react-router-dom";
import Nav from "./Nav";
import { createProfile, syncAccount } from "../service/polarService";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Button from "./Button";
import Notification from "./Notification";
import { BarLoader } from "react-spinners";

type profileResponse = {
  profile?: {
    "first-name": String;
    "last-name": String;
    height: Number;
    weight: Number;
    birthdate: String;
    gender: String;
    "member-id": String;
    "polar-user-id": String;
    "registration-date": String;
  };
  msg?: string;
};

function Settings() {
  const profile = useLoaderData() as profileResponse;
  const { auth } = useAuth();
  const userId = auth?.userId;
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const registerPolarAccount = async () => {
    const res = await createProfile(userId);
    setNotification("Account linked successfully.");
  };

  const sync = async () => {
    setLoading(true);
    if (userId) {
      const syncStatus = await syncAccount(userId);
      setNotification(syncStatus);
    } else {
      setNotification("");
    }
    setLoading(false);
  };

  return (
    <div className="container max-w-3xl">
      <Nav></Nav>
      {notification && (
        <Notification
          text={notification}
          handleClose={() => setNotification("")}
          variant="info"
        />
      )}
      <div className="flex justify-center">
        <BarLoader loading={loading} color="#3B82F6" width={300} />
      </div>
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      {!profile ? (
        <div className="border-1 border-blue-500 px-4 py-3 text-center">
          <a
            className="hover:text-neon-green"
            href={`https://flow.polar.com/oauth2/authorization?response_type=code&state=${userId}&client_id=f63d196a-b425-4176-bf11-de04a7c14b96&request_uri=http://localhost:3000/api/v1/polar/authCode`}
          >
            Start polar integration
          </a>
        </div>
      ) : (
        <>
          <div className="border-1 border-blue-500 px-4 py-3 text-center">
            <p>User integrated - Polar Account Information</p>
            <div className="my-4 flex justify-around items-center">
              <div className="">
                <p>
                  {`Name: ${profile.profile?.["first-name"]} ${profile.profile?.["last-name"]}`}
                </p>
              </div>
              <div className="">
                <p>{`Weight: ${profile.profile?.weight} kg`}</p>
                <p>{`Height: ${profile.profile?.height} cm`}</p>
              </div>
            </div>
          </div>
          <div className="text-center my-4">
            <Button border handler={sync} text="Sync account data" />
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
