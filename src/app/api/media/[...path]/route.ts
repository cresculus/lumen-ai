import {
  getLocalFileSize,
  readLocalFile,
  readLocalFileRange,
} from "@/lib/storage";
import { NextResponse } from "next/server";

const MIME: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  flac: "audio/flac",
  m4a: "audio/mp4",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

function parseRange(header: string | null, size: number) {
  if (!header?.startsWith("bytes=")) return null;
  const [startRaw, endRaw] = header.replace("bytes=", "").split("-");
  const start = Number(startRaw);
  const end = endRaw ? Number(endRaw) : size - 1;
  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
    return null;
  }
  return { start, end: Math.min(end, size - 1) };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const storageKey = segments.map(decodeURIComponent).join("/");
  const ext = storageKey.split(".").pop()?.toLowerCase() || "";
  const contentType = MIME[ext] || "application/octet-stream";

  try {
    const size = await getLocalFileSize(storageKey);
    const range = parseRange(request.headers.get("range"), size);

    if (range) {
      const body = await readLocalFileRange(
        storageKey,
        range.start,
        range.end,
      );
      return new NextResponse(new Uint8Array(body), {
        status: 206,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(body.length),
          "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const body = await readLocalFile(storageKey);
    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(size),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
