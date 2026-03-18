import Image from "next/image";
import thinkforeverLogo from "../assets/images/thinkforever-logo.png";

export default function DocLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Image
        src={thinkforeverLogo}
        alt="Think4ever"
        width={200}
        height={32}
        priority
      />
    </div>
  );
}
