import { ImSpinner2 } from "react-icons/im";

const inputClass =
  "w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-black";

export default function FormModal({
  isOpen,
  onClose,
  title = "Form",
  fields = [],
  formData = {},
  onChange,
  onSubmit,
  loading = false,
  error = "",
  submitLabel = "Submit",
  editMode = false,
}) {
  if (!isOpen) return null;

  const visibleFields = fields.filter((f) => !(editMode && f.hideOnEdit));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl border border-gray-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded-lg mb-3">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          {visibleFields.map((field) => {
            if (field.type === "select") {
              return (
                <select
                  key={field.name}
                  disabled={loading}
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={onChange}
                  className={inputClass}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              );
            }

            if (field.type === "textarea") {
              return (
                <textarea
                  key={field.name}
                  disabled={loading}
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  placeholder={field.placeholder || field.name}
                  onChange={onChange}
                  required={field.required !== false}
                  rows={3}
                  className={inputClass}
                />
              );
            }

            return (
              <input
                key={field.name}
                disabled={loading}
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] ?? ""}
                placeholder={field.placeholder || field.name}
                onChange={onChange}
                required={field.required !== false}
                className={inputClass}
              />
            );
          })}

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 text-sm border bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <ImSpinner2 className="animate-spin" /> Mohon Tunggu...
                </span>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
