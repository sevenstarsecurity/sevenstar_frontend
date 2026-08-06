"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { AdminSidebar } from "./AdminSidebar";
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



export const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [usingSeed, setUsingSeed] = useState(false);
  const [search, setSearch] = useState("");

  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const draggedIdRef = useRef<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [formName, setFormName] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formPreview, setFormPreview] = useState<string | null>(null);
  const [formActive, setFormActive] = useState(true);
  const [formOrder, setFormOrder] = useState<string>("");

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
      setUsingSeed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  // "Homepage order" = every active client, sorted by displayOrder.
  const orderedActiveClients = useMemo(
    () =>
      [...clients]
        .filter((c) => c.isActive)
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

  const nextOrderSuggestion = useMemo(() => {
    if (clients.length === 0) return 1;
    return Math.max(...clients.map((c) => c.displayOrder)) + 1;
  }, [clients]);

  const resetForm = () => {
    setEditing(null);
    setFormName("");
    setFormFile(null);
    setFormPreview(null);
    setFormActive(true);
    setFormOrder("");
  };

  const openAdd = () => {
    resetForm();
    setFormOrder(String(nextOrderSuggestion));
    setShowModal(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setFormName(client.name);
    setFormFile(null);
    setFormPreview(client.logoUrl);
    setFormActive(client.isActive);
    setFormOrder(String(client.displayOrder));
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

    const parsedOrder = formOrder.trim() === "" ? undefined : Number(formOrder);
    if (parsedOrder !== undefined && (Number.isNaN(parsedOrder) || parsedOrder < 1)) {
      setError("Display order must be a positive number.");
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
                    displayOrder: parsedOrder ?? c.displayOrder,
                  }
                : c
            )
          );
        } else {
          setClients((prev) => [
            ...prev,
            {
              id: `seed-${Date.now()}`,
              name: formName.trim(),
              logoUrl: formPreview || "/images/sevenstarlogo.png",
              cloudinaryId: "",
              displayOrder: parsedOrder ?? nextOrderSuggestion,
              isActive: formActive,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]);
        }
      } else if (editing) {
        const updated = await updateClient(editing.id, {
          name: formName.trim(),
          logo: formFile || undefined,
          isActive: formActive,
          displayOrder: parsedOrder,
        });
        setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        const created = await createClient({
          name: formName.trim(),
          logo: formFile!,
          isActive: formActive,
          displayOrder: parsedOrder,
        });
        setClients((prev) => [...prev, created]);
      }
      setShowModal(false);
      resetForm();
      if (!usingSeed) {
        // Re-fetch so the list reflects the server's authoritative order
        // (in case the backend shifted other clients when inserting at a
        // specific position).
        loadClients();
      }
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

  const handleDragStart = (e: React.DragEvent, id: string) => {
    draggedIdRef.current = id;
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", id);
    } catch {
      // ignore
    }
  };

  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIdRef.current && draggedIdRef.current !== overId) {
      setDragOverId(overId);
    }
  };

  const handleDragLeave = (overId: string) => {
    if (dragOverId === overId) {
      setDragOverId(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    setDragOverId(null);

    const sourceId =
      draggedIdRef.current || e.dataTransfer.getData("text/plain") || dragId;

    if (!sourceId || sourceId === dropTargetId) {
      draggedIdRef.current = null;
      setDragId(null);
      return;
    }

    draggedIdRef.current = null;
    setDragId(null);

    const ordered = [...clients]
      .filter((c) => c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const fromIndex = ordered.findIndex((c) => c.id === sourceId);
    const toIndex = ordered.findIndex((c) => c.id === dropTargetId);

    if (fromIndex < 0 || toIndex < 0) return;

    const reordered = [...ordered];
    const [movedItem] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, movedItem);

    const orderMap = new Map(reordered.map((c, index) => [c.id, index + 1]));

    const updatedClients = clients.map((c) =>
      orderMap.has(c.id) ? { ...c, displayOrder: orderMap.get(c.id)! } : c
    );

    setClients(updatedClients);

    if (!usingSeed) {
      const apiOrderPayload = reordered.map((c, index) => ({
        id: c.id,
        displayOrder: index + 1,
      }));

      try {
        await reorderClients(apiOrderPayload);
      } catch (err: unknown) {
        console.error("Failed to reorder clients:", err);
        setError(
          (err as { message?: string })?.message || "Failed to save display order."
        );
        loadClients();
      }
    }
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      draggedIdRef.current = null;
      setDragId(null);
      setDragOverId(null);
    }, 100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f4f6f3] text-gray-800 font-sans selection:bg-[#0b4226] selection:text-white">
      <AdminSidebar currentPath="/admin/clients" />

      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f6f3]">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-xs relative lg:sticky lg:top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Security Firm CMS</h2>
            <span className="text-gray-300">|</span>
            <nav className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
              <span className="hidden xs:inline">MAIN CONSOLE &gt; </span>
              <span className="text-gray-800">CLIENTS</span>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
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

          {/* Display order */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900">
              Homepage Display Order (Drag &amp; Reorder)
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : orderedActiveClients.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-10 text-center text-sm text-gray-400 font-medium shadow-xs">
                No active clients yet. Add a client to see it here.
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {orderedActiveClients.map((client) => (
                  <div
                    key={client.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, client.id)}
                    onDragOver={(e) => handleDragOver(e, client.id)}
                    onDragLeave={() => handleDragLeave(client.id)}
                    onDrop={(e) => handleDrop(e, client.id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white border rounded-xl shadow-xs flex items-stretch min-w-[140px] w-[140px] cursor-grab active:cursor-grabbing transition-all overflow-hidden select-none ${
                      dragId === client.id
                        ? "opacity-40 border-dashed border-gray-400 bg-gray-50 scale-95"
                        : dragOverId === client.id
                        ? "ring-2 ring-[#0b4226] border-[#0b4226] bg-[#0b4226]/5 scale-[1.03]"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center px-1.5 text-gray-300 hover:text-gray-500 shrink-0 pointer-events-none">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="flex-1 flex flex-col items-center px-2 pt-4 pb-3 gap-2 min-w-0 pointer-events-none">
                      <div className="w-16 h-16 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1.5 shrink-0 pointer-events-none">
                        <ImageFallback
                          src={client.logoUrl}
                          alt={client.name}
                          className="w-full h-full object-contain pointer-events-none"
                          fallbackText={client.name[0]}
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-800 text-center leading-tight truncate w-full pointer-events-none">
                        {client.name}
                      </p>
                      <span className="text-[10px] font-bold text-gray-400 pointer-events-none">
                        #{client.displayOrder}
                      </span>
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
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-gray-900 text-sm truncate">{client.name}</p>
                        <span className="shrink-0 text-[10px] font-bold text-gray-400">
                          Order #{client.displayOrder}
                        </span>
                      </div>

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
                  Display Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={formOrder}
                  onChange={(e) => setFormOrder(e.target.value)}
                  placeholder="e.g. 1 to show first"
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0b4226]"
                />
                <p className="text-[11px] text-gray-400">
                  Lower number = shown earlier. Type 1 to put this client first.
                </p>
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