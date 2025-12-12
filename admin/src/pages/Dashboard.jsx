import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { SidebarContext } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { FiChevronRight, FiClock, FiTrendingUp } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { motion } from "framer-motion";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// services + components (assume same project structure)
import OrderServices from "@/services/OrderServices";
import PricingServices from "@/services/PricingServices";
import PageTitle from "@/components/Typography/PageTitle";
import CardItem from "@/components/dashboard/CardItem";
import CardItemTwo from "@/components/dashboard/CardItemTwo";
import LineChart from "@/components/chart/LineChart/LineChart";
import PieChart from "@/components/chart/Pie/PieChart";
import OrderTable from "@/components/order/OrderTable";
import { CustomPagination as Pagination } from "@/components/ui/pagination";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import AnimatedContent from "@/components/common/AnimatedContent";

// small utility
const formatCurrency = (v) => (typeof v === "number" ? v.toFixed(2) : v || 0);

dayjs.extend(isBetween);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function DashboardModern() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { currentPage, handleChangePage } = useContext(SidebarContext);

  // queries
  const { data: bestSellerProductChart, isLoading: loadingBestSeller } =
    useQuery({
      queryKey: ["bestSellerProductChart"],
      queryFn: OrderServices.getBestSellerProductChart,
      staleTime: 20 * 60 * 1000,
    });

  const { data: dashboardRecentOrder, isLoading: loadingRecentOrder, error } =
    useQuery({
      queryKey: ["dashboardRecentOrder", currentPage],
      queryFn: () =>
        OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 }),
      staleTime: 10 * 60 * 1000,
      placeholderData: keepPreviousData,
    });

  const { data: dashboardOrderCount, isLoading: loadingOrderCount } =
    useQuery({ queryKey: ["dashboardOrderCount"], queryFn: OrderServices.getDashboardCount, staleTime: 15 * 60 * 1000 });

  const { data: dashboardOrderAmount, isLoading: loadingOrderAmount } =
    useQuery({ queryKey: ["dashboardOrderAmount"], queryFn: OrderServices.getDashboardAmount, staleTime: 15 * 60 * 1000 });

  const { data: pricingData } = useQuery({ queryKey: ["rates"], queryFn: PricingServices.getRates, staleTime: 5 * 60 * 1000 });
  const latestRates = pricingData?.latest;

  // derived UI state using useMemo for performance
  const { salesReport, paymentSummary, todayTotals, yesterdayTotals } = useMemo(() => {
    const salesReport = [];
    const orders = dashboardOrderAmount?.ordersData || [];

    // weekly sales (last 7 days)
    const last7Start = dayjs().subtract(6, "day").startOf("day");
    const map = {};
    orders.forEach((o) => {
      const d = dayjs(o.updatedAt);
      if (d.isBetween(last7Start.toDate(), new Date(), null, "[]")) {
        const key = d.format("YYYY-MM-DD");
        if (!map[key]) map[key] = { date: key, total: 0, order: 0 };
        map[key].total += Number(o.total || 0);
        map[key].order += 1;
      }
    });
    // build report with guaranteed 7 entries (fill zeros)
    for (let i = 6; i >= 0; i--) {
      const day = dayjs().subtract(i, "day");
      const key = day.format("YYYY-MM-DD");
      salesReport.push(map[key] || { date: key, total: 0, order: 0 });
    }

    // payments
    const payments = { today: {}, yesterday: {} };

    orders.forEach((o) => {
      const d = dayjs(o.updatedAt);
      const row = d.isToday() ? payments.today : d.isYesterday() ? payments.yesterday : null;
      if (!row) return;
      const m = o.paymentMethod || "Unknown";
      row[m] = (row[m] || 0) + Number(o.total || 0);
    });

    const toObj = (obj) => ({
      Cash: obj.Cash || 0,
      Card: obj.Card || 0,
      Credit: obj.Credit || 0,
    });

    const todayTotals = orders.filter((o) => dayjs(o.updatedAt).isToday()).reduce((s, o) => s + Number(o.total || 0), 0);
    const yesterdayTotals = orders.filter((o) => dayjs(o.updatedAt).isYesterday()).reduce((s, o) => s + Number(o.total || 0), 0);

    return {
      salesReport,
      paymentSummary: { today: toObj(payments.today), yesterday: toObj(payments.yesterday) },
      todayTotals,
      yesterdayTotals,
    };
  }, [dashboardOrderAmount]);

  const dataTable = dashboardRecentOrder?.orders || [];

  return (
    <div className="space-y-6">
      <div className="lg:flex lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <PageTitle>{t("DashboardOverview")}</PageTitle>
          <p className="text-sm text-muted-foreground mt-1">A modern, compact overview of key metrics.</p>
        </div>

        <div className="flex items-center gap-4">
          {latestRates ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 bg-gradient-to-r from-white/60 to-white/10 dark:from-gray-800/60 dark:to-gray-800/30 px-4 py-2 rounded-2xl shadow-md backdrop-blur"
            >
              <div className="text-xs text-muted-foreground">Gold</div>
              <div className="font-semibold text-lg">₹{latestRates.gold}</div>
              <div className="border-l h-6 w-px border-gray-200 dark:border-gray-700" />
              <div className="text-xs text-muted-foreground">Silver</div>
              <div className="font-semibold text-lg">₹{latestRates.silver}</div>
              <div className="border-l h-6 w-px border-gray-200 dark:border-gray-700" />
              <div className="text-xs text-muted-foreground">Brass</div>
              <div className="font-semibold text-lg">₹{latestRates.brass}</div>
            </motion.div>
          ) : null}

          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white shadow hover:shadow-lg">
            <FiChevronRight /> <span className="text-sm">Open Reports</span>
          </button>
        </div>
      </div>

      <AnimatedContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <CardItemTwo
            mode={theme}
            title="Today"
            title2="TodayOrder"
            Icon={ImStack}
            cash={paymentSummary.today?.Cash || 0}
            card={paymentSummary.today?.Card || 0}
            credit={paymentSummary.today?.Credit || 0}
            price={todayTotals}
            className="col-span-1 xl:col-span-2 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
            loading={loadingOrderAmount}
          />

          <CardItemTwo
            mode={theme}
            title="Yesterday"
            title2="YesterdayOrder"
            Icon={ImStack}
            cash={paymentSummary.yesterday?.Cash || 0}
            card={paymentSummary.yesterday?.Card || 0}
            credit={paymentSummary.yesterday?.Credit || 0}
            price={yesterdayTotals}
            className="col-span-1 bg-gradient-to-br from-orange-400 to-orange-500 text-white"
            loading={loadingOrderAmount}
          />

          <CardItemTwo
            mode={theme}
            title2="This Month"
            Icon={FiTrendingUp}
            price={dashboardOrderAmount?.thisMonthlyOrderAmount || 0}
            className="col-span-1 bg-gradient-to-br from-sky-500 to-indigo-500 text-white"
            loading={loadingOrderAmount}
          />

          <CardItemTwo
            mode={theme}
            title2="All Time"
            Icon={FiClock}
            price={dashboardOrderAmount?.totalAmount || 0}
            className="col-span-1 bg-gradient-to-br from-violet-600 to-pink-600 text-white"
            loading={loadingOrderAmount}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-card dark:bg-gray-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Weekly Sales</h3>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
            <div className="h-52">
              <LineChart salesReport={salesReport} />
            </div>
          </div>

          <div className="bg-card dark:bg-gray-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Best Selling</h3>
              <div className="text-xs text-muted-foreground">Top products</div>
            </div>
            <div className="h-52 flex items-center justify-center">
              <PieChart data={bestSellerProductChart} />
            </div>
          </div>
        </div>
      </AnimatedContent>

      <div className="bg-card dark:bg-gray-800 rounded-xl p-4 shadow">
        <div className="flex items-center justify-between mb-4">
          <PageTitle>{t("RecentOrder")}</PageTitle>
          <div className="text-sm text-muted-foreground">Showing latest orders</div>
        </div>

        <div>
          {loadingRecentOrder ? (
            <TableLoading row={5} col={6} />
          ) : error ? (
            <div className="text-red-500">{String(error)}</div>
          ) : dataTable?.length ? (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Invoice</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Method</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-gray-800">
                    <OrderTable orders={dataTable} />
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <Pagination
                  totalresults={dashboardRecentOrder?.totalOrder}
                  resultsperpage={8}
                  onChange={handleChangePage}
                  label="Table navigation"
                />
              </div>
            </div>
          ) : (
            <NotFound title="Sorry, there are no orders right now." />
          )}
        </div>
      </div>
    </div>
  );
}
