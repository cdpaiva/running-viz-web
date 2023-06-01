/*
    Settings needs to get information about the current user configuration
    Specially, it should check if the user has already synced his polar account
*/

import { useLoaderData } from "react-router-dom";
import Nav from "./Nav";

type profileResponse = {
  profile?: object;
  msg?: string;
};

function Settings() {
  const profile = useLoaderData() as profileResponse;
  console.log(profile);

  return (
    <div className="container">
      <Nav></Nav>
      <p>Settings</p>
      {profile.msg ? (
        <div className="">
          <a href="">Start polar integration</a>
        </div>
      ) : (
        <p>User integrated</p>
      )}
    </div>
  );
}

export default Settings;
