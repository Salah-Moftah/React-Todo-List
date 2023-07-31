import IconButton from "@mui/material/IconButton";

export default function Icons({ color, iconName, background, onClick }) {
  return (
    <>
      <IconButton
        className="iconBoutton"
        style={{
          background: background,
          color: color,
          border: `3px solid ${color}`,
          borderRadius: "50%",
        }}
        onClick={() => {
          onClick();
        }}
      >
        {iconName}
      </IconButton>
    </>
  );
}
