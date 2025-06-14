import Transaction from "../models/transaction.module.js";
import User from "../models/user.module.js";

//////!  CREATE TRAN  !//////

export const createTransaction = async (req, res) => {
  try {
    const { client, balance } = req.body;

    const oldUser = await User.findById(client);
    if (balance < 0 && Math.abs(balance) > oldUser.balance)
      return res.status(402).json("You Don't Have Enough Balance");

    const transaction = await Transaction.create({
      client,
      balance,
      worker: req.user._id,
    });

    const user = await User.findByIdAndUpdate(
      client,
      {
        $inc: { balance },
      },
      { new: true }
    ).select("balance email fullName");

    res.status(202).json({ transaction, user });
  } catch (error) {
    res.status(401).json(error);
  }
};

// export const redeemTransaction = async({params},res) => {
//   try {
//     const 
//   } catch (error) {
//     res.status(401).json(error)
//   }
// }

//////!  GET TRAN  !//////

export const getTransaction = async (req, res) => {
  try {
    if (!req.params._id) return res.status(404).json("Pease Provide An Id");
    const transaction = await Transaction.findById(req.params._id).populate([
      { path: "client", select: "email fullName phoneNumber " },
      { path: "worker", select: "email fullName phoneNumber " },
    ]);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(404).json(error);
  }
};

//////!  GET MY  !//////

export const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      client: req.user._id,
    })
      .populate([
        { path: "client", select: "email fullName phoneNumber " },
        { path: "worker", select: "email fullName phoneNumber " },
      ])
      .select("-__v");

    res.status(201).json(transactions);
  } catch (error) {
    res.status(401).json(error);
  }
};

// WORKER

//////!  GET USER TRANSACTIONS  !//////

export const getUserTransactions = async (req, res) => {
  try {
    const { client } = req.params;
    const transactions = await Transaction.find({
      client,
      balance: { $lt: 0 },
    });

    res.status(201).json(transactions).select("-__v");
  } catch (error) {
    res.status(401).json(error);
  }
};

// ADMIN

export const getAllTransactions = async ({ query }, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(query?.limit || 10)
      .skip((query?.page - 1) * query?.limit);

    res.status(201).json(transactions);
  } catch (error) {
    res.status(401).json(error);
  }
};
