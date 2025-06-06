import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BPJS_KESEHATAN_CAP = 12000000;
const BPJS_JHT_CAP = 8930600;
const BPJS_JP_CAP = 8930600;

const ptkpOptions = [
  { id: 'single', label: 'Single (TK/0)', value: 54000000 },
  { id: 'married0', label: 'Married (K/0)', value: 58500000 },
  { id: 'married1', label: 'Married (K/1)', value: 63000000 },
  { id: 'married2', label: 'Married (K/2)', value: 67500000 },
  { id: 'married3', label: 'Married (K/3)', value: 72000000 },
];

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const calculateMonthlyIncomeTax = (annualGross: number, ptkpValue: number): number => {
  const taxableIncome = annualGross - ptkpValue;
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let remaining = taxableIncome;

  // Tax brackets calculation
  if (remaining > 5000000000) {
    tax += (remaining - 5000000000) * 0.35;
    remaining = 5000000000;
  }
  if (remaining > 500000000) {
    tax += (remaining - 500000000) * 0.3;
    remaining = 500000000;
  }
  if (remaining > 250000000) {
    tax += (remaining - 250000000) * 0.25;
    remaining = 250000000;
  }
  if (remaining > 60000000) {
    tax += (remaining - 60000000) * 0.15;
    remaining = 60000000;
  }
  tax += remaining * 0.05;

  return tax / 12;
};

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [ptkp, setPtkp] = useState<number>(ptkpOptions[0].value);

  // Calculate deductions
  const annualGross = grossSalary * 12;
  const monthlyTax = calculateMonthlyIncomeTax(annualGross, ptkp);
  
  const bpjsKesehatan = Math.min(
    grossSalary * 0.01,
    BPJS_KESEHATAN_CAP * 0.01
  );
  const bpjsJht = Math.min(
    grossSalary * 0.02,
    BPJS_JHT_CAP * 0.02
  );
  const bpjsJp = Math.min(
    grossSalary * 0.01,
    BPJS_JP_CAP * 0.01
  );

  const totalDeductions = monthlyTax + bpjsKesehatan + bpjsJht + bpjsJp;
  const netSalary = grossSalary - totalDeductions;
const { t } = useTranslation();
  return (
    <div className="min-h-screen py-8 mt-32 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          {t("salaryCalculator.title")}
        </h1>

        {/* Form Input */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("salaryCalculator.form.grossSalary")}
            </label>
            <input
              type="number"
              value={grossSalary || ''}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder={t("salaryCalculator.form.grossSalaryPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("salaryCalculator.form.ptkpStatus")}
            </label>
            <select
              value={ptkp}
              onChange={(e) => setPtkp(Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option value={54000000}>{t("salaryCalculator.ptkpOptions.single")}</option>
              <option value={58500000}>{t("salaryCalculator.ptkpOptions.married0")}</option>
              <option value={63000000}>{t("salaryCalculator.ptkpOptions.married1")}</option>
              <option value={67500000}>{t("salaryCalculator.ptkpOptions.married2")}</option>
              <option value={72000000}>{t("salaryCalculator.ptkpOptions.married3")}</option>
            </select>
          </div>
        </div>

        {/* Result Breakdown */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {t("salaryCalculator.result.title")}
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {t("salaryCalculator.result.grossSalary")}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {formatIDR(grossSalary)}
                </span>
              </div>

              <div className="border-t pt-2 mt-2 border-gray-300 dark:border-gray-600">
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>{t("salaryCalculator.result.incomeTax")}</span>
                  <span>{formatIDR(monthlyTax)}</span>
                </div>
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>{t("salaryCalculator.result.bpjsKesehatan")}</span>
                  <span>{formatIDR(bpjsKesehatan)}</span>
                </div>
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>{t("salaryCalculator.result.bpjsJht")}</span>
                  <span>{formatIDR(bpjsJht)}</span>
                </div>
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>{t("salaryCalculator.result.bpjsJp")}</span>
                  <span>{formatIDR(bpjsJp)}</span>
                </div>
              </div>

              <div className="border-t pt-2 mt-2 border-gray-300 dark:border-gray-600">
                <div className="flex justify-between font-semibold text-gray-800 dark:text-gray-200">
                  <span>{t("salaryCalculator.result.totalDeductions")}</span>
                  <span>{formatIDR(totalDeductions)}</span>
                </div>
                <div className="flex justify-between font-semibold text-green-600 dark:text-green-400">
                  <span>{t("salaryCalculator.result.netSalary")}</span>
                  <span>{formatIDR(netSalary)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}