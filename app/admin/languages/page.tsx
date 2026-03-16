'use client';

export default function AdminLanguagesPage() {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', supported: true },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', supported: true },
    { code: 'zh-cn', name: 'Simplified Chinese', nativeName: '简体中文', flag: '🇨🇳', supported: true },
    { code: 'zh-tw', name: 'Traditional Chinese', nativeName: '繁體中文', flag: '🇹🇼', supported: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Languages & Translations</h1>
        <p className="text-gray-400">Manage supported languages and translation content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map(lang => (
          <div key={lang.code} className="bg-brand-surface border border-brand-border rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{lang.flag}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{lang.name}</h3>
                  <p className="text-sm text-gray-400">{lang.nativeName}</p>
                </div>
              </div>
              {lang.supported && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold">
                  <i className="ph ph-check-circle"></i>
                  Active
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Code</p>
                <code className="text-sm font-mono text-gray-300">{lang.code}</code>
              </div>
              <button className="w-full py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors text-sm font-medium">
                Manage Translations
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <i className="ph ph-info text-blue-400"></i>
          Translation Management
        </h3>
        <ul className="text-sm text-blue-300/80 space-y-2">
          <li>• All content must be translated to all 4 languages</li>
          <li>• Use professional translations, not machine translation</li>
          <li>• Each language can have platform-specific variations</li>
          <li>• Traditional Chinese (ZH-TW) must be distinct from Simplified (ZH-CN)</li>
        </ul>
      </div>
    </div>
  );
}
