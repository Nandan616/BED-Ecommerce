import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-8">
      {/* Previous Button */}
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700"
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* First Page */}
      {start > 1 && (
        <>
          <button
            onClick={() => setPage(1)}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition"
          >
            1
          </button>
          {start > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map(pn => (
        <button
          key={pn}
          onClick={() => setPage(pn)}
          className={`px-3 py-2 border rounded-lg transition ${
            pn === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-100 text-gray-700'
          }`}
        >
          {pn}
        </button>
      ))}

      {/* Last Page */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <button
            onClick={() => setPage(totalPages)}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 transition"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>

      {/* Page Info */}
      <span className="ml-4 text-sm text-gray-600">
        Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
      </span>
    </div>
  );
}

