import fs from "fs/promises";
import path from "path";
import { getSignedDownloadUrl, isR2Configured, uploadToR2 } from "@/lib/r2";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

export function isRemoteAudioKey(key: string) {
  return key.startsWith("http://") || key.startsWith("https://");
}

export function isLocalAudioKey(key: string) {
  return key.startsWith("local:");
}

export function localKeyToPath(key: string) {
  return path.join(UPLOAD_DIR, key.replace(/^local:/, ""));
}

export async function resolveMediaUrl(
  key: string,
  expiresIn = 3600,
): Promise<string> {
  if (isRemoteAudioKey(key)) return key;

  if (isLocalAudioKey(key)) {
    const relative = key.replace(/^local:/, "");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return `${appUrl}/api/media/${relative.split("/").map(encodeURIComponent).join("/")}`;
  }

  if (!isR2Configured()) {
    throw new Error("Storage not configured for key: " + key);
  }

  return getSignedDownloadUrl(key, expiresIn);
}

export async function saveUploadedFile(
  storageKey: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  if (isR2Configured()) {
    return uploadToR2(storageKey, body, contentType);
  }

  const fullPath = path.join(UPLOAD_DIR, storageKey);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, body);
  return `local:${storageKey}`;
}

export async function readLocalFile(storageKey: string) {
  const fullPath = path.join(UPLOAD_DIR, storageKey);
  return fs.readFile(fullPath);
}

export async function getLocalFileSize(storageKey: string) {
  const fullPath = path.join(UPLOAD_DIR, storageKey);
  const stat = await fs.stat(fullPath);
  return stat.size;
}

/** Byte-range read for long-form seek (206 Partial Content). */
export async function readLocalFileRange(
  storageKey: string,
  start: number,
  end: number,
) {
  const fullPath = path.join(UPLOAD_DIR, storageKey);
  const length = end - start + 1;
  const handle = await fs.open(fullPath, "r");
  try {
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, start);
    return buffer;
  } finally {
    await handle.close();
  }
}
