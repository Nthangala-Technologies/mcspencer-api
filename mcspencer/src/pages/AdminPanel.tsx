import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Package, MessageSquare, TrendingUp,
  RefreshCw, Trash2, Check, ChevronDown, X, AlertCircle, Boxes,
  DollarSign, Users, Mail, ArrowUpRight, Edit2, Save, BarChart3, Car,
  Plus, Upload, Link2,
} from "lucide-react";
import { products } from "../lib/data";
import { carListings, type CarListing } from "../lib/carData";
import { formatZAR } from "../lib/currency";

const API = (import.meta.env.VITE_API_URL ?? "") + "/api";

type Tab = "dashboard" | "orders" | "inventory" | "messages" | "analytics" | "cars";

const STATUS_COLOURS: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped:    "bg-indigo-100 text-indigo-800",
  completed:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",
};

const MSG_STATUS_COLOURS: Record<string, string> = {
  unread:   "bg-red-100 text-red-700",
  read:     "bg-gray-100 text-gray-600",
  resolved: "bg-green-100 text-green-700",
};

function KpiCard({ icon, label, value, sub, accent }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; accent: string;
}) {
  return (
    <div className={`rounded-2xl border-2 bg-white p-5 flex gap-4 items-start ${accent}`}>
      <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-2xl font-black text-[hsl(222,62%,28%)] mt-0.5">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function MiniBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-24 truncate">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-[hsl(86,72%,45%)] rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-[hsl(222,62%,28%)] w-6 text-right">{value}</span>
    </div>
  );
}

// ── Dashboard tab ─────────────────────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/admin/stats`);
      setStats(await r.json());
    } catch { setStats(null); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <Loader />;
  if (!stats || stats.error) return <ErrorState onRetry={load} />;

  const maxDaily = Math.max(...(stats.dailyOrders || []).map((d: any) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={<ShoppingBag className="w-5 h-5 text-[hsl(222,62%,28%)]" />} label="Total Orders" value={stats.orders.total} sub={`${stats.orders.pending} pending`} accent="border-border" />
        <KpiCard icon={<DollarSign className="w-5 h-5 text-green-600" />} label="Total Revenue" value={formatZAR(stats.orders.revenue)} sub="All time" accent="border-green-200" />
        <KpiCard icon={<Check className="w-5 h-5 text-[hsl(86,72%,38%)]" />} label="Completed" value={stats.orders.completed} sub="Orders fulfilled" accent="border-[hsl(86,72%,45%)]/30" />
        <KpiCard icon={<Mail className="w-5 h-5 text-red-500" />} label="Messages" value={stats.contacts.unread} sub={`${stats.contacts.total} total`} accent="border-red-200" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily orders sparkline */}
        <div className="bg-white border-2 border-border rounded-2xl p-5">
          <p className="font-black text-[hsl(222,62%,28%)] text-sm mb-4">Orders — Last 14 Days</p>
          {stats.dailyOrders?.length > 0 ? (
            <div className="space-y-2">
              {stats.dailyOrders.map((d: any) => (
                <MiniBar key={d.day} label={d.day.slice(5)} value={d.count} max={maxDaily} />
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>}
        </div>

        {/* Top products */}
        <div className="bg-white border-2 border-border rounded-2xl p-5">
          <p className="font-black text-[hsl(222,62%,28%)] text-sm mb-4">Top Viewed Products</p>
          {stats.topProducts?.length > 0 ? (
            <div className="space-y-3">
              {stats.topProducts.map((tp: any, i: number) => {
                const prod = products.find((p) => p.id === tp.product_id);
                return (
                  <div key={tp.product_id} className="flex items-center gap-3">
                    <span className="text-xs font-black text-muted-foreground w-5">#{i + 1}</span>
                    {prod && <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover" />}
                    <span className="text-xs font-semibold text-foreground flex-1 truncate">{prod?.name ?? tp.product_id}</span>
                    <span className="text-xs font-bold text-[hsl(86,72%,38%)]">{tp.views} views</span>
                  </div>
                );
              })}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-8">No analytics data yet</p>}
        </div>
      </div>

      {/* Recent revenue */}
      <div className="bg-white border-2 border-border rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Revenue This Month</p>
          <p className="text-3xl font-black text-[hsl(222,62%,28%)] mt-1">{formatZAR(stats.recentRevenue)}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[hsl(86,72%,45%)]/10 flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-[hsl(86,72%,38%)]" />
        </div>
      </div>
    </div>
  );
}

// ── Orders tab ────────────────────────────────────────────────────────────────
function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);
      if (search.trim()) params.set("search", search.trim());
      const r = await fetch(`${API}/admin/orders?${params}`);
      setOrders(await r.json());
    } catch { setOrders([]); }
    setLoading(false);
  }, [filter, search]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`${API}/admin/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  };

  const deleteOrder = async (id: number) => {
    if (!confirm("Delete this order?")) return;
    await fetch(`${API}/admin/orders/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, order #…"
          className="flex-1 min-w-[200px] border-2 border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)] bg-white"
        >
          {["all","pending","processing","shipped","completed","cancelled"].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button onClick={load} className="p-2.5 border-2 border-border rounded-xl hover:bg-muted transition-colors">
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {loading ? <Loader /> : orders.length === 0 ? (
        <div className="bg-white border-2 border-border rounded-2xl py-16 text-center">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border-2 border-border rounded-2xl overflow-hidden">
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-[hsl(222,62%,28%)]">{order.order_number}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLOURS[order.status] ?? "bg-gray-100"}`}>{order.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{order.customer_name} · {order.customer_email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-sm text-[hsl(222,62%,28%)]">{formatZAR(+order.total)}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(order.created_at).toLocaleDateString("en-ZA")}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${expanded === order.id ? "rotate-180" : ""}`} />
              </div>

              <AnimatePresence>
                {expanded === order.id && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    className="overflow-hidden border-t-2 border-border"
                  >
                    <div className="px-5 py-4 space-y-4">
                      {/* Customer info */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div><p className="font-bold text-muted-foreground uppercase tracking-wide mb-1">Phone</p><p>{order.customer_phone || "—"}</p></div>
                        <div><p className="font-bold text-muted-foreground uppercase tracking-wide mb-1">Address</p><p>{[order.address, order.city, order.postal_code].filter(Boolean).join(", ") || "—"}</p></div>
                        <div><p className="font-bold text-muted-foreground uppercase tracking-wide mb-1">Date</p><p>{new Date(order.created_at).toLocaleString("en-ZA")}</p></div>
                      </div>

                      {/* Items */}
                      {order.items?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Items</p>
                          <div className="space-y-1">
                            {order.items.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                {item.image && <img src={item.image} alt={item.name} className="w-7 h-7 rounded-lg object-cover" />}
                                <span className="flex-1">{item.name}</span>
                                <span className="text-muted-foreground">×{item.quantity}</span>
                                <span className="font-bold">{formatZAR(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <select
                          defaultValue={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="border-2 border-border rounded-lg px-3 py-2 text-xs focus:outline-none bg-white"
                        >
                          {["pending","processing","shipped","completed","cancelled"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Shared: Image picker (URL or file upload) ─────────────────────────────────
function ImagePicker({ value, onChange, label }: { value: string; onChange: (url: string) => void; label?: string }) {
  const [mode, setMode] = useState<"url" | "file">("url");
  return (
    <div>
      {label && <p className="text-xs font-bold text-[hsl(222,62%,28%)] mb-1">{label}</p>}
      <div className="flex gap-1 mb-2">
        <button type="button" onClick={() => setMode("url")}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border-2 flex items-center gap-1 transition-colors ${mode === "url" ? "bg-[hsl(222,62%,28%)] text-white border-[hsl(222,62%,28%)]" : "border-border hover:bg-muted"}`}>
          <Link2 className="w-3 h-3" /> URL
        </button>
        <button type="button" onClick={() => setMode("file")}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border-2 flex items-center gap-1 transition-colors ${mode === "file" ? "bg-[hsl(222,62%,28%)] text-white border-[hsl(222,62%,28%)]" : "border-border hover:bg-muted"}`}>
          <Upload className="w-3 h-3" /> File
        </button>
      </div>
      {mode === "url" ? (
        <input type="url" value={value} placeholder="https://..."
          onChange={e => onChange(e.target.value)}
          className="w-full border-2 border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[hsl(222,62%,28%)]" />
      ) : (
        <input type="file" accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onChange(reader.result as string);
            reader.readAsDataURL(file);
          }}
          className="w-full border-2 border-border rounded-lg px-3 py-2 text-xs file:mr-2 file:text-xs file:border-0 file:bg-muted file:rounded file:px-2 file:py-0.5 file:font-bold" />
      )}
      {value && <img src={value} alt="" className="mt-2 w-20 h-14 object-cover rounded-lg border border-border" />}
    </div>
  );
}

// ── Inventory tab ─────────────────────────────────────────────────────────────
const INV_OVERRIDES_KEY = "mcs_inv_overrides";
const INV_ADDITIONS_KEY = "mcs_inv_additions";

interface InvOverride { name?: string; price?: number; description?: string; image?: string; details?: string[]; }
interface InvAddition {
  id: string; name: string; price: number; category: string; description: string;
  image: string; details: string[]; stock_count: number; is_featured: boolean; is_active: boolean;
}

function loadInvOverrides(): Record<string, InvOverride> { try { return JSON.parse(localStorage.getItem(INV_OVERRIDES_KEY) ?? "{}"); } catch { return {}; } }
function loadInvAdditions(): InvAddition[] { try { return JSON.parse(localStorage.getItem(INV_ADDITIONS_KEY) ?? "[]"); } catch { return []; } }
function saveInvOverrides(d: Record<string, InvOverride>) { localStorage.setItem(INV_OVERRIDES_KEY, JSON.stringify(d)); }
function saveInvAdditions(d: InvAddition[]) { localStorage.setItem(INV_ADDITIONS_KEY, JSON.stringify(d)); }

function Inventory() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [overrides, setOverrides] = useState<Record<string, InvOverride>>(loadInvOverrides);
  const [additions, setAdditions] = useState<InvAddition[]>(loadInvAdditions);
  const [modal, setModal] = useState<null | { mode: "edit" | "add"; rowId?: string }>(null);
  const [form, setForm] = useState<any>({});

  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await fetch(`${API}/admin/inventory`); setInventory(await r.json()); }
    catch { setInventory([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const eff = (row: any) => {
    const prod = products.find(p => p.id === row.product_id);
    const ov = overrides[row.product_id] ?? {};
    return { ...prod, ...ov };
  };

  const openEdit = (row: any) => {
    const isAddition = row._isAddition;
    if (isAddition) {
      const a = additions.find(x => x.id === row.product_id)!;
      setForm({ ...a, _isAddition: true });
    } else {
      const p = eff(row);
      setForm({
        id: row.product_id, name: p.name ?? "", price: p.price ?? 0, category: p.category ?? "Electronics",
        description: p.description ?? "", image: p.image ?? "", details: p.details ?? [],
        stock_count: row.stock_count, is_featured: row.is_featured, is_active: row.is_active, _isAddition: false,
      });
    }
    setModal({ mode: "edit", rowId: row.product_id });
  };

  const openAdd = () => {
    setForm({ id: `custom_${Date.now()}`, name: "", price: 0, category: "Electronics", description: "", image: "", details: [], stock_count: 10, is_featured: false, is_active: true, _isAddition: true });
    setModal({ mode: "add" });
  };

  const saveModal = async () => {
    if (form._isAddition) {
      const next = modal?.mode === "add"
        ? [...additions, { ...form }]
        : additions.map((a: InvAddition) => a.id === form.id ? { ...form } : a);
      setAdditions(next); saveInvAdditions(next);
    } else {
      const newOv = { ...overrides, [form.id]: { name: form.name, price: form.price, description: form.description, image: form.image, details: form.details } };
      setOverrides(newOv); saveInvOverrides(newOv);
      await fetch(`${API}/admin/inventory/${form.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock_count: form.stock_count, is_featured: form.is_featured, is_active: form.is_active }),
      }).catch(() => {});
      load();
    }
    setModal(null);
  };

  const deleteAddition = (id: string) => {
    if (!confirm("Remove this product?")) return;
    const next = additions.filter(a => a.id !== id);
    setAdditions(next); saveInvAdditions(next);
  };

  if (loading) return <Loader />;

  const allRows = [
    ...inventory.map(r => ({ ...r, _isAddition: false })),
    ...additions.map(a => ({ product_id: a.id, stock_count: a.stock_count, is_featured: a.is_featured, is_active: a.is_active, _isAddition: true })),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{allRows.length} products</p>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-sm font-bold">
          <Plus className="w-4 h-4" /> Add New Stock
        </button>
      </div>

      <div className="bg-white border-2 border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b-2 border-border">
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Product</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Stock</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Featured</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Active</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Price</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {allRows.map((row, i) => {
                const prod = row._isAddition ? additions.find(a => a.id === row.product_id) : eff(row);
                return (
                  <tr key={row.product_id} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {prod?.image && <img src={prod.image} alt={prod.name} className="w-9 h-9 rounded-lg object-cover" />}
                        <div>
                          <p className="font-semibold text-xs text-[hsl(222,62%,28%)] line-clamp-1">{prod?.name ?? `ID ${row.product_id}`}</p>
                          <p className="text-[10px] text-muted-foreground">{prod?.category}{row._isAddition && <span className="ml-1 text-[hsl(86,72%,38%)] font-bold">● Custom</span>}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold text-xs px-2 py-1 rounded-full ${row.stock_count < 10 ? "bg-red-100 text-red-700" : row.stock_count < 25 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {row.stock_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold ${row.is_featured ? "text-[hsl(86,72%,38%)]" : "text-muted-foreground"}`}>{row.is_featured ? "★ Yes" : "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold ${row.is_active ? "text-green-600" : "text-red-500"}`}>{row.is_active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-bold text-[hsl(222,62%,28%)]">{prod?.price ? formatZAR(prod.price) : "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(row)} className="p-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                          <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        {row._isAddition && (
                          <button onClick={() => deleteAddition(row.product_id)} className="p-1.5 border border-red-200 rounded-lg hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full edit / add modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="bg-white rounded-2xl border-2 border-border w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
              <p className="font-black text-[hsl(222,62%,28%)] text-base">{modal.mode === "add" ? "Add New Product" : "Edit Product"}</p>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Product Name</label>
                <input value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
                  className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Price (ZAR)</label>
                  <input type="number" min={0} value={form.price} onChange={e => setForm((f: any) => ({ ...f, price: +e.target.value }))}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm((f: any) => ({ ...f, category: e.target.value }))}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[hsl(222,62%,28%)]">
                    {["Electronics","Renewable Energy","Car Spares","Stationery","Fashion","AgroMarket"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Description</label>
                <textarea value={form.description} rows={3} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))}
                  className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[hsl(222,62%,28%)]" />
              </div>
              <ImagePicker label="Main Image" value={form.image ?? ""} onChange={url => setForm((f: any) => ({ ...f, image: url }))} />
              <div>
                <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Bullet Points / Details</label>
                {(form.details ?? []).map((d: string, idx: number) => (
                  <div key={idx} className="flex gap-2 mb-1.5">
                    <input value={d} onChange={e => setForm((f: any) => { const a = [...f.details]; a[idx] = e.target.value; return { ...f, details: a }; })}
                      className="flex-1 border-2 border-border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                    <button type="button" onClick={() => setForm((f: any) => ({ ...f, details: f.details.filter((_: any, i: number) => i !== idx) }))}
                      className="p-1.5 border border-red-200 rounded-lg hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm((f: any) => ({ ...f, details: [...(f.details ?? []), ""] }))}
                  className="flex items-center gap-1 text-xs font-bold text-[hsl(222,62%,28%)] hover:underline mt-1">
                  <Plus className="w-3.5 h-3.5" /> Add bullet point
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Stock Count</label>
                  <input type="number" min={0} value={form.stock_count} onChange={e => setForm((f: any) => ({ ...f, stock_count: +e.target.value }))}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 pt-4">
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)]">Featured</label>
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm((f: any) => ({ ...f, is_featured: e.target.checked }))} className="w-5 h-5 accent-[hsl(86,72%,45%)]" />
                </div>
                <div className="flex flex-col items-center justify-center gap-1 pt-4">
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)]">Active</label>
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm((f: any) => ({ ...f, is_active: e.target.checked }))} className="w-5 h-5 accent-[hsl(86,72%,45%)]" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t-2 border-border flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-5 py-2 rounded-xl border-2 border-border text-sm font-bold hover:bg-muted">Cancel</button>
              <button onClick={saveModal} className="px-5 py-2 rounded-xl btn-primary text-sm font-bold flex items-center gap-2">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Messages tab ──────────────────────────────────────────────────────────────
function Messages() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/admin/contacts`);
      setContacts(await r.json());
    } catch { setContacts([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`${API}/admin/contacts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  };

  const deleteMsg = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`${API}/admin/contacts/${id}`, { method: "DELETE" });
    load();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-2">
      {contacts.length === 0 ? (
        <div className="bg-white border-2 border-border rounded-2xl py-16 text-center">
          <p className="text-muted-foreground text-sm">No messages yet</p>
        </div>
      ) : contacts.map((c) => (
        <div key={c.id} className="bg-white border-2 border-border rounded-2xl overflow-hidden">
          <div
            className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => setExpanded(expanded === c.id ? null : c.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-[hsl(222,62%,28%)]">{c.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${MSG_STATUS_COLOURS[c.status] ?? "bg-gray-100"}`}>{c.status}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{c.email} {c.order_ref ? `· ${c.order_ref}` : ""}</p>
            </div>
            <p className="text-[10px] text-muted-foreground flex-shrink-0">{new Date(c.created_at).toLocaleDateString("en-ZA")}</p>
            <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${expanded === c.id ? "rotate-180" : ""}`} />
          </div>
          <AnimatePresence>
            {expanded === c.id && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t-2 border-border">
                <div className="px-5 py-4 space-y-3">
                  <p className="text-sm leading-relaxed text-foreground">{c.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {["unread","read","resolved"].map((s) => (
                      <button key={s} onClick={() => updateStatus(c.id, s)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 transition-colors ${c.status === s ? "bg-[hsl(222,62%,28%)] text-white border-[hsl(222,62%,28%)]" : "border-border hover:bg-muted"}`}>
                        {s}
                      </button>
                    ))}
                    <button onClick={() => deleteMsg(c.id)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors ml-auto">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Analytics tab ─────────────────────────────────────────────────────────────
function Analytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { setData(await (await fetch(`${API}/admin/analytics`)).json()); } catch { setData(null); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  const maxDaily = Math.max(...(data?.daily || []).map((d: any) => +d.count), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-border rounded-2xl p-5">
          <p className="font-black text-[hsl(222,62%,28%)] text-sm mb-4">Daily Events (14 Days)</p>
          {data?.daily?.length > 0 ? (
            <div className="space-y-2">
              {data.daily.map((d: any) => <MiniBar key={d.day} label={d.day.slice(5)} value={+d.count} max={maxDaily} />)}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>}
        </div>

        <div className="bg-white border-2 border-border rounded-2xl p-5">
          <p className="font-black text-[hsl(222,62%,28%)] text-sm mb-4">Event Breakdown</p>
          {data?.eventCounts?.length > 0 ? (
            <div className="space-y-2">
              {data.eventCounts.map((e: any) => (
                <div key={e.event_type} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                  <span className="text-xs font-semibold text-foreground">{e.event_type}</span>
                  <span className="text-xs font-black text-[hsl(86,72%,38%)]">{e.count}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-8">No events tracked yet</p>}
        </div>

        <div className="bg-white border-2 border-border rounded-2xl p-5 lg:col-span-2">
          <p className="font-black text-[hsl(222,62%,28%)] text-sm mb-4">Top Pages</p>
          {data?.pageViews?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.pageViews.map((p: any) => (
                <div key={p.page} className="bg-muted/40 rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium truncate">{p.page}</span>
                  <span className="text-xs font-black text-[hsl(222,62%,28%)] ml-2">{p.count}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground text-center py-8">No page views tracked yet</p>}
        </div>
      </div>
    </div>
  );
}

// ── Car Management tab ────────────────────────────────────────────────────────
const CAR_STORAGE_KEY = "mcs_car_admin";
const CAR_ADDITIONS_KEY = "mcs_car_additions";

interface CarAdminMeta { status: "available" | "sold" | "reserved"; featured: boolean; notes: string; }
interface CarExtended extends CarListing, CarAdminMeta {}

const CAR_STATUS_COLOURS: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  sold:      "bg-red-100 text-red-800",
  reserved:  "bg-yellow-100 text-yellow-800",
};

const CONDITION_COLOURS: Record<string, string> = {
  "New":       "bg-blue-100 text-blue-800",
  "Pre-Owned": "bg-purple-100 text-purple-800",
  "Demo":      "bg-orange-100 text-orange-800",
};

function loadCarMeta(): Record<string, CarAdminMeta> { try { return JSON.parse(localStorage.getItem(CAR_STORAGE_KEY) ?? "{}"); } catch { return {}; } }
function loadCarAdditions(): CarExtended[] { try { return JSON.parse(localStorage.getItem(CAR_ADDITIONS_KEY) ?? "[]"); } catch { return []; } }
function saveCarMeta(d: Record<string, CarAdminMeta>) { localStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(d)); }
function saveCarAdditions(d: CarExtended[]) { localStorage.setItem(CAR_ADDITIONS_KEY, JSON.stringify(d)); }

const blankCar = (): CarExtended => ({
  id: `custom_${Date.now()}`, make: "", model: "", variant: "",
  year: new Date().getFullYear(), price: 0, condition: "New",
  fuel: "Petrol", transmission: "Automatic", mileage: 0,
  colour: "", location: "", description: "", features: [],
  image: "", images: [], status: "available", featured: false, notes: "",
});

function CarManagement() {
  const [meta, setMeta] = useState<Record<string, CarAdminMeta>>(loadCarMeta);
  const [additions, setAdditions] = useState<CarExtended[]>(loadCarAdditions);
  const [filter, setFilter] = useState<"all" | "available" | "sold" | "reserved">("all");
  const [modal, setModal] = useState<null | { isNew: boolean; originalId: string }>(null);
  const [form, setForm] = useState<CarExtended>(blankCar);

  const persistMeta = (n: Record<string, CarAdminMeta>) => { setMeta(n); saveCarMeta(n); };
  const persistAdd = (n: CarExtended[]) => { setAdditions(n); saveCarAdditions(n); };
  const getMeta = (id: string): CarAdminMeta => meta[id] ?? { status: "available", featured: false, notes: "" };
  const isOriginal = (id: string) => carListings.some(c => c.id === id);

  const allCars: CarExtended[] = [
    ...carListings.map(c => ({ ...c, ...getMeta(c.id) })),
    ...additions,
  ];
  const filtered = filter === "all" ? allCars : allCars.filter(c => c.status === filter);
  const counts = {
    all: allCars.length,
    available: allCars.filter(c => c.status === "available").length,
    sold: allCars.filter(c => c.status === "sold").length,
    reserved: allCars.filter(c => c.status === "reserved").length,
  };

  const openEdit = (car: CarExtended) => { setForm({ ...car }); setModal({ isNew: false, originalId: car.id }); };
  const openAdd  = () => { setForm(blankCar()); setModal({ isNew: true, originalId: "" }); };

  const saveModal = () => {
    if (!modal) return;
    if (modal.isNew) {
      persistAdd([...additions, { ...form, id: `custom_${Date.now()}` }]);
    } else if (isOriginal(modal.originalId)) {
      persistMeta({ ...meta, [modal.originalId]: { status: form.status, featured: form.featured, notes: form.notes } });
    } else {
      persistAdd(additions.map(a => a.id === modal.originalId ? { ...form, id: modal.originalId } : a));
    }
    setModal(null);
  };

  const quickStatus = (id: string, status: CarAdminMeta["status"]) => {
    if (isOriginal(id)) persistMeta({ ...meta, [id]: { ...getMeta(id), status } });
    else persistAdd(additions.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteCar = (id: string) => {
    if (!confirm("Remove this car listing?")) return;
    persistAdd(additions.filter(a => a.id !== id));
  };

  const sf = (key: keyof CarExtended, val: any) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        {(["all","available","sold","reserved"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border-2 transition-colors capitalize ${filter === f ? "bg-[hsl(222,62%,28%)] text-white border-[hsl(222,62%,28%)]" : "border-border hover:bg-muted"}`}>
            {f} <span className="ml-1 opacity-60">({counts[f]})</span>
          </button>
        ))}
        <button onClick={openAdd} className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-sm font-bold">
          <Plus className="w-4 h-4" /> Add New Car
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border-2 border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b-2 border-border">
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Vehicle</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Condition</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Price</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Status</th>
                <th className="text-center px-4 py-3 text-xs font-black uppercase tracking-widest text-[hsl(222,62%,28%)]">Featured</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((car, i) => (
                <tr key={car.id} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {car.image && <img src={car.image} alt={car.make} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />}
                      <div>
                        <p className="font-black text-xs text-[hsl(222,62%,28%)]">
                          {car.year} {car.make} {car.model}
                          {!isOriginal(car.id) && <span className="ml-1 text-[hsl(86,72%,38%)]">● Custom</span>}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{car.variant}</p>
                        <p className="text-[10px] text-muted-foreground">{car.fuel} · {car.transmission} · {car.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CONDITION_COLOURS[car.condition] ?? "bg-gray-100"}`}>{car.condition}</span>
                    {car.mileage > 0 && <p className="text-[10px] text-muted-foreground mt-0.5">{car.mileage.toLocaleString()} km</p>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <p className="font-black text-xs text-[hsl(222,62%,28%)]">{formatZAR(car.price)}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select value={car.status} onChange={e => quickStatus(car.id, e.target.value as CarAdminMeta["status"])}
                      className={`text-[10px] font-bold px-2 py-1 rounded-full border-0 cursor-pointer ${CAR_STATUS_COLOURS[car.status]}`}>
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="reserved">Reserved</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-bold ${car.featured ? "text-[hsl(86,72%,38%)]" : "text-muted-foreground"}`}>{car.featured ? "★ Yes" : "☆ No"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(car)} className="p-1.5 border border-border rounded-lg hover:bg-muted transition-colors">
                        <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      {!isOriginal(car.id) && (
                        <button onClick={() => deleteCar(car.id)} className="p-1.5 border border-red-200 rounded-lg hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Available", value: counts.available, colour: "border-green-200 bg-green-50 text-green-800" },
          { label: "Reserved",  value: counts.reserved,  colour: "border-yellow-200 bg-yellow-50 text-yellow-800" },
          { label: "Sold",      value: counts.sold,      colour: "border-red-200 bg-red-50 text-red-800" },
        ].map(s => (
          <div key={s.label} className={`border-2 rounded-2xl p-4 text-center ${s.colour}`}>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add / Full-Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto" onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="bg-white rounded-2xl border-2 border-border w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
              <p className="font-black text-[hsl(222,62%,28%)] text-base">{modal.isNew ? "Add New Car" : "Edit Car Listing"}</p>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Make / Model / Variant */}
              <div className="grid grid-cols-3 gap-3">
                {(["Make","Model","Variant"] as const).map(lbl => {
                  const key = lbl.toLowerCase() as "make" | "model" | "variant";
                  return (
                    <div key={key}>
                      <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">{lbl}</label>
                      <input value={form[key]} onChange={e => sf(key, e.target.value)}
                        className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                    </div>
                  );
                })}
              </div>

              {/* Year / Price / Condition */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Year</label>
                  <input type="number" value={form.year} onChange={e => sf("year", +e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Price (ZAR)</label>
                  <input type="number" min={0} value={form.price} onChange={e => sf("price", +e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Condition</label>
                  <select value={form.condition} onChange={e => sf("condition", e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[hsl(222,62%,28%)]">
                    <option>New</option><option>Pre-Owned</option><option>Demo</option>
                  </select>
                </div>
              </div>

              {/* Fuel / Transmission / Mileage */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Fuel</label>
                  <select value={form.fuel} onChange={e => sf("fuel", e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[hsl(222,62%,28%)]">
                    <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Transmission</label>
                  <select value={form.transmission} onChange={e => sf("transmission", e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[hsl(222,62%,28%)]">
                    <option>Manual</option><option>Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Mileage (km)</label>
                  <input type="number" min={0} value={form.mileage} onChange={e => sf("mileage", +e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                </div>
              </div>

              {/* Colour / Location */}
              <div className="grid grid-cols-2 gap-3">
                {(["Colour","Location"] as const).map(lbl => {
                  const key = lbl.toLowerCase() as "colour" | "location";
                  return (
                    <div key={key}>
                      <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">{lbl}</label>
                      <input value={form[key]} onChange={e => sf(key, e.target.value)}
                        className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                    </div>
                  );
                })}
              </div>

              {/* Main Image */}
              <ImagePicker label="Main Image" value={form.image} onChange={url => sf("image", url)} />

              {/* Gallery */}
              <div>
                <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-2">Gallery Images (up to 3)</label>
                <div className="space-y-3">
                  {[0,1,2].map(idx => (
                    <ImagePicker key={idx} label={`Gallery ${idx + 1}`}
                      value={form.images[idx] ?? ""}
                      onChange={url => { const imgs = [...(form.images ?? [])]; imgs[idx] = url; sf("images", imgs); }} />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Description</label>
                <textarea value={form.description} rows={3} onChange={e => sf("description", e.target.value)}
                  className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[hsl(222,62%,28%)]" />
              </div>

              {/* Features */}
              <div>
                <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Features / Specs</label>
                {form.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2 mb-1.5">
                    <input value={feat} onChange={e => { const a = [...form.features]; a[idx] = e.target.value; sf("features", a); }}
                      className="flex-1 border-2 border-border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                    <button type="button" onClick={() => sf("features", form.features.filter((_: string, i: number) => i !== idx))}
                      className="p-1.5 border border-red-200 rounded-lg hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => sf("features", [...form.features, ""])}
                  className="flex items-center gap-1 text-xs font-bold text-[hsl(222,62%,28%)] hover:underline mt-1">
                  <Plus className="w-3.5 h-3.5" /> Add feature
                </button>
              </div>

              {/* Status / Notes / Featured */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Status</label>
                  <select value={form.status} onChange={e => sf("status", e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[hsl(222,62%,28%)]">
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[hsl(222,62%,28%)] block mb-1">Internal Notes</label>
                  <input value={form.notes} onChange={e => sf("notes", e.target.value)}
                    className="w-full border-2 border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[hsl(222,62%,28%)]" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-[hsl(222,62%,28%)] cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => sf("featured", e.target.checked)} className="w-4 h-4 accent-[hsl(86,72%,45%)]" />
                Mark as featured listing
              </label>
            </div>

            <div className="px-6 py-4 border-t-2 border-border flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-5 py-2 rounded-xl border-2 border-border text-sm font-bold hover:bg-muted">Cancel</button>
              <button onClick={saveModal} className="px-5 py-2 rounded-xl btn-primary text-sm font-bold flex items-center gap-2">
                <Save className="w-4 h-4" /> {modal.isNew ? "Add Car" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="flex items-center justify-center py-16">
      <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-white border-2 border-red-200 rounded-2xl py-12 text-center">
      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
      <p className="font-bold text-red-600 mb-1">Could not connect to API</p>
      <p className="text-xs text-muted-foreground mb-4">Make sure the API server is running on port 8080</p>
      <button onClick={onRetry} className="px-4 py-2 rounded-full btn-primary text-sm font-bold">Retry</button>
    </div>
  );
}

// ── Main admin panel ──────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard",  label: "Dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "orders",     label: "Orders",     icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "inventory",  label: "Inventory",  icon: <Boxes className="w-4 h-4" /> },
  { id: "cars",       label: "Cars",       icon: <Car className="w-4 h-4" /> },
  { id: "messages",   label: "Messages",   icon: <MessageSquare className="w-4 h-4" /> },
  { id: "analytics",  label: "Analytics",  icon: <BarChart3 className="w-4 h-4" /> },
];

export function AdminPanel() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      {/* Header */}
      <div className="bg-[hsl(222,62%,28%)] border-b-4 border-[hsl(86,72%,45%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[hsl(86,72%,45%)] flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-lg leading-tight">McSpencer Admin</p>
              <p className="text-white/50 text-xs">Internal management portal</p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] font-bold bg-white/10 text-white/60 px-3 py-1.5 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(86,72%,65%)] animate-pulse" /> LIVE
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all ${
                  tab === t.id ? "bg-white text-[hsl(222,62%,28%)]" : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "dashboard"  && <Dashboard />}
            {tab === "orders"     && <Orders />}
            {tab === "inventory"  && <Inventory />}
            {tab === "cars"       && <CarManagement />}
            {tab === "messages"   && <Messages />}
            {tab === "analytics"  && <Analytics />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
