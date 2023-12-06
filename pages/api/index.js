import { NextApiRequest, NextApiResponse } from "next";

const checkOnlineStatus = async (req, res) => {
  try {
    res.status(200).send("working");
  } catch (error) {
    res.status(500).send();
  }
};

export default checkOnlineStatus;
