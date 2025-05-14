import { Controller } from "@/types/controller";
import { HTTP_STATUS_TYPES, getServerError } from "@/utils/statusCodes";
import { handleServerError } from "@/utils/error";
import { Sale } from "@/models/sale";
import { Product } from "@/models/product";

export const weeklySales: Controller = async (req, res) => {
  try {
    const salesByWeek = await Sale.aggregate([
      {
        $addFields: {
          weekStart: {
            $toDate: {
              $subtract: [
                { $toLong: "$saleDate" },
                {
                  $mod: [{ $toLong: "$saleDate" }, 1_000 * 60 * 60 * 24 * 7],
                },
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: "$weekStart",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return res.json(salesByWeek);
  } catch (e) {
    const [status, jsonRes] = handleServerError(e);
    return res.status(status).json(jsonRes);
  }
};

export const statusProducts: Controller = async (req, res) => {
  try {
    const activeCount = await Product.countDocuments({ status: true });
    const inactiveCount = await Product.countDocuments({ status: false });
    const activeProductsByWeek = await Product.aggregate([
      { $match: { status: true } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1,
        },
      },
    ]);
    const inactiveProductsByWeek = await Product.aggregate([
      { $match: { status: false } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1,
        },
      },
    ]);
    return res.json({
      active: {
        count: activeCount,
        productsByWeek: activeProductsByWeek.map((entry) => ({
          date: `${entry._id.year}-W${String(entry._id.week).padStart(2, "0")}`,
          value: entry.count,
        })),
      },
      inactive: {
        count: inactiveCount,
        productsByWeek: inactiveProductsByWeek.map((entry) => ({
          date: `${entry._id.year}-W${String(entry._id.week).padStart(2, "0")}`,
          value: entry.count,
        })),
      },
    });
  } catch (e) {
    const [status, jsonRes] = handleServerError(e);
    return res.status(status).json(jsonRes);
  }
};

export const productGroupByCategories: Controller = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $unwind: "$categories" },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          category: "$category.name",
          count: 1,
        },
      },
    ]);
    return res.json(products);
  } catch (e) {
    const [status, jsonRes] = handleServerError(e);
    return res.status(status).json(jsonRes);
  }
};

export const saleChartByYear: Controller = async (req, res) => {
  try {
    const { year = 2024 } = req.query;
    const sales = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$saleDate" },
            status: "$status",
          },
          totalSales: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          totalSales: { $sum: "$totalSales" },
          statusCounts: {
            $push: {
              status: "$_id.status",
              count: "$totalSales",
            },
          },
        },
      },
      {
        $project: {
          month: "$_id",
          totalSales: 1,
          statusCounts: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    return res.status(200).json(sales);
  } catch (e) {
    const [status, jsonRes] = handleServerError(e);
    return res.status(status).json(jsonRes);
  }
};
