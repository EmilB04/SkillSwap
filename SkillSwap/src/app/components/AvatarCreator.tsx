import { useState } from "react";
import { colors } from "@/app/theme";
import {
  HAIR_OPTIONS,
  HAIR_COLORS,
  BEARD_OPTIONS,
  SKIN_COLOR,
  EYE_OPTIONS,
  MOUTH_OPTIONS,
  CLOTHES_OPTIONS,
  CLOTHES_COLORS,
  ACCESSORIES_OPTIONS,
  EYEBROW_OPTIONS,
} from "@/app/lib/avatarConfig";

interface AvatarCreatorProps {
  onSave: (avatarUrl: string) => void;
  onCancel: () => void;
}

export function AvatarCreator({ onSave, onCancel }: AvatarCreatorProps) {
  const [config, setConfig] = useState({
    hair: HAIR_OPTIONS[10],
    hairColor: HAIR_COLORS[0],
    beard: BEARD_OPTIONS[0],
    beardColor: HAIR_COLORS[0],
    skinColor: SKIN_COLOR[2],
    eyes: EYE_OPTIONS[0],
    mouth: MOUTH_OPTIONS[8],
    clothes: CLOTHES_OPTIONS[0],
    clothesColor: CLOTHES_COLORS[0],
    accessories: ACCESSORIES_OPTIONS[0],
    accessoriesColor: CLOTHES_COLORS[0],
    eyebrows: EYEBROW_OPTIONS[0],
  });

  const getAvatarUrl = () => {
    const params: string[] = [
      `skinColor[]=${config.skinColor}`,
      `eyes[]=${config.eyes}`,
      `mouth[]=${config.mouth}`,
      `clothing[]=${config.clothes}`,
      `clothesColor[]=${config.clothesColor}`,
      `eyebrows[]=${config.eyebrows}`,
    ];

    if (config.hair === "none") {
      params.push(`topProbability=0`);
    } else {
      params.push(`top[]=${config.hair}`);
      params.push(`hairColor[]=${config.hairColor}`);
    }

    if (config.beard !== "none") {
      params.push(`facialHair[]=${config.beard}`);
      params.push(`facialHairColor[]=${config.beardColor}`);
      params.push(`facialHairProbability=100`);
    }

    if (config.accessories !== "none") {
      params.push(`accessories[]=${config.accessories}`);
      params.push(`accessoriesColor[]=${config.accessoriesColor}`);
      params.push(`accessoriesProbability=100`);
    }

    return `https://api.dicebear.com/9.x/avataaars/svg?${params.join("&")}`;
  };

  const updateConfig = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="avatar-creator-title" className="fixed inset-0 flex items-center justify-center z-[60] p-4 overflow-y-auto" onClick={onCancel}>
      <article className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col max-h-[85vh]">
          <header className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <h2 id="avatar-creator-title" className="text-xl font-bold text-gray-900">Create Your Avatar</h2>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="flex flex-col items-center" aria-labelledby="preview-heading">
                <div className="lg:sticky lg:top-0 bg-white pb-4 w-full">
                  <h3 id="preview-heading" className="text-lg font-semibold text-gray-900 mb-3 text-center">Preview</h3>
                  <figure className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <img src={getAvatarUrl()} alt="Avatar preview" className="w-48 h-48 mx-auto" />
                  </figure>
                </div>
              </section>

              <form id="avatar-form" className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(getAvatarUrl()); }}>
                <fieldset className="bg-gray-50 rounded-lg p-3 space-y-3">
                  <legend className="font-semibold text-gray-900">Appearance</legend>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hair Style</label>
                    <select value={config.hair} onChange={(e) => updateConfig("hair", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {HAIR_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hair Color</label>
                    <div className="flex flex-wrap gap-1">
                      {HAIR_COLORS.map((color) => (
                        <button key={color} type="button" onClick={() => updateConfig("hairColor", color)} className={`w-6 h-6 rounded-full border-2 cursor-pointer ${config.hairColor === color ? "border-gray-900 scale-110" : "border-gray-300"}`} style={{ backgroundColor: `#${color}` }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facial Hair</label>
                    <select value={config.beard} onChange={(e) => updateConfig("beard", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {BEARD_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {config.beard !== "none" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facial Hair Color</label>
                      <div className="flex flex-wrap gap-1">
                        {HAIR_COLORS.map((color) => (
                          <button key={color} type="button" onClick={() => updateConfig("beardColor", color)} className={`w-6 h-6 rounded-full border-2 cursor-pointer ${config.beardColor === color ? "border-gray-900 scale-110" : "border-gray-300"}`} style={{ backgroundColor: `#${color}` }} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skin Color</label>
                    <div className="flex flex-wrap gap-1">
                      {SKIN_COLOR.map((color) => (
                        <button key={color} type="button" onClick={() => updateConfig("skinColor", color)} className={`w-6 h-6 rounded-full border-2 cursor-pointer ${config.skinColor === color ? "border-gray-900 scale-110" : "border-gray-300"}`} style={{ backgroundColor: `#${color}` }} />
                      ))}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="bg-gray-50 rounded-lg p-3 space-y-3">
                  <legend className="font-semibold text-gray-900">Facial Features</legend>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eyes</label>
                    <select value={config.eyes} onChange={(e) => updateConfig("eyes", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {EYE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrows</label>
                    <select value={config.eyebrows} onChange={(e) => updateConfig("eyebrows", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {EYEBROW_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mouth</label>
                    <select value={config.mouth} onChange={(e) => updateConfig("mouth", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {MOUTH_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </fieldset>

                <fieldset className="bg-gray-50 rounded-lg p-3 space-y-3">
                  <legend className="font-semibold text-gray-900">Clothing</legend>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clothes</label>
                    <select value={config.clothes} onChange={(e) => updateConfig("clothes", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {CLOTHES_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clothes Color</label>
                    <div className="flex flex-wrap gap-1">
                      {CLOTHES_COLORS.map((color) => (
                        <button key={color} type="button" onClick={() => updateConfig("clothesColor", color)} className={`w-6 h-6 rounded-full border-2 cursor-pointer ${config.clothesColor === color ? "border-gray-900 scale-110" : "border-gray-300"}`} style={{ backgroundColor: `#${color}` }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accessories</label>
                    <select value={config.accessories} onChange={(e) => updateConfig("accessories", e.target.value)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer">
                      {ACCESSORIES_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {config.accessories !== "none" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accessories Color</label>
                      <div className="flex flex-wrap gap-1">
                        {CLOTHES_COLORS.map((color) => (
                          <button key={color} type="button" onClick={() => updateConfig("accessoriesColor", color)} className={`w-6 h-6 rounded-full border-2 cursor-pointer ${config.accessoriesColor === color ? "border-gray-900 scale-110" : "border-gray-300"}`} style={{ backgroundColor: `#${color}` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </fieldset>
              </form>
            </div>
          </main>

          <footer className="px-6 py-3 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0 bg-white">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium cursor-pointer">
              Cancel
            </button>
            <button type="submit" form="avatar-form" className="px-4 py-2 text-sm text-white rounded-lg font-medium cursor-pointer" style={{ backgroundColor: colors.primary.main }}>
              Save Avatar
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}
