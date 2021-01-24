import styled from "styled-components";

function iCanHasColor(value) {
  return value || "currentColor";
}
function iCanHasPixels(value) {
  return value ? `${value}px` : "100%";
}

export default styled.div`
  color: ${(props) => iCanHasColor(props.iconColor)};
  height: ${(props) => iCanHasPixels(props.iconSize)};
  width: ${(props) => iCanHasPixels(props.iconSize)};

  svg {
    max-width: 100%;
    height: 100%;
    display: block;
    margin: auto;
  }
`;
