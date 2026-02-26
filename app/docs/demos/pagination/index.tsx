"use client";
import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/app/ui/components/pagination";

// ─── Default ───────────────────────────────────────────────────────────────

export function PaginationDefault() {
  const [page, setPage] = React.useState(1);
  const total = 10;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
        </PaginationItem>

        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationButton active={page === p} onClick={() => setPage(p)}>
              {p}
            </PaginationButton>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            active={page === total}
            onClick={() => setPage(total)}
          >
            {total}
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            disabled={page === total}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

// ─── Compact ───────────────────────────────────────────────────────────────

export function PaginationCompact() {
  const [page, setPage] = React.useState(3);
  const total = 20;

  return (
    <div className="flex items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(total, p + 1))}
              disabled={page === total}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <span className="text-sm text-muted-foreground">
        Page {page} of {total}
      </span>
    </div>
  );
}

// ─── Full ──────────────────────────────────────────────────────────────────

export function PaginationFull() {
  const [page, setPage] = React.useState(5);
  const total = 20;

  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < total - 2) pages.push("ellipsis");
    if (total > 1) pages.push(total);
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
        </PaginationItem>

        {getVisiblePages().map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`e-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationButton active={page === p} onClick={() => setPage(p)}>
                {p}
              </PaginationButton>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            disabled={page === total}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
