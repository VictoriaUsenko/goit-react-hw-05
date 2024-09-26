import { ColorRing } from "react-loader-spinner";
export default function Loader() {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{
        display: "block",
        margin: "auto",
      }}
      wrapperClass="color-ring-wrapper"
      colors={["#640c9b", "#646cff", "#46d2d2", "#dee97a", "#f7f254"]}
    />
  );
}
