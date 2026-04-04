"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Project, type Contact } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LogOut, Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, X, Upload, ExternalLink, Mail, MailOpen, ChevronUp, ChevronDown } from "lucide-react";

// ─── Markdown Editor ───────────────────────────────────────────────────────
function MarkdownEditor({
  value,
  onChange,
  projectId,
}: {
  value: string;
  onChange: (v: string) => void;
  projectId?: string;
}) {
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from("project-images")
      .upload(fileName, file, { upsert: false });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);

    const imageMarkdown = `\n![image](${urlData.publicUrl})\n`;
    onChange(value + imageMarkdown);
    setUploading(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) handleImageUpload(file);
        return;
      }
    }
  };

  return (
    <div className="rounded-xl border border-white/8 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/8">
        <div className="flex items-center gap-1">
          {[
            { label: "B", wrap: "**", title: "Bold" },
            { label: "I", wrap: "*", title: "Italic" },
            { label: "H2", insert: "\n## ", title: "Heading 2" },
            { label: "•", insert: "\n    - ", title: "Bullet (indented)" },
            { label: "1.", insert: "\n1. ", title: "Numbered list" },
            { label: "—", insert: "\n---\n", title: "Divider" },
          ].map((btn) => (
            <button
              key={btn.label}
              type="button"
              title={btn.title}
              onClick={() => {
                if (btn.wrap) {
                  onChange(value + `${btn.wrap}text${btn.wrap}`);
                } else if (btn.insert) {
                  onChange(value + btn.insert);
                }
              }}
              className="px-2.5 py-1 text-xs text-white/40 hover:text-white hover:bg-white/5 rounded font-mono transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            title="Upload image"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-white/40 hover:text-white hover:bg-white/5 rounded transition-colors disabled:opacity-40"
          >
            <Upload className="w-3 h-3" />
            {uploading ? "Uploading…" : "Image"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImageUpload(f);
              e.target.value = "";
            }}
          />

          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-white/40 hover:text-white hover:bg-white/5 rounded transition-colors"
          >
            {preview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      {preview ? (
        <div className="min-h-[180px] p-4 markdown-preview text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <span className="text-white/20 text-sm">Nothing to preview yet…</span>
          )}
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={"**Bold**, *Italic*, ## Heading\n    - Indented bullet\n\nPaste or upload images directly."}
          rows={8}
          className="w-full px-4 py-3 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none resize-none font-mono"
          style={{ fontFamily: "'Fira Code', 'Consolas', monospace" }}
        />
      )}
    </div>
  );
}

// ─── Project Form Modal ─────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  onSaved,
}: {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    picture_url: project?.picture_url || "",
    link: project?.link || "",
    featured: project?.featured ?? false,
    featured_order: project?.featured_order ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = !!project;

  const handleCoverUpload = async (file: File) => {
    setUploadingCover(true);
    const ext = file.name.split(".").pop();
    const fileName = `cover-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(fileName, file, { upsert: false });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploadingCover(false);
      return;
    }
    const { data } = supabase.storage.from("project-images").getPublicUrl(fileName);
    setForm((f) => ({ ...f, picture_url: data.publicUrl }));
    setUploadingCover(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (isEdit) {
      await supabase.from("projects").update(form).eq("id", project.id);
    } else {
      await supabase.from("projects").insert([form]);
    }
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 p-8"
        style={{
          background: "linear-gradient(135deg, #12121A 0%, #0A0A0F 100%)",
          boxShadow: "0 0 60px rgba(91,79,255,0.15), 0 30px 60px rgba(0,0,0,0.8)",
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-medium">Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Project name"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 transition-all"
            />
          </div>

          {/* Cover image */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-medium">Cover Image</label>
            <div className="flex gap-3">
              <input
                value={form.picture_url}
                onChange={(e) => setForm({ ...form, picture_url: e.target.value })}
                placeholder="https://... or upload below"
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 transition-all"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadingCover}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm flex items-center gap-2 transition-all disabled:opacity-40"
              >
                <Upload className="w-4 h-4" />
                {uploadingCover ? "…" : "Upload"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); e.target.value = ""; }} />
            </div>
            {form.picture_url && (
              <div className="mt-2 h-24 rounded-xl overflow-hidden border border-white/5">
                <img src={form.picture_url} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Website link */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-medium">Website Link</label>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://yourproject.com"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 transition-all"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`w-10 h-6 rounded-full transition-all duration-300 relative ${form.featured ? "bg-[#5B4FFF]" : "bg-white/10"}`}
                onClick={() => setForm({ ...form, featured: !form.featured })}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${form.featured ? "left-5" : "left-1"}`} />
              </div>
              <span className="text-sm text-white/60">Featured on homepage</span>
            </label>

            {form.featured && (
              <div>
                <label className="block text-xs text-white/40 mb-1">Order (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={form.featured_order}
                  onChange={(e) => setForm({ ...form, featured_order: parseInt(e.target.value) || 0 })}
                  className="w-20 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/8 text-white text-sm focus:outline-none focus:border-[#5B4FFF]/50 transition-all"
                />
              </div>
            )}
          </div>

          {/* Description (Markdown) */}
          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-medium">Description (Markdown)</label>
            <MarkdownEditor
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              projectId={project?.id}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/8 text-white/50 text-sm hover:text-white hover:border-white/20 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#5B4FFF] text-white text-sm font-semibold hover:bg-[#7B6FFF] disabled:opacity-50 transition-all"
              style={{ boxShadow: "0 4px 16px rgba(91,79,255,0.3)" }}
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "contacts">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [editProject, setEditProject] = useState<Project | null | "new">(null);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/admin");
    });
    fetchProjects();
    fetchContacts();
  }, [router]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("featured_order", { ascending: true });
    setProjects(data || []);
    setLoadingProjects(false);
  };

  const fetchContacts = async () => {
    setLoadingContacts(true);
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setContacts(data || []);
    setLoadingContacts(false);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const toggleFeatured = async (p: Project) => {
    await supabase.from("projects").update({ featured: !p.featured }).eq("id", p.id);
    fetchProjects();
  };

  const markRead = async (id: string, read: boolean) => {
    await supabase.from("contacts").update({ read }).eq("id", id);
    fetchContacts();
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contacts").delete().eq("id", id);
    fetchContacts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin");
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Top nav */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/5"
        style={{ background: "rgba(9,9,11,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5B4FFF] flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span
            className="text-white font-bold text-base tracking-tight"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Portfolio Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 text-white/40 hover:text-white hover:border-white/20 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setTab("projects")}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "projects"
                ? "bg-[#5B4FFF] text-white"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "contacts"
                ? "bg-[#5B4FFF] text-white"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            Messages
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#5B4FFF] text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Projects Tab ── */}
        {tab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                All Projects
              </h2>
              <button
                onClick={() => setEditProject("new")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B4FFF] text-white text-sm font-semibold hover:bg-[#7B6FFF] transition-all"
                style={{ boxShadow: "0 4px 16px rgba(91,79,255,0.3)" }}
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            {loadingProjects ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#5B4FFF]/30 border-t-[#5B4FFF] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group"
                  >
                    {/* Cover thumbnail */}
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      {p.picture_url ? (
                        <img src={p.picture_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 text-xl font-bold">
                          {p.title[0]}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold text-white truncate"
                          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                        >
                          {p.title}
                        </span>
                        {p.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-[#5B4FFF]/20 border border-[#5B4FFF]/30 text-[10px] text-[#a89dff] font-medium">
                            Featured #{p.featured_order}
                          </span>
                        )}
                      </div>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/30 hover:text-[#a89dff] transition-colors flex items-center gap-1 mt-0.5"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {p.link}
                        </a>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFeatured(p)}
                        title={p.featured ? "Remove from featured" : "Add to featured"}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          p.featured ? "bg-[#5B4FFF]/20 text-[#a89dff]" : "bg-white/5 text-white/30 hover:text-[#a89dff]"
                        }`}
                      >
                        {p.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditProject(p)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <div className="text-center py-20 text-white/20">
                    No projects yet. Click &quot;New Project&quot; to add one.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Contacts Tab ── */}
        {tab === "contacts" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                Contact Messages
              </h2>
              {unreadCount > 0 && (
                <span className="text-sm text-white/40">{unreadCount} unread</span>
              )}
            </div>

            {loadingContacts ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#5B4FFF]/30 border-t-[#5B4FFF] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-2xl border transition-all ${
                      !c.read
                        ? "border-[#5B4FFF]/25 bg-[#5B4FFF]/5"
                        : "border-white/5 bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className="flex items-center gap-4 p-4 cursor-pointer"
                      onClick={() => {
                        setExpandedContact(expandedContact === c.id ? null : c.id);
                        if (!c.read) markRead(c.id, true);
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${!c.read ? "bg-[#5B4FFF]" : "bg-transparent"}`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{c.name}</span>
                          {c.subject && (
                            <span className="text-xs text-white/40">— {c.subject}</span>
                          )}
                        </div>
                        <div className="text-xs text-white/30 mt-0.5">{c.email}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/20">
                          {new Date(c.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {expandedContact === c.id ? (
                          <ChevronUp className="w-4 h-4 text-white/30" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/30" />
                        )}
                      </div>
                    </div>

                    {expandedContact === c.id && (
                      <div className="px-4 pb-4 border-t border-white/5 pt-4 ml-6">
                        <p
                          className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {c.message}
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <a
                            href={`mailto:${c.email}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-all"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Reply
                          </a>
                          <button
                            onClick={() => markRead(c.id, !c.read)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-all"
                          >
                            {c.read ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                            {c.read ? "Mark unread" : "Mark read"}
                          </button>
                          <button
                            onClick={() => deleteContact(c.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/30 hover:text-red-400 text-xs transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="text-center py-20 text-white/20">No messages yet.</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project modal */}
      {editProject !== null && (
        <ProjectModal
          project={editProject === "new" ? null : editProject}
          onClose={() => setEditProject(null)}
          onSaved={() => {
            setEditProject(null);
            fetchProjects();
          }}
        />
      )}
    </div>
  );
}
