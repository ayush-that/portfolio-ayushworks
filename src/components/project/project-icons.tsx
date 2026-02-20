import Image from "next/image";
import React from "react";
import powerUpLogo from "~/assets/images/power-up.webp";
import mintKutoLogo from "~/assets/images/mint-kuto.avif";
import NftConnectLogo from "~/assets/images/nft-connect.jpg";
import worldRankLogo from "~/assets/images/world-rank.png";
import { cn } from "~/lib/utils";

const DEFAULT_CLASS =
  "size-16 border border-border bg-muted grid place-content-center rounded-md p-3";

export const PowerUp = () => {
  return (
    <div className={cn(DEFAULT_CLASS, "bg-muted")}>
      <Image alt="Power up brain battles" src={powerUpLogo} placeholder="blur" />
    </div>
  );
};
export const MintKuto = () => {
  return (
    <div className={cn(DEFAULT_CLASS, "overflow-hidden bg-transparent p-0")}>
      <Image
        alt="Unlocking the Potential of Kuto Digital Characters"
        src={mintKutoLogo}
        placeholder="blur"
      />
    </div>
  );
};
export const NftConnect = () => {
  return (
    <div className={cn(DEFAULT_CLASS, "bg-transparent bg-white p-2")}>
      <Image
        alt="Unlocking the Potential of Kuto Digital Characters"
        src={NftConnectLogo}
        placeholder="blur"
      />
    </div>
  );
};

export const PodPortal = () => {
  return (
    <div className={cn(DEFAULT_CLASS, "bg-muted bg-transparent p-2")}>
      <h3 className="font-serif text-5xl">P</h3>
    </div>
  );
};

export const worldRank = () => {
  return (
    <div className={cn(DEFAULT_CLASS, "border-0 bg-transparent p-0")}>
      <Image alt="ultimate source for country rankings" src={worldRankLogo} placeholder="blur" />
    </div>
  );
};
