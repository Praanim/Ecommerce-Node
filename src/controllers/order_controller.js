const { json } = require("body-parser");
const OrderModel = require("../models/order_model");

class OrderController {
  static async createOrder(req, res) {
    try {
      const orderData = req.body;
      const newOrder = new OrderModel(orderData);
      await newOrder.save();

      return res.status(201).json({
        success: true,
        data: newOrder,
        message: "Order is Created Successfully",
      });
    } catch (ex) {
      return res.status(500).json({
        success: false,
        data: null,
        message: ex,
      });
    }
  }

  static async getOrderByUserId(req, res) {
    try {
      const { userId } = req.params;

      const orders = await OrderModel.find({ userId: userId });

      if (!orders) {
        return res.status(204).json({
          success: true,
          data: [],
          message: "New Orders found for the user",
        });
      }

      return res.status(200).json({
        success: true,
        data: orders,
        message: "Orders found for the user.",
      });
    } catch (ex) {
      return res.status(500).json({
        success: false,
        data: null,
        message: ex,
      });
    }
  }

  static async updateOrderById(req, res) {
    try {
      const { id, status } = req.body;

      const order = await OrderModel.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "Order with given id doesn't exist",
        });
      }
      order.status = status;
      await order.save();

      return res.status(200).json({
        success: true,
        data: order,
        message: "Order has been updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: order,
        message: error,
      });
    }
  }
}

module.exports = OrderController;
