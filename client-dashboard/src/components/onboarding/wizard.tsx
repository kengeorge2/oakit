'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { updateProfile, completeOnboarding, getPlans, getSupportedCurrencies } from '@/lib/api';
import { setPersistedCurrency } from '@/lib/format';

const STEPS = ['company', 'currency', 'plan', 'ticket'] as const;
type StepId = (typeof STEPS)[number];

interface WizardData {
  company_name: string;
  currency: string;
  country: string;
  plan_id: string;
}

interface Props {
  onComplete: () => void;
}

export default function OnboardingWizard({ onComplete }: Props) {
  const { user, fetchUser } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    company_name: user?.company_name || '',
    currency: 'USD',
    country: '',
    plan_id: '',
  });
  const [currencyOptions, setCurrencyOptions] = useState<Record<string, { symbol: string; name: string; country: string }>>({});
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load currency options + plans once
  useEffect(() => {
    Promise.all([getSupportedCurrencies(), getPlans()])
      .then(([curData, planData]) => {
        if (curData?.currencies) setCurrencyOptions(curData.currencies);
        setPlans(planData || []);
      })
      .catch(() => {});
  }, []);

  const update = (patch: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  const handleNext = async () => {
    setError('');
    setLoading(true);
    try {
      // Persist company name if provided and different
      if (data.company_name && data.company_name !== user?.company_name) {
        await updateProfile({ company_name: data.company_name });
      }

      if (step === 1) {
        // Currency chosen — persist
        setPersistedCurrency(data.currency || 'USD');
      }

      if (step < STEPS.length - 1) {
        setStep(step + 1);
      } else {
        // Final step — mark onboarding complete
        await completeOnboarding({
          company_name: data.company_name,
          currency: data.currency,
          country: data.country,
        });
        await fetchUser();
        onComplete();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setLoading(true);
    completeOnboarding({ company_name: data.company_name, currency: data.currency, country: data.country })
      .catch(() => {})
      .finally(() => {
        fetchUser().finally(() => {
          setLoading(false);
          onComplete();
        });
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
        {/* Progress */}
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-gray-700'}`}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-white">
          {step === 0 && "Welcome! Let's set up your company"}
          {step === 1 && 'Select your currency'}
          {step === 2 && 'Choose your plan'}
          {step === 3 && 'Any service tickets to start? (optional)'}
        </h2>

        {error && (
          <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>
        )}

        {/* Step: Company */}
        {step === 0 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Company Name</label>
            <input
              value={data.company_name}
              onChange={(e) => update({ company_name: e.target.value })}
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500"
              placeholder="Your Company Ltd"
            />
            <p className="text-xs text-gray-500">
              Your company name is used on invoices and support tickets.
            </p>
          </div>
        )}

        {/* Step: Currency */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Currency</label>
            <select
              value={data.currency}
              onChange={(e) => {
                const code = e.target.value;
                update({
                  currency: code,
                  country: currencyOptions[code]?.country || data.country,
                });
              }}
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
            >
              {Object.entries(currencyOptions).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.symbol} {info.name} ({code})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500">
              Prices will be shown in your preferred currency. You can change this later.
            </p>
          </div>
        )}

        {/* Step: Plan */}
        {step === 2 && (
          <div className="space-y-3">
            {plans
              .filter((p) => p.slug !== 'oakit-advanced')
              .map((plan) => {
                const price = parseFloat(plan.price_monthly);
                const isSelected = data.plan_id === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => update({ plan_id: plan.id })}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{plan.name}</span>
                      <span className="text-lg font-bold text-white">
                        ${price ? price.toLocaleString() : 'N/A'}
                        <span className="text-xs font-normal text-gray-400">/mo</span>
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{plan.description}</p>
                  </button>
                );
              })}
          </div>
        )}

        {/* Step: Ticket (optional) */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              If you need help setting up, submit a support ticket and our team will reach
              out. You can skip this — tickets can be created anytime from the dashboard.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              disabled={loading}
              className="text-sm text-gray-400 hover:text-gray-200 disabled:opacity-50"
            >
              {step === STEPS.length - 1 ? 'Skip' : 'Skip for now'}
            </button>
            <button
              onClick={handleNext}
              disabled={loading || (step === 0 && !data.company_name.trim())}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : step === STEPS.length - 1 ? 'Finish' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
