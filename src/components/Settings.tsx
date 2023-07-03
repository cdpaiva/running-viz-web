/*
    Settings needs to get information about the current user configuration
    Specially, it should check if the user has already synced his polar account
*/

import { useLoaderData } from "react-router-dom";
import Nav from "./Nav";
import { createProfile, syncAccount } from "../service/polarService";
import useAuth from "../hooks/useAuth";

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

  const registerPolarAccount = async () => {
    const res = await createProfile(userId);
    console.log("On settings.tsx");
    console.log(res);
  };

  const sync = async () => {
    await syncAccount(userId);
    console.log("Should request info from the API");
  };

  return (
    <div className="container">
      <Nav></Nav>
      <p>Settings</p>
      {profile.msg ? (
        <div className="">
          {profile.msg === "User has no integrations." ? (
            // <button onClick={handleClick}>Integrate with Polar Account</button>
            <a
              href={`https://flow.polar.com/oauth2/authorization?response_type=code&state=${userId}&client_id=f63d196a-b425-4176-bf11-de04a7c14b96&request_uri=http://localhost:3000/api/v1/polar/authCode`}
            >
              Start polar integration
              <button onClick={registerPolarAccount}>
                Register Polar Account
              </button>
            </a>
          ) : (
            <p>User has a polar acc set up, display some info about it here</p>
          )}
        </div>
      ) : (
        <>
          <div className="polar-profile-info">
            <p>User integrated - Polar Account Information</p>
            <div className="polar-profile-container">
              <div className="">
                <p>
                  {`Name: ${profile.profile?.["first-name"]} ${profile.profile?.["last-name"]}`}
                </p>
              </div>
              <div className="">
                <p>{`Weight: ${profile.profile?.weight}`}</p>
                <p>{`Height: ${profile.profile?.height}`}</p>
              </div>
            </div>
          </div>
          <button onClick={sync}>Sync account data</button>
        </>
      )}
    </div>
  );
}

export default Settings;
