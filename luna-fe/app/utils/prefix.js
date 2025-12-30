// app/utils/prefix.js
export const prefix = (path) => {
  // 1. If it's an external URL (http...), return as is
  if (path.startsWith("http")) return path;

  // 2. Get the base path we defined in next.config.mjs
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // 3. Ensure the path starts with a slash if it doesn't
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // 4. Combine them (e.g., "/Luna" + "/logo.png" OR "" + "/logo.png")
  return `${basePath}${cleanPath}`;
};
