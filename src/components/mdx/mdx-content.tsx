import { useMemo, createElement } from "react";
import * as runtime from "react/jsx-runtime";
import Callout from "~/components/ui/callout";
import { ClientTweetCard } from "~/components/ui/client-tweet-card";
import { YouTubeEmbed } from "@next/third-parties/google";
import CustomImage from "./custom-image";
import CustomLink from "./custom-link";

const sharedComponents = {
  CustomImage,
  CustomLink,
  YouTubeEmbed,
  Callout,
  Tweet: ClientTweetCard,
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const MDXContent = ({ code, components }: MDXProps) => {
  const element = useMemo(() => {
    const Component = getMDXComponent(code);
    return createElement(Component, {
      components: {
        ...sharedComponents,
        ...components,
      },
    });
  }, [code, components]);

  return element;
};

export default MDXContent;
