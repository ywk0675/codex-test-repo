# codex-test-repo

This repository provides a lightweight converter that turns structured JSON into worksheet-style HTML pages modeled after the provided day-based references.

## Usage

1. Prepare an input JSON file. The included example shows three pages that match the reference layout structure:

   ```bash
   cat examples/sample_input.json
   ```

2. Run the converter to produce HTML:

   ```bash
   python converter.py --input examples/sample_input.json --output output.html
   ```

3. Open `output.html` in a browser or print to PDF for distribution.

## Input format

- `pages` (array): Each item becomes its own page.
  - `day` (number or string): Rendered in the top-right day label.
  - `category` (string): Top-left meta block (e.g., Non-Fiction, Vocabulary).
  - `lexile` / `word_count` (string, optional): Additional meta line.
  - `title` (string): Main heading centered near the top.
  - `subtitle` (string, optional): Smaller heading above the title.
  - `instructions` (string, optional): Bold instructions block.
  - `passage` (array of strings, optional): Each entry becomes a paragraph inside a blue-outlined box.
  - `word_box` (object, optional): `{ "title": "WORD BOX", "words": ["..."] }` to show a centered vocabulary box.
  - `questions` (array, optional): Each question accepts a `prompt` and optional `options` array. Options render as a two-column grid to mirror the reference multiple-choice layout.

The converter focuses on repeatable spacing, borders, and typography to keep pages consistent across days. The CSS is embedded into the generated HTML for portability; no external assets or dependencies are required.

## Layout and printing

- Each page is locked to A4 size (210mm × 297mm) with print CSS, and a small scaling script automatically reduces content to keep everything on a single page (no overflow onto extra sheets).
- The footer uses an embedded logo image (no external files needed), so the exported HTML/PDF matches the provided reference footer art.
