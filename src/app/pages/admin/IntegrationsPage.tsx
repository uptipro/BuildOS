import { Plus, Copy, Eye, EyeOff, Trash2, Key, Webhook } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created?: string;
  lastUsed?: string;
  status?: string;
};

type WebhookConfig = {
  id: string;
  name: string;
  url: string;
  events: string[];
  status?: string;
};

export function IntegrationsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  useEffect(() => {
    Promise.all([
      apiFetch<ApiKey[]>("/api-keys"),
      apiFetch<WebhookConfig[]>("/webhooks"),
    ])
      .then(([keys, hooks]) => {
        setApiKeys(keys ?? []);
        setWebhooks(hooks ?? []);
      })
      .catch((err) => {
        console.error("Failed to load integrations:", err);
        setApiKeys([]);
        setWebhooks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleKeyVisibility = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const maskKey = (key: string) => {
    return key.slice(0, 7) + "..." + key.slice(-4);
  };

  const randomToken = (len: number) =>
    Array.from(
      { length: len },
      () =>
        "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)],
    ).join("");

  const generateApiKey = () => {
    const name = window.prompt("API key name", "New API Key")?.trim();
    if (!name) return;
    const now = new Date().toISOString();
    setApiKeys((prev) => [
      {
        id: `key-${Date.now()}`,
        name,
        key: `sk_live_${randomToken(24)}`,
        created: now,
        status: "active",
      },
      ...prev,
    ]);
  };

  const addWebhook = () => {
    const name = window.prompt("Webhook name", "New Webhook")?.trim();
    if (!name) return;
    const url = window
      .prompt("Webhook URL", "https://example.com/webhook")
      ?.trim();
    if (!url) return;
    const eventsRaw = window.prompt(
      "Events (comma-separated)",
      "project.updated,approval.submitted",
    );
    const events = (eventsRaw ?? "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    if (events.length === 0) return;

    setWebhooks((prev) => [
      {
        id: `wh-${Date.now()}`,
        name,
        url,
        events,
        status: "active",
      },
      ...prev,
    ]);
  };

  const deleteApiKey = (id: string) => {
    if (!window.confirm("Delete this API key?")) return;
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const deleteWebhook = (id: string) => {
    if (!window.confirm("Delete this webhook?")) return;
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
  };

  const fmtDate = (v?: string) => {
    if (!v) return "Never";
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-GB");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Integrations</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage API keys and webhooks for external integrations
        </p>
      </div>

      {/* API Keys */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
          </div>
          <button
            onClick={generateApiKey}
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate New Key
          </button>
        </div>

        <div className="space-y-3">
          {loading && (
            <p className="text-sm text-gray-500">Loading API keys...</p>
          )}
          {!loading && apiKeys.length === 0 && (
            <p className="text-sm text-gray-500">No API keys configured.</p>
          )}
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-gray-900">{apiKey.name}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        (apiKey.status ?? "active") === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {apiKey.status ?? "active"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                    <code className="flex-1 text-sm font-mono text-gray-900">
                      {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {showKey[apiKey.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
                    <span>Created: {fmtDate(apiKey.created)}</span>
                    <span>Last used: {fmtDate(apiKey.lastUsed)}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteApiKey(apiKey.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Security Note:</strong> Keep your API keys secure and never
            share them publicly. Rotate keys regularly for enhanced security.
          </p>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Webhook className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Webhooks</h2>
          </div>
          <button
            onClick={addWebhook}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Webhook
          </button>
        </div>

        <div className="space-y-3">
          {loading && (
            <p className="text-sm text-gray-500">Loading webhooks...</p>
          )}
          {!loading && webhooks.length === 0 && (
            <p className="text-sm text-gray-500">No webhooks configured.</p>
          )}
          {webhooks.map((webhook) => (
            <div
              key={webhook.id}
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-gray-900">{webhook.name}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        (webhook.status ?? "active") === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {webhook.status ?? "active"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 font-mono mb-2">
                    {webhook.url}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-mono"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => deleteWebhook(webhook.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Events */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Available Webhook Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "project.created",
            "project.updated",
            "project.deleted",
            "approval.submitted",
            "approval.approved",
            "approval.rejected",
            "expense.created",
            "expense.updated",
            "budget.exceeded",
            "material.low_stock",
            "user.created",
            "user.updated",
          ].map((event) => (
            <div
              key={event}
              className="px-3 py-2 border border-gray-200 rounded-md"
            >
              <code className="text-sm text-gray-900">{event}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
