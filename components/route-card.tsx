'use client';

import {
  Clock,
  MapPin,
  Repeat,
  Flag,
  Wallet,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import type { RouteOption } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface RouteCardProps {
  route: RouteOption;
  cheapest: boolean;
  fastest: boolean;
}

export default function RouteCard({
  route,
  cheapest,
  fastest,
}: RouteCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
            {route.id}
          </div>
          <div>
            <h3 className="text-base font-semibold leading-tight text-slate-900">
              {route.routeName}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              {route.transferPoint ? 'Transfer required' : 'Direct route'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {cheapest && (
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Cheapest
            </Badge>
          )}
          {fastest && (
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
              Fastest
            </Badge>
          )}
        </div>
      </div>

      {/* Fare + time */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-50 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-blue-700">
            <Wallet className="h-3.5 w-3.5" />
            Total Fare
          </div>
          <p className="mt-1 text-2xl font-bold text-blue-900">
            Rs. {route.totalFarePKR}
          </p>
          <p className="text-[11px] text-blue-600/80">PKR, one-way</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            Travel Time
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {route.estimatedTimeMin}
            <span className="ml-1 text-sm font-medium text-slate-500">min</span>
          </p>
          <p className="text-[11px] text-slate-500">approx. door-to-door</p>
        </div>
      </div>

      {/* Stops */}
      <div className="mt-4 space-y-2.5">
        <StopRow
          icon={<MapPin className="h-4 w-4 text-emerald-600" />}
          label="Board at"
          value={route.boardingPoint}
        />
        {route.transferPoint ? (
          <StopRow
            icon={<Repeat className="h-4 w-4 text-amber-600" />}
            label="Transfer at"
            value={route.transferPoint}
          />
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-500">
            <ArrowRight className="h-3.5 w-3.5" />
            No transfer — stay on the same service.
          </div>
        )}
        <StopRow
          icon={<Flag className="h-4 w-4 text-rose-600" />}
          label="Drop off at"
          value={route.dropoffPoint}
        />
      </div>

      {/* Student guide */}
      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
          <Lightbulb className="h-3.5 w-3.5" />
          Freshman tip
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
          {route.studentGuide}
        </p>
      </div>
    </div>
  );
}

function StopRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
