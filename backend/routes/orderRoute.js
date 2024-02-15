const express=require("express");
const router=express.Router();
const {IsAuthenticateduser,authorizeRoles}=require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

router.route("/order/new").post(IsAuthenticateduser,newOrder);

router.route("/order/:id").get(IsAuthenticateduser,authorizeRoles("admin"),getSingleOrder);

router.route("/orders/me").get(IsAuthenticateduser,myOrders);

router.route("/admin/orders").get(IsAuthenticateduser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put(IsAuthenticateduser,authorizeRoles("admin"),updateOrder)
                                .delete(IsAuthenticateduser,authorizeRoles("admin"),deleteOrder);
                                


module.exports=router;