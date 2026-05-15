# Export Context

Export pipelines: PSD, SVG, PDF rendering and generation.

---

## Export Formats

**PSD (Photoshop):**
- Layered document
- Preserves hierarchy
- Editable in Photoshop
- Tool: ag-psd

**SVG (Scalable Vector Graphics):**
- Web-friendly vector
- Responsive and clean
- Tool: Custom renderer

**PDF (Portable Document Format):**
- Print-friendly
- Universal compatibility
- Tool: Puppeteer + html2pdf

---

## Architecture

```
User clicks "Export PSD"
    ↓
Queue job in BullMQ
    ↓
Return immediately to user
    ↓
Export worker picks up job
    ↓
Render scene graph to PSD bytes
    ↓
Upload to R2 storage
    ↓
Notify user (download link ready)
```

---

## Render Pipeline

1. Traverse scene graph
2. Convert semantic nodes to export format
3. Apply styling (colors, typography, spacing)
4. Handle nested components
5. Optimize file size
6. Generate final artifact

---

## Key Files

- `export-formats.md` → Format specifications
- `render-pipeline.md` → Rendering process

---

**Priority:** 5 | **Status:** Stub | **Last Updated:** 2026-05-16
