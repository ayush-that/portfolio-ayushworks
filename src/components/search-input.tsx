"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";

const SearchInput = () => {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-2 top-2/4 size-4 -translate-y-2/4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t("blog.searchPlaceholder")}
        className="w-full rounded-lg bg-background pl-8"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={onChangeHandle}
      />
    </div>
  );
};

export default SearchInput;
