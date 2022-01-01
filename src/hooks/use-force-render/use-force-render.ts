import { useState } from "react";

type UseForceRenderInterface = () => void;

function useForceRender(): UseForceRenderInterface {
  const [, setRenderCount] = useState<number>(0);
  return () => setRenderCount((curr) => curr + 1);
}

export { useForceRender };
