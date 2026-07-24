import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface GuestComment {
  id: string;
  name: string;
  comment: string;
  date: string;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares to parse JSON and URL-encoded request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Primary and fallback storage file paths
  const STORAGE_PATHS = [
    path.join(process.cwd(), "guestbook_data.json"),
    "/tmp/guestbook_data.json",
  ];

  // In-memory array for instant, error-free responses across requests
  let commentsInMemory: GuestComment[] = [];

  // Helper to load comments on server start
  function loadInitialComments() {
    for (const p of STORAGE_PATHS) {
      try {
        if (fs.existsSync(p)) {
          const raw = fs.readFileSync(p, "utf-8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            commentsInMemory = parsed;
            console.log(`Loaded ${parsed.length} comments from ${p}`);
            return;
          }
        }
      } catch (err) {
        console.error(`Error reading guestbook file from ${p}:`, err);
      }
    }
    console.log("No existing guestbook file found. Initialized empty guestbook.");
  }

  loadInitialComments();

  // Helper function to save guestbook comments to disk
  function saveComments(comments: GuestComment[]) {
    for (const p of STORAGE_PATHS) {
      try {
        fs.writeFileSync(p, JSON.stringify(comments, null, 2), "utf-8");
      } catch (err) {
        console.error(`Could not write guestbook file to ${p}:`, err);
      }
    }
  }

  // GET /api/guestbook - Fetch all guestbook comments
  app.get("/api/guestbook", (_req, res) => {
    try {
      return res.json(commentsInMemory);
    } catch (err) {
      console.error("Error in GET /api/guestbook:", err);
      return res.status(500).json({ error: "Error al obtener los comentarios." });
    }
  });

  // POST /api/guestbook - Add a new comment
  app.post("/api/guestbook", (req, res) => {
    try {
      const body = req.body || {};
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const comment = typeof body.comment === "string" ? body.comment.trim() : "";

      if (!name || !comment) {
        return res.status(400).json({ error: "Nombre y mensaje son obligatorios." });
      }

      const newEntry: GuestComment = {
        id: Date.now().toString() + "-" + Math.random().toString(36).substring(2, 6),
        name: name.slice(0, 50),
        comment: comment.slice(0, 200),
        date: new Date().toISOString().split("T")[0],
      };

      commentsInMemory.unshift(newEntry);
      saveComments(commentsInMemory);

      return res.status(201).json(newEntry);
    } catch (err) {
      console.error("Error in POST /api/guestbook:", err);
      return res.status(500).json({ error: "Error al guardar el mensaje en el servidor." });
    }
  });

  // Vite middleware for development vs production static file serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
