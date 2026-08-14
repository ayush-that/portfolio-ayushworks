"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";

// Deliberately avoids useSearchParams: reading it makes Next skip prerendering
// the surrounding subtree, which left /blog and /projects with no list in the
// static HTML. The query string is read from the URL after mount instead, and
// written back with replaceState so shared links keep working.
const SearchInput = ({
  placeholder = "Search...",
  onSearch,
}: {
  placeholder?: string;
  onSearch: (term: string) => void;
}) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("search") ?? "";
    if (!initial) return;
    setTerm(initial);
    onSearch(initial);
    // Runs once on mount; onSearch is a setState updater from the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setTerm(next);
    onSearch(next);

    const params = new URLSearchParams(window.location.search);
    if (next) params.set("search", next);
    else params.delete("search");

    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  };

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-2 top-2/4 size-4 -translate-y-2/4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg bg-background pl-8"
        value={term}
        onChange={onChangeHandle}
      />
    </div>
  );
};

export default SearchInput;
