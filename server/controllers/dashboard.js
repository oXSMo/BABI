import Passenger from "../models/passengers.module.js";
import Transaction from "../models/transaction.module.js";
import User from "../models/user.module.js";

export const adminDasboard = async (req, res) => {
  try {
    const credit = await Transaction.aggregate([
      {
        $match: {
          balance: { $lt: 0 }, // Filter documents with balance < 0
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }, // Count negative transactions
          totalSum: { $sum: "$balance" }, // Sum of negative balances
        },
      },
    ]);
    let sales = await Transaction.aggregate([
      {
        $match: {
          balance: { $lt: 0 },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by day
          totalPrice: { $sum: { $toDouble: "$balance" } }, // Sum prices for each day
        },
      },
    ]);

    const users = await User.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          admin: [{ $match: { isAdmin: true } }, { $count: "count" }],
          normal: [
            {
              $match: {
                isAdmin: false,
                role: "normal",
              },
            },
            { $count: "count" },
          ],
          worker: [
            {
              $match: {
                isAdmin: false,
                role: "worker",
              },
            },
            { $count: "count" },
          ],
        },
      },
      {
        $project: {
          total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
          admin: { $ifNull: [{ $arrayElemAt: ["$admin.count", 0] }, 0] },
          normal: { $ifNull: [{ $arrayElemAt: ["$normal.count", 0] }, 0] },
          worker: { $ifNull: [{ $arrayElemAt: ["$worker.count", 0] }, 0] },
        },
      },
    ]);

    const passengers = await Passenger.aggregate([
      {
        $group: {
          _id: {
            $toDate: {
              $subtract: [
                { $toLong: "$createdAt" },
                { $mod: [{ $toLong: "$createdAt" }, 300000] }, // 300000 ms = 5 minutes
              ],
            },
          },
          in: { $sum: "$in" },
          out: { $sum: "$out" },
          inFrame: { $sum: "$inFrame" },
        },
      },
      { $sort: { _id: 1 } }, // Optional: sorts results chronologically
    ]);

    sales = Last6Months().map((m) =>
      sales.find((s) => s._id === m)
        ? sales.find((s) => s._id === m)
        : { _id: m, totalPrice: 0 }
    );

    res.status(201).json({
      users,
      transactions: credit[0].count,
      creditAdded: credit[0].totalSum * -1,
      passengers,
      sales,
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const passengersDashboard = async (req, res) => {
  try {
    const passengers = await Passenger.aggregate([
      {
        $group: {
          _id: {
            $toDate: {
              $subtract: [
                { $toLong: "$createdAt" },
                { $mod: [{ $toLong: "$createdAt" }, 300000] }, // 300000 ms = 5 minutes
              ],
            },
          },
          in: { $sum: "$in" },
          out: { $sum: "$out" },
          inFrame: { $sum: "$inFrame" },
        },
      },
      { $sort: { _id: 1 } }, // Optional: sorts results chronologically
    ]);
    res.status(201).json(passengers);
  } catch (error) {
    res.status(401).json(error);
  }
};

const Last6Months = () => {
  const months = [];
  const today = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-indexed

    months.push(`${year}-${month}`);
  }

  return months.reverse();
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -__v -OTP")
      .sort({ createdAt: -1 });
    res.status(201).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const useTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate([
        { path: "worker", select: "email fullName  phoneNumber" },
        { path: "client", select: "email fullName  phoneNumber" },
      ])
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });
    res.status(201).json(transactions);
  } catch (error) {
    res.status(401).json(error);
  }
};
