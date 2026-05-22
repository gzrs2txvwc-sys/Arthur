import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0f0b06",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: "40px",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            width: 116,
            height: 116,
            borderRadius: "50%",
            border: "1.5px solid rgba(210,152,38,0.82)",
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            width: 84,
            height: 84,
            borderRadius: "50%",
            border: "0.75px solid rgba(210,152,38,0.38)",
          }}
        />
        {/* N tick */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: "50%",
            width: 1.5,
            height: 10,
            background: "rgba(210,152,38,0.70)",
            transform: "translateX(-50%)",
            borderRadius: 1,
          }}
        />
        {/* S tick */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: "50%",
            width: 1.5,
            height: 10,
            background: "rgba(210,152,38,0.70)",
            transform: "translateX(-50%)",
            borderRadius: 1,
          }}
        />
        {/* W tick */}
        <div
          style={{
            position: "absolute",
            left: 26,
            top: "50%",
            width: 10,
            height: 1.5,
            background: "rgba(210,152,38,0.70)",
            transform: "translateY(-50%)",
            borderRadius: 1,
          }}
        />
        {/* E tick */}
        <div
          style={{
            position: "absolute",
            right: 26,
            top: "50%",
            width: 10,
            height: 1.5,
            background: "rgba(210,152,38,0.70)",
            transform: "translateY(-50%)",
            borderRadius: 1,
          }}
        />
        {/* Center dot */}
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "rgba(210,152,38,0.94)",
          }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  );
}
