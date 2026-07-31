"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Shield,
  LayoutGrid,
  Users,
  FileText,
  Image as ImageIcon,
  MapPin,
  Send,
  Wrench,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  Plus,
  GripVertical,
  Pencil,
  Trash2,
  X,
  Loader2,
  Briefcase,
  Upload,
} from "lucide-react";
import { ImageFallback } from "../ui/ImageFallback";
import {
  Client,
  getAdminClients,
  createClient,
  updateClient,
  toggleClientStatus,
  deleteClient,
  reorderClients,
} from "@/services/clients";

const navItems = [
  { name: "Overview", icon: LayoutGrid, href: "/admin/dashboard" },
  { name: "Team", icon: Users, href: "/admin/team" },
  { name: "Blog", icon: FileText, href: "#" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { name: "Branches", icon: MapPin, href: "/admin/branches" },
  { name: "Clients", icon: Briefcase, href: "/admin/clients" },
  { name: "Submissions", icon: Send, href: "#" },
  { name: "Services", icon: Wrench, href: "#" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

/** Demo seed so the page matches the Brand Management layout when the API is offline. */
const SEED_CLIENTS: Client[] = [
  {
    id: "seed-1",
    name: "Yamaha",
    logoUrl: "/images/Ncell-Logo.wine.png",
    displayOrder: 1,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    name: "Bajaj",
    logoUrl: "/images/Worldlink_Logo.svg.webp",
    displayOrder: 2,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    name: "Honda",
    logoUrl: "/images/sevenstarlogo.png",
    displayOrder: 3,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-4",
    name: "Hero",
    logoUrl: "/images/ISO Seal Badge.png",
    displayOrder: 4,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-5",
    name: "TVS",
    logoUrl: "/images/Trusted By Badge.png",
    displayOrder: 5,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-6",
    name: "Royal Enfield",
    logoUrl: "/images/Ncell-Logo.wine.png",
    displayOrder: 6,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-7",
    name: "Suzuki",
    logoUrl: "/images/Worldlink_Logo.svg.webp",
    displayOrder: 7,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-8",
    name: "KTM",
    logoUrl: "/images/sevenstarlogo.png",
    displayOrder: 8,
    isActive: true,
    showOnHomepage: true,
    createdAt: new Date().toISOString(),
  },
];

export const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [usingSeed, setUsingSeed] = useState(false);
  const [search, setSearch] = useState("");

  const [dragId, setDragId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [formName, setFormName] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formPreview, setFormPreview] = useState<string | null>(null);
  const [formActive, setFormActive] = useState(true);
  const [formHomepage, setFormHomepage] = useState(true);

  const loadClients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminClients({ limit: 100, status: "all" });
      const items = Array.isArray(res.items) ? res.items : [];
      setClients(items);
      setUsingSeed(false);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ||
        (err as { message?: string })?.message ||
        "Failed to load clients.";
      setError(message);
      setClients(SEED_CLIENTS);
      setUsingSeed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const homepageClients = useMemo(
    () =>
      [...clients]
        .filter((c) => c.isActive && c.showOnHomepage)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [clients]
  );

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q
      ? clients.filter((c) => c.name.toLowerCase().includes(q))
      : clients;
    return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [clients, search]);

  const resetForm = () => {
    setEditing(null);
    setFormName("");
    setFormFile(null);
    setFormPreview(null);
    setFormActive(true);
    setFormHomepage(true);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setFormName(client.name);
    setFormFile(null);
    setFormPreview(client.logoUrl);
    setFormActive(client.isActive);
    setFormHomepage(client.showOnHomepage);
    setShowModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormFile(file);
    if (file) {
      setFormPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setError("Client name is required.");
      return;
    }
    if (!editing && !formFile) {
      setError("Please upload a client logo.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (usingSeed) {
        if (editing) {
          setClients((prev) =>
            prev.map((c) =>
              c.id === editing.id
                ? {
                    ...c,
                    name: formName.trim(),
                    logoUrl: formPreview || c.logoUrl,
                    isActive: formActive,
                    showOnHomepage: formHomepage,
                  }
                : c
            )
          );
        } else {
          const nextOrder =
            clients.reduce((max, c) => Math.max(max, c.displayOrder), 0) + 1;
          setClients((prev) => [
            ...prev,
            {
              id: `seed-${Date.now()}`,
              name: formName.trim(),
              logoUrl: formPreview || "/images/sevenstarlogo.png",
              displayOrder: nextOrder,
              isActive: formActive,
              showOnHomepage: formHomepage,
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } else if (editing) {
        const updated = await updateClient(editing.id, {
          name: formName.trim(),
          file: formFile || undefined,
          isActive: formActive,
          showOnHomepage: formHomepage,
        });
        setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const created = await createClient(
          formName.trim(),
          formFile!,
          undefined,
          formActive,
          formHomepage
        );
        setClients((prev) => [...prev, created]);
      }
      setShowModal(false);
      resetForm();
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } }; message?: string })?.response
          ?.data?.message ||
          (err as { message?: string })?.message ||
          "Failed to save client."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (client: Client) => {
    const next = !client.isActive;
    try {
      if (usingSeed) {
        setClients((prev) =>
          prev.map((c) => (c.id === client.id ? { ...c, isActive: next } : c))
        );
        return;
      }
      const updated = await toggleClientStatus(client.id, next);
      setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } catch (err: unknown) {
      setError(
        (err as { message?: string })?.message || "Failed to update status."
      );
    }
  };

  const handleDelete = async (client: Client) => {
    if (!confirm(`Delete "${client.name}"? This cannot be undone.`)) return;
    try {
      if (usingSeed) {
        setClients((prev) => prev.filter((c) => c.id !== client.id));
        return;
      }
      await deleteClient(client.id);
      setClients((prev) => prev.filter((c) => c.id !== client.id));
    } catch (err: unknown) {
      setError((err as { message?: string })?.message || "Failed to delete client.");
    }
  };

  const handleDragStart = (id: string) => setDragId(id);

  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!dragId || dragId === overId) return;

    setClients((prev) => {
      const homepage = [...prev]
        .filter((c) => c.isActive && c.showOnHomepage)
        .sort((a, b) => a.displayOrder - b.displayOrder);
      const from = homepage.findIndex((c) => c.id === dragId);
      const to = homepage.findIndex((c) => c.id === overId);
      if (from < 0 || to < 0) return prev;

      const reordered = [...homepage];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);

      const orderMap = new Map(
        reordered.map((c, i) => [c.id, i + 1] as const)
      );

      return prev.map((c) =>
        orderMap.has(c.id) ? { ...c, displayOrder: orderMap.get(c.id)! } : c
      );
    });
  };

  const handleDragEnd = async () => {
    if (!dragId) return;
    setDragId(null);

    const order = [...clients]
      .filter((c) => c.isActive && c.showOnHomepage)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((c, i) => ({ id: c.id, displayOrder: i + 1 }));

    if (usingSeed) return;

    try {
      await reorderClients(order);
    } catch (err: unknown) {
      setError(
        (err as { message?: string })?.message || "Failed to save display order."
      );
      loadClients();
    }
  };

    // Handle dropping a client from the All Clients grid onto the homepage display order area
    const handleDrop = async (e: React.DragEvent) => {
      e.preventDefault();
      if (!dragId) return;
      const droppedId = dragId;
      setDragId(null);

      let updatedClients: Client[] = [];
      let newDisplayOrder = 1;
      setClients((prev) => {
        const client = prev.find((c) => c.id === droppedId);
        if (!client) return prev;
        const maxOrder = Math.max(
          0,
          ...prev.filter((c) => c.isActive && c.showOnHomepage).map((c) => c.displayOrder)
        );
        newDisplayOrder = maxOrder + 1;
        const updatedClient = { ...client, showOnHomepage: true, displayOrder: newDisplayOrder };
        const newList = prev.map((c) => (c.id === droppedId ? updatedClient : c));
        updatedClients = newList;
        return newList;
      });

      // Persist the new order (if not using seed data)
      if (!usingSeed) {
        try {
          const order = updatedClients
            .filter((c) => c.isActive && c.showOnHomepage)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((c, i) => ({ id: c.id, displayOrder: i + 1 }));
          await reorderClients(order);
        } catch (err: unknown) {
          setError((err as { message?: string })?.message || "Failed to save display order.");
          loadClients();
        }
      }
    };


  return (
    <div className="min-h-screen w-full flex bg-[#18191c] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      <aside className="w-60 bg-[#141518] border-r border-[#26282e] flex flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-[#26282e]">
            <div className="w-9 h-9 rounded-lg bg-[#0b4226] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base tracking-wider uppercase leading-none font-['Public_Sans']">
                SHIELD<span className="text-[#4ade80]">CMS</span>
              </h1>
              <p className="text-[10px] font-semibold text-[#86efac] tracking-widest uppercase mt-0.5">
                Admin Terminal
              </p>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.name === "Clients";
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-[#0b4226] text-white shadow-sm"
                      : "text-gray-400 hover:bg-[#1e2025] hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#26282e]">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-[#1e2025] rounded-md text-sm font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>MAIN CONSOLE</span> &gt;{" "}
              <span className="text-gray-800">CLIENTS</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-700 cursor-pointer">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        <main className="p-6 space-y-8 flex-1 max-w-[1600px] w-full mx-auto">
          {/* Page header — matches Brand Management layout */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight shrink-0">
              Client Management
            </h1>

            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:justify-end">
              <div className="relative w-full sm:max-w-md lg:max-w-lg">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Global Search"
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
              </div>

              <button
                type="button"
                onClick={openAdd}
                className="shrink-0 bg-[#1a1c1e] hover:bg-black text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Client</span>
              </button>
            </div>
          </div>

          {error && !usingSeed && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-md px-4 py-3">
              {error}
            </div>
          )}

          {usingSeed && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-md px-4 py-3">
              Showing demo client data — connect the clients API to manage live records.
            </div>
          )}

          {/* Homepage display order */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900">
              Homepage Display Order (Drag &amp; Reorder)
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : homepageClients.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-10 text-center text-sm text-gray-400 font-medium shadow-xs" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                No active clients on the homepage yet. Add a client or enable an existing one.
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {homepageClients.map((client) => (
                  <div
                    key={client.id}
                    draggable
                    onDragStart={() => handleDragStart(client.id)}
                    onDragOver={(e) => handleDragOver(e, client.id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border border-gray-200 rounded-xl shadow-xs flex items-stretch min-w-[140px] w-[140px] cursor-grab active:cursor-grabbing transition-shadow ${
                      dragId === client.id ? "opacity-70 shadow-md ring-1 ring-[#0b4226]/30" : ""
                    }`}
                  >
                    <div className="flex items-center px-1.5 text-gray-300 hover:text-gray-500">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="flex-1 flex flex-col items-center px-3 pt-4 pb-3 gap-2.5">
                      <div className="w-[72px] h-[72px] rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1.5">
                        <ImageFallback
                          src={client.logoUrl}
                          alt={client.name}
                          className="w-full h-full object-contain"
                          fallbackText={client.name[0]}
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-800 text-center leading-tight truncate w-full">
                        {client.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* All clients grid */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900">All Clients</h2>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-10 text-center text-sm text-gray-400 font-medium shadow-xs">
                No clients found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    draggable
                    onDragStart={() => handleDragStart(client.id)}
                    className="bg-white border border-gray-200 rounded-xl shadow-xs p-4 flex gap-3.5 items-start"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1.5 shrink-0">
                      <ImageFallback
                        src={client.logoUrl}
                        alt={client.name}
                        className="w-full h-full object-contain"
                        fallbackText={client.name[0]}
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="font-bold text-gray-900 text-sm truncate">{client.name}</p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggle(client)}
                          aria-label={`Toggle ${client.name} status`}
                          className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                            client.isActive ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              client.isActive ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-xs font-medium ${
                            client.isActive ? "text-emerald-600" : "text-gray-400"
                          }`}
                        >
                          {client.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 pt-0.5">
                        <button
                          type="button"
                          onClick={() => openEdit(client)}
                          className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-amber-600 cursor-pointer transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5 text-amber-500" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(client)}
                          className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Add / Edit modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {editing ? "Edit Client" : "Add New Client"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Yamaha"
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Logo
                </label>
                <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg bg-[#f8fafc] px-4 py-6 cursor-pointer hover:border-[#0b4226]/50 transition-colors">
                  {formPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={formPreview}
                      alt="Preview"
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                  <span className="text-xs text-gray-500 font-medium">
                    {formFile ? formFile.name : editing ? "Replace logo (optional)" : "Upload logo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="rounded border-gray-300 text-[#0b4226] focus:ring-[#0b4226]"
                  />
                  <span className="text-xs font-semibold text-gray-700">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHomepage}
                    onChange={(e) => setFormHomepage(e.target.checked)}
                    className="rounded border-gray-300 text-[#0b4226] focus:ring-[#0b4226]"
                  />
                  <span className="text-xs font-semibold text-gray-700">Show on homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#1a1c1e] hover:bg-black text-white rounded-lg transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editing ? "Save Changes" : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
