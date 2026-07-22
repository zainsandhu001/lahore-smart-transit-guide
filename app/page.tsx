'use client';

import { useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import {
  Search,
  MapPin,
  Navigation,
  Loader2,
  AlertCircle,
  Train,
  Bus,
  Zap,
  Sparkles,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RouteCard from '@/components/route-card';
import { fetchRoutes } from '@/lib/gemini';
import type { RouteOption } from '@/lib/types';

const TransitMap = dynamic(() => import('@/components/transit-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </div>
  ),
});

interface FormState {
  currentLocation: string;
  destination: string;
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    currentLocation: '',
    destination: '',
  });
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.currentLocation.trim() || !form.destination.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await fetchRoutes({
        currentLocation: form.currentLocation.trim(),
        destination: form.destination.trim(),
      });
      setRoutes(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while calculating your route.'
      );
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  }

  const cheapestFare = routes.length
    ? Math.min(...routes.map((r) => r.totalFarePKR))
    : 0;
  const fastestTime = routes.length
    ? Math.min(...routes.map((r) => r.estimatedTimeMin))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Navigation className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <h1 className="text-sm font-bold text-slate-900 sm:text-base">
                Lahore Smart Transit Guide
              </h1>
              <p className="hidden text-[11px] text-slate-500 sm:block">
                Multi-modal routes for university freshmen
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-slate-500 md:flex">
            <ModeChip icon={<Train className="h-3.5 w-3.5" />} label="Orange Line" />
            <ModeChip icon={<Bus className="h-3.5 w-3.5" />} label="Metro Bus" />
            <ModeChip icon={<Bus className="h-3.5 w-3.5" />} label="Speedo" />
            <ModeChip icon={<Zap className="h-3.5 w-3.5" />} label="EV Bus" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Hero + form */}
        <section className="pt-10 sm:pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered route planner
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find your way across Lahore
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              New to the city? Tell us where you are and where you&apos;re going —
              we&apos;ll compare the Orange Line, Metro Bus, Speedo feeders and EV
              buses to find your best route.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledInput
                icon={<MapPin className="h-4 w-4" />}
                label="Current Location"
                placeholder="e.g. Allama Iqbal Town"
                value={form.currentLocation}
                onChange={(v) => setForm((f) => ({ ...f, currentLocation: v }))}
              />
              <LabeledInput
                icon={<Navigation className="h-4 w-4" />}
                label="Destination"
                placeholder="e.g. Punjab University, New Campus"
                value={form.destination}
                onChange={(v) => setForm((f) => ({ ...f, destination: v }))}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="mt-5 h-12 w-full bg-blue-600 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-60 sm:w-auto sm:px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Finding best route…
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Find Best Route
                </>
              )}
            </Button>
          </form>
        </section>

        {/* Results */}
        {loading && <LoadingState />}

        {!loading && error && (
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-rose-200 bg-rose-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
              <div>
                <p className="font-semibold text-rose-900">
                  Couldn&apos;t calculate routes
                </p>
                <p className="mt-1 text-sm text-rose-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && hasSearched && routes.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Suggested routes
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  From <span className="font-medium text-slate-700">{form.currentLocation}</span>{' '}
                  to <span className="font-medium text-slate-700">{form.destination}</span>
                </p>
              </div>
              <span className="hidden text-sm text-slate-400 sm:block">
                {routes.length} options compared
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
                <RouteCard
                  key={r.id}
                  route={r}
                  cheapest={r.totalFarePKR === cheapestFare}
                  fastest={r.estimatedTimeMin === fastestTime}
                />
              ))}
            </div>
          </section>
        )}

        {/* Map */}
        <section className="mt-14">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Explore Lahore&apos;s transit network
            </h3>
          </div>
          <TransitMap />
          <p className="mt-2 text-xs text-slate-400">
            Map data &copy; OpenStreetMap contributors — pan and zoom to find
            Orange Line and Metro Bus stations near you.
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
          Lahore Smart Transit Guide — built for university freshmen. Fares and
          times are estimates; always confirm at the station.
        </div>
      </footer>
    </div>
  );
}

function ModeChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
      {icon}
      {label}
    </span>
  );
}

function LabeledInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
          required
        />
      </div>
    </label>
  );
}

function LoadingState() {
  return (
    <section className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="mt-4 text-base font-semibold text-slate-800">
        AI is calculating your best routes…
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Comparing fares, transfers and travel times across Lahore&apos;s transit
        network.
      </p>
    </section>
  );
}
