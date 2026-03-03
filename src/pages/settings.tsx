import { useEffect, useState, type FormEvent } from "react";
import {
  type Card,
  checkAdmin,
  createProjectCard,
  deleteProjectCard,
  getBlender,
  getProject,
  loginAdmin,
  logoutAdmin,
  updateProjectCard,
  type CreateCardPayload,
} from "../utils";

const TOKEN_KEY = "admin_token";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const initialForm: CreateCardPayload = {
  title: "",
  description: "",
  image: "",
  url: "",
  tag: "project",
};

const withCloudinaryAttachment = (value: string) => {
  try {
    const parsed = new URL(value);
    const marker = "/image/upload/";

    if (!parsed.pathname.includes(marker)) {
      return value;
    }

    if (
      parsed.pathname.includes("/image/upload/fl_attachment/") ||
      parsed.pathname.includes("/image/upload/fl_attachment:")
    ) {
      return value;
    }

    parsed.pathname = parsed.pathname.replace(
      marker,
      "/image/upload/fl_attachment/"
    );
    return parsed.toString();
  } catch {
    return value;
  }
};

export function Settings() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<CreateCardPayload>(initialForm);
  const [cards, setCards] = useState<Card[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadCards = async () => {
    const [projectsRes, blenderRes] = await Promise.all([
      getProject(),
      getBlender(),
    ]);

    setCards([...projectsRes.data, ...blenderRes.data]);
  };

  useEffect(() => {
    loadCards().catch(() => {
      // ignore initial load errors here
    });
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) return;

    checkAdmin(savedToken)
      .then(() => {
        setToken(savedToken);
        loadCards().catch(() => {
          // ignore refresh errors here
        });
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      });
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await loginAdmin({ username, password });
      localStorage.setItem(TOKEN_KEY, response.data.token);
      setToken(response.data.token);
      setPassword("");
      await loadCards();
      setMessage("Logged in.");
    } catch {
      setMessage("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!token) return;
    setLoading(true);
    setMessage("");

    try {
      await logoutAdmin(token);
    } catch {
      // Do not block local logout if API call fails.
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setLoading(false);
      setMessage("Logged out.");
    }
  };

  const handleSubmitCard = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setMessage("");

    const normalizedForm: CreateCardPayload = {
      ...form,
      url: withCloudinaryAttachment(form.url),
    };

    try {
      if (editingId !== null) {
        await updateProjectCard(token, editingId, normalizedForm);
        setMessage("Project card updated.");
      } else {
        await createProjectCard(token, normalizedForm);
        setMessage("Project card uploaded.");
      }

      await loadCards();
      setForm(initialForm);
      setEditingId(null);
    } catch {
      setMessage(editingId !== null ? "Failed to update card." : "Failed to upload project card.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (card: Card) => {
    if (typeof card.id !== "number") {
      setMessage("This card cannot be edited because it has no id.");
      return;
    }

    setEditingId(card.id);
    setForm({
      title: card.title,
      description: card.description,
      image: card.image,
      url: card.url,
      tag: card.tag,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
  };

  const handleDelete = async (id?: number) => {
    if (!token || typeof id !== "number") return;
    if (!window.confirm("Delete this card?")) return;

    setLoading(true);
    setMessage("");
    try {
      await deleteProjectCard(token, id);
      await loadCards();
      if (editingId === id) {
        cancelEdit();
      }
      setMessage("Card deleted.");
    } catch {
      setMessage("Failed to delete card.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileUpload = async (file: File) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setMessage(
        "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    setUploadingImage(true);
    setMessage("Uploading image...");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Image upload failed");
      }

      const data: { secure_url?: string } = await response.json();
      if (!data.secure_url) {
        throw new Error("Image URL missing");
      }

      setForm((prev) => ({ ...prev, image: data.secure_url! }));
      setMessage("Image uploaded from your PC.");
    } catch (error) {
      const detail =
        error instanceof Error ? ` ${error.message}` : "";
      setMessage(`Failed to upload image.${detail}`);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <main className="min-h-full py-10 px-4">
      <section className="max-w-xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold">Admin Settings</h1>

        {!token ? (
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-lg p-5 shadow"
          >
            <h2 className="text-xl font-bold">Login</h2>
            <input
              type="text"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-2 bg-transparent"
              required
            />
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-2 bg-transparent"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <span className="font-semibold">Authenticated</span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="px-3 py-2 rounded bg-red-600 text-white font-semibold disabled:opacity-50"
              >
                Logout
              </button>
            </div>

            <form
              onSubmit={handleSubmitCard}
              className="flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-lg p-5 shadow"
            >
              <h2 className="text-xl font-bold">
                {editingId !== null ? "Edit Work" : "Upload Work"}
              </h2>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="border rounded p-2 bg-transparent"
                required
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="border rounded p-2 bg-transparent min-h-[120px]"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image: e.target.value }))
                }
                className="border rounded p-2 bg-transparent"
                required
              />
              <label className="text-sm font-medium opacity-80">
                Or upload image from your PC
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  handleImageFileUpload(file);
                  e.currentTarget.value = "";
                }}
                disabled={uploadingImage}
                className="border rounded p-2 bg-transparent file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 file:bg-slate-700 file:text-white"
              />
              {uploadingImage && (
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Uploading image...
                </p>
              )}
              <input
                type="url"
                placeholder="Project URL"
                value={form.url}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, url: e.target.value }))
                }
                className="border rounded p-2 bg-transparent"
                required
              />
              <select
                value={form.tag}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, tag: e.target.value }))
                }
                className="border rounded p-2 bg-transparent"
              >
                <option className="bg-slate-800" value="project">project</option>
                <option className="bg-slate-800" value="blender">blender</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-green-600 text-white font-semibold disabled:opacity-50"
              >
                {loading
                  ? editingId !== null
                    ? "Saving..."
                    : "Uploading..."
                  : editingId !== null
                  ? "Save Changes"
                  : "Upload"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 rounded bg-gray-600 text-white font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            <div className="flex flex-col gap-3 bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
              <h2 className="text-xl font-bold">Manage Existing Work</h2>
              {cards.length === 0 ? (
                <p className="text-sm opacity-70">No cards found.</p>
              ) : (
                cards.map((card, index) => (
                  <div
                    key={typeof card.id === "number" ? card.id : `${card.title}-${index}`}
                    className="border rounded p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{card.title}</p>
                      <span className="text-xs uppercase opacity-70">{card.tag}</span>
                    </div>
                    <p className="text-sm opacity-80 line-clamp-2">{card.description}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(card)}
                        className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(card.id)}
                        className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {message && (
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
