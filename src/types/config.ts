export type Theme = "light" | "dark";

export interface ConfigProps {
  appName: string;
  brandName: string;
  authorName: string;
  appTitle: string;
  appDescription: string;
  appDesignation: string;
  domainName: string;
  cdnUrl: string;
  location: {
    country: string;
    countryCode: string;
    timezone: string;
  };

  social: {
    github: string;
    linkedin: string;
    instagram: string;
    discord: string;
    email: string;
    youtube: string;
    twitter: string;
    buymeacoffee: string;
  };

  colors: {
    theme: Theme;
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
}
