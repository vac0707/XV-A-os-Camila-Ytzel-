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

  app.use(express.json());

  const DATA_FILE = path.join(process.cwd(), "guestbook_data.json");

  // Helper function to read guestbook comments safely from JSON file
  function readComments(): GuestComment[] {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error("Error reading guestbook_data.json:", err);
    }
    return [];
  }

  // Helper function to save guestbook comments to JSON file
  function saveComments(comments: GuestComment[]) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(comments, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing guestbook_data.json:", err);
    }
  }

  // GET /api/guestbook - Fetch all guestbook comments
  app.get("/api/guestbook", (_req, res) => {
    const comments = readComments();
    res.json(comments);
  });

  // POST /api/guestbook - Add a new comment
  app.post("/api/guestbook", (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment || !name.trim() || !comment.trim()) {
      return res.status(400).json({ error: "Nombre y mensaje son obligatorios." });
    }

    const comments = readComments();
    const newEntry: GuestComment = {
      id: Date.now().toString() + "-" + Math.random().toString(36).substring(2, 6),
      name: name.trim().slice(0, 50),
      comment: comment.trim().slice(0, 200),
      date: new Date().toISOString().split("T")[0],
    };

    comments.unshift(newEntry);
    saveComments(comments);

    return res.status(201).json(newEntry);
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
