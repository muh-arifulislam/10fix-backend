import moment from 'moment';
import { Customer } from '../customer/customer.model';
import { Order } from '../order/order.model';
import { Review } from '../review/review.model';

interface IOrderStatistics {
  totalOrders: number;
  ordersByStatus: Record<string, number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ordersOverTime: any;
  deletedOrders: number;
}

interface ICustomerStatistics {
  totalCustomers: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customersOverTime: any;
  customersByStatus: Record<string, number>;
}

const getOrderStatistics = async (): Promise<IOrderStatistics> => {
  // Total orders
  const totalOrders = await Order.countDocuments({});

  // Orders by status
  const ordersByStatus = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]).then(result => {
    return result.reduce(
      (acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      },
      {} as Record<string, number>,
    );
  });

  // Orders over time (example: count per day for the last 30 days)
  const sixMonthsAgo = moment().subtract(6, 'months').startOf('month').toDate();

  const orders = await Order.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
      },
    },
  ]);

  // Initialize the last 6 months with 0 counts
  const result: {
    x: string;
    y: number;
  }[] = [];
  for (let i = 0; i < 6; i++) {
    const month = moment().subtract(i, 'months');
    result.push({ x: month.format('MMMM'), y: 0 });
  }

  // Update the counts for the months we have data for
  orders.forEach(order => {
    const monthIndex = moment()
      .month(order._id - 1)
      .format('MMMM');
    const resultItem = result.find(r => r.x === monthIndex);
    if (resultItem) {
      resultItem.y = order.count;
    }
  });
  // Deleted orders
  const deletedOrders = await Order.countDocuments({ isDeleted: true });

  return {
    totalOrders,
    ordersByStatus,
    ordersOverTime: result.reverse(),
    deletedOrders,
  };
};

const getCustomerStatistics = async (): Promise<ICustomerStatistics> => {
  const totalCustomers = await Customer.countDocuments({});
  const customersByStatus = await Customer.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]).then(result => {
    return result.reduce(
      (acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      },
      {} as Record<string, number>,
    );
  });

  // Orders over time (example: count per day for the last 30 days)
  const sixMonthsAgo = moment().subtract(6, 'months').startOf('month').toDate();

  const customers = await Customer.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
      },
    },
  ]);

  // Initialize the last 6 months with 0 counts
  const result: {
    x: string;
    y: number;
  }[] = [];
  for (let i = 0; i < 6; i++) {
    const month = moment().subtract(i, 'months');
    result.push({ x: month.format('MMMM'), y: 0 });
  }

  // Update the counts for the months we have data for
  customers.forEach(customer => {
    const monthIndex = moment()
      .month(customer._id - 1)
      .format('MMMM');
    const resultItem = result.find(r => r.x === monthIndex);
    if (resultItem) {
      resultItem.y = customer.count;
    }
  });

  return {
    totalCustomers,
    customersByStatus,
    customersOverTime: result.reverse(),
  };
};

const getAvgReview = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$ratings' },
      },
    },
  ]);

  const averageRating = result.length > 0 ? result[0].averageRating : 0;
  return averageRating;
};

export const StatsServices = {
  getOrderStatistics,
  getCustomerStatistics,
  getAvgReview,
};
