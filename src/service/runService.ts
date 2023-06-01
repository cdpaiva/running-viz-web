import axios from "axios";
import { config } from "../config";
import { Run } from "../types/Run";

const BASE_URL = config.baseURL;
const token = localStorage.token;

type getRunResponse = { run: Run };

async function getRun(id: string | undefined): Promise<Run | null> {
  if (!id) {
    return null;
  }
  const res = await axios.get<getRunResponse>(BASE_URL + `/runs/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.run;
}

async function getAllRuns() {
  const res = await axios.get(BASE_URL + `/runs`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

async function createRun(run: Run) {
  const res = await axios.post(BASE_URL + "/runs", run, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

async function updateRun(run: Run) {
  const res = await axios.patch(BASE_URL + `/runs/${run._id}`, run, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

async function deleteRun(id: string) {
  const res = await axios.delete(BASE_URL + `/runs/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export { getRun, getAllRuns, createRun, deleteRun, updateRun };
