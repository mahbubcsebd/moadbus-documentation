import Image from "next/image";
import thinkforeverLogo from "../assets/images/thinkforever-logo.png";

export default function DocFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid #1c1c1c",
        padding: "2rem 10px",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            src={thinkforeverLogo}
            alt="Think4ever"
            width={120}
            height={32}
          />
        </div>
        {/* <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: "#52525b",
                textDecoration: "none",
                fontSize: "0.8rem",
              }}
            >
              {item}
            </a>
          ))}
        </div> */}
        <span style={{ color: "#717472", fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} think4ever. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
