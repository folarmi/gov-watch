import { useNavigate } from "react-router-dom";

export function goBack(navigate: ReturnType<typeof useNavigate>) {
  navigate(-1);
}
