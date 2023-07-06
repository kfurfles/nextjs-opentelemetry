import clientPromise from "@/backend/db/mongodb/client";
import { DB, DB_COLLECTIONS } from "@/constants/mongodb-collections.contants";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB.USER_METRICS);
    const { 'x-user-email': userKey, ...headers } = req.headers

    await db.collection(DB_COLLECTIONS.USER_METRICS).insertOne(
      {
        headers,
        events: req.body
      }
    );

    return res.status(200).json({
      message: "inserted with success"
    });
  } catch (e) {
    res.status(500).json(e);
  }
}
