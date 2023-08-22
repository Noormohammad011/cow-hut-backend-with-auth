import httpStatus from 'http-status';
import { Document, startSession } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../auth/auth.model';
import { Cow } from '../cow/cow.model';
import { IOrder, Payload } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const { cow, buyer } = payload;
  const session = await startSession();
  session.startTransaction();
  try {
    const options = { session };
    // Retrieve the cow and buyer information
    const selectedCow = await Cow.findById(cow).session(session);
    if (!selectedCow) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
    }
    const buyerInfo = await User.findById(buyer).session(session);
    if (!buyerInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found !');
    }
    // Check if the selected cow is already sold out
    if (selectedCow.label === 'sold out') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is already sold out');
    }

    // Check if the buyer has enough money
    if (buyerInfo.budget < selectedCow.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Buyer does not have enough money'
      );
    }
    // Update cow's label to 'sold out'
    selectedCow.label = 'sold out';
    await selectedCow.save(options);

    // Deduct the cost from the buyer's budget
    buyerInfo.budget -= selectedCow.price;
    await buyerInfo.save(options);

    // Increase the seller's income by the same amount
    const sellerInfo = await User.findById(selectedCow.seller).session(session);
    if (!sellerInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found !');
    }
    sellerInfo.income += selectedCow.price;
    await sellerInfo.save(options);
    // Create an entry in the orders collection
    const order = new Order({
      cow,
      buyer,
    });
    await order.save(options);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getOrders = async (payload: Payload): Promise<IOrder[] | null> => {
  const { _id, role } = payload;

  let orders: Document<IOrder>[] | null = null;

  if (role === 'admin') {
    orders = await Order.find({})
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer');
  } else if (role === 'buyer') {
    orders = await Order.find({ buyer: _id })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer');
  } else if (role === 'seller') {
    orders = await Order.find({
      cow: {
        $in: await Cow.find({ seller: _id }).distinct('_id'),
      },
    })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer');
  }

  if (!orders) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found!');
  }

  return orders.map(order => order.toObject() as IOrder);
};

const getSingleOrder = async (payload: Payload): Promise<IOrder | null> => {
  const { _id, role, orderId } = payload;

  let order: Document<IOrder> | null = null;

  if (role === 'admin') {
    order = await Order.findById(orderId)
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer');
  } else if (role === 'buyer') {
    order = await Order.findOne({ _id: orderId, buyer: _id })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer');
  } else if (role === 'seller') {
    order = await Order.findOne({
      cow: {
        $in: await Cow.find({ seller: _id }).distinct('_id'),
      },
    })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer');
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  return order.toObject() as IOrder;
};
export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
