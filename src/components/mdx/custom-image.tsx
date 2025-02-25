import Image, { ImageProps } from "next/image";

const CustomImage: React.FC<ImageProps> = ({ ...props }) => {
  return (
    <div className="relative mt-3 aspect-video">
      <Image
        priority
        fetchPriority="auto"
        fill
        quality={95}
        className="!m-0 size-full rounded-sm object-cover"
        {...props}
        alt={props.alt}
      />
    </div>
  );
};

export default CustomImage;
