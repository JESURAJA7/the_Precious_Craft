import React, { useState, useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/Typography/PageTitle";
import AnimatedContent from "@/components/common/AnimatedContent";
import useAsync from "@/hooks/useAsync";

import PricingServices from "@/services/PricingServices";

const PricingEngine = () => {
  const { t } = useTranslation();

  const { setIsUpdate } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(() =>
    PricingServices.getRates()
  );

  const latest = data?.latest;

  const [form, setForm] = useState({
    gold: latest?.gold || "",
    silver: latest?.silver || "",
    brass: latest?.brass || "",
    note: "",
  });

  const [saving, setSaving] = useState(false);
  const [recalcLoading, setRecalcLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveRates = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await PricingServices.createRate({
        gold: Number(form.gold),
        silver: Number(form.silver),
        brass: Number(form.brass),
        note: form.note,
      });
      setMessage("Rates updated successfully.");
      setIsUpdate(true);
    } catch (err) {
      console.error(err);
      // Assuming err is an object, try to get a more readable message
      setMessage(err.response?.data?.message || err.message || "An unknown error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalcLoading(true);
    setMessage("");

    try {
      const res = await PricingServices.recalculateAllProductPrices();
      setMessage(
        `Recalculated prices for ${res.updatedCount} products using latest rates.`
      );
    } catch (err) {
      console.error(err);
      // Assuming err is an object, try to get a more readable message
      setMessage("Failed to recalculate prices. " + (err.response?.data?.message || err.message || "Check console for details."));
    } finally {
      setRecalcLoading(false);
    }
  };

  return (
    <>
      {/* Updated: Spacing and Typography */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6 lg:py-8 gap-3">
        <div className="min-w-0 flex-1">
          <PageTitle>💰 Pricing Engine</PageTitle>
          <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage daily gold / silver / brass rates and update product prices globally.
          </p>
        </div>
      </div>

      <AnimatedContent>
        {/* Updated: Softer shadow, rounded corners, cleaner background */}
        <Card className="min-w-0 shadow-lg rounded-xl bg-white dark:bg-gray-850 mb-6">
          <CardContent className="p-6 md:p-8 space-y-8">
            {loading && <p className="text-gray-500 dark:text-gray-400">Loading current rates...</p>}
            {error && (
              <p className="text-red-500 font-medium">🚨 Failed to load rates: {error}</p>
            )}

            {latest && (
              /* Updated: Cleaner box with a subtle border and softer background */
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 text-sm bg-gray-50 dark:bg-gray-900/50 transition duration-150">
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">Latest Market Rates</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-x-4">
                  <div className="font-medium text-gray-600 dark:text-gray-400">
                    <span className="text-gray-900 dark:text-white mr-2">Gold:</span> {latest.gold} / gram
                  </div>
                  <div className="font-medium text-gray-600 dark:text-gray-400">
                    <span className="text-gray-900 dark:text-white mr-2">Silver:</span> {latest.silver} / gram
                  </div>
                  <div className="font-medium text-gray-600 dark:text-gray-400">
                    <span className="text-gray-900 dark:text-white mr-2">Brass:</span> {latest.brass} / gram
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 border-t pt-3 dark:border-gray-700">
                  Last updated: **{new Date(latest.createdAt).toLocaleString()}**
                </p>
              </div>
            )}

            <form
              onSubmit={handleSaveRates}
              /* Updated: More modern grid layout */
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Gold Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Gold rate (per gram)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="gold"
                  value={form.gold}
                  onChange={handleChange}
                  required
                  /* Assuming your Input component has modern styles, no change needed here */
                  placeholder={latest?.gold || "e.g., 5000"}
                />
              </div>

              {/* Silver Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Silver rate (per gram)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="silver"
                  value={form.silver}
                  onChange={handleChange}
                  required
                  placeholder={latest?.silver || "e.g., 60"}
                />
              </div>

              {/* Brass Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Brass rate (per gram)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="brass"
                  value={form.brass}
                  onChange={handleChange}
                  required
                  placeholder={latest?.brass || "e.g., 5"}
                />
              </div>

              {/* Note Input (Full width) */}
              <div className="lg:col-span-3 md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Note (optional)
                </label>
                <Input
                  type="text"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Market source, date, or other key notes..."
                />
              </div>

              {/* Buttons (Full width) */}
              <div className="lg:col-span-3 md:col-span-2 flex flex-wrap gap-4 pt-2">
                {/* Button colors preserved by variants */}
                <Button type="submit" variant="create" disabled={saving}>
                  {saving ? "💾 Saving..." : "Save Today's Rates"}
                </Button>

                <Button
                  type="button"
                  variant="bulkAction"
                  disabled={recalcLoading}
                  onClick={handleRecalculate}
                >
                  {recalcLoading ? "⚙️ Recalculating..." : "Recalculate Prices"}
                </Button>
              </div>
            </form>

            {message && (
              <p className={`text-sm mt-4 font-medium ${message.includes('Failed') || message.includes('error') ? 'text-red-500 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </AnimatedContent>
    </>
  );
};

export default PricingEngine;