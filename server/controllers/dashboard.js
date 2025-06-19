import Passenger from "../models/passengers.module.js";
import Transaction from "../models/transaction.module.js";
import User from "../models/user.module.js";

export const adminDasboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
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

    res.status(201).json({
      users,
      transactions: credit[0].count,
      creditAdded: credit[0].totalSum * -1,
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
