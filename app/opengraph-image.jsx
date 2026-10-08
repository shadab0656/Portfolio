import { ogSize, renderOg } from "@/lib/ogImage";
import { site } from "@/lib/site";

export const alt = `${site.name}, stand-up comedian available for weddings and corporate events in Delhi NCR`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg();
}
