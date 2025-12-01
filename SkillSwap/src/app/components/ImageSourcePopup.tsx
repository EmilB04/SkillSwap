interface ImageSourcePopupProps {
  onUploadPicture: () => void;
  onCustomizeAvatar: () => void;
  onClose: () => void;
}

export function ImageSourcePopup({
  onUploadPicture,
  onCustomizeAvatar,
  onClose,
}: ImageSourcePopupProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <nav aria-label="Image source options" className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-64">
        <menu className="p-2 m-0 list-none">
          <li>
            <button
              type="button"
              onClick={onUploadPicture}
              className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-[280ms] text-left flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Upload Picture</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={onCustomizeAvatar}
              className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-[280ms] text-left flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Customize Avatar</span>
            </button>
          </li>
        </menu>
      </nav>
    </>
  );
}
