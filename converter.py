#!/usr/bin/env python3
"""
Simple HTML worksheet converter.

Takes structured JSON input describing worksheet pages and renders
consistent, day-aware output that mirrors the provided reference layout
(blue outlines, right-aligned day label, clean typography, and
multi-section support).
"""
from __future__ import annotations

import argparse
import html
import json
from pathlib import Path
from typing import Any, Dict, Iterable, List

FOOTER_LOGO_DATA = (
    "data:image/svg+xml;base64,"
    "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhl"
    "aWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxNTAgMzIiIHJvbGU9ImltZyIgYXJpYS1sYWJlbD0i"
    "Si1VUyBJbnN0aXR1dGUiPjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMzIiIGZpbGw9Indo"
    "aXRlIi8+PHRleHQgeD0iNzUiIHk9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZh"
    "bWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMw"
    "MDAiPkrigKJVUyBJTlNUSVRVVEU8L3RleHQ+PHRleHQgeD0iNzUiIHk9IjI2IiB0ZXh0LWFu"
    "Y2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQt"
    "d2VpZ2h0PSI0MDAiIGZpbGw9IiMwMDAiPkpVQklMRUUgV0lUSCBVUzwvdGV4dD48L3N2Zz4="
)


def build_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert worksheet JSON into styled HTML.")
    parser.add_argument(
        "--input",
        "-i",
        type=Path,
        required=True,
        help="Path to the input JSON file that defines the worksheet pages.",
    )
    parser.add_argument(
        "--output",
        "-o",
        type=Path,
        required=True,
        help="Path to write the generated HTML file.",
    )
    return parser.parse_args()


def read_json(path: Path) -> Dict[str, Any]:
    with path.open("r", encoding="utf-8") as fp:
        return json.load(fp)


def escape(text: str | None) -> str:
    return html.escape(text or "")


def render_header(page: Dict[str, Any]) -> str:
    meta = []
    if page.get("category"):
        meta.append(f"<div class='meta'>{escape(page['category'])}</div>")
    if page.get("lexile") or page.get("word_count"):
        lexile = escape(page.get("lexile", ""))
        words = escape(page.get("word_count", ""))
        meta.append(f"<div class='meta'>Lexile: {lexile}<br>{words} words</div>")
    left = "".join(meta)
    day = escape(str(page.get("day", ""))).upper()
    day_label = f"<div class='day-label'>DAY {day}</div>" if day else ""
    return f"<header class='page-header'>{left}{day_label}</header>"


def render_paragraphs(paragraphs: Iterable[str]) -> str:
    parts = []
    for para in paragraphs:
        if not para:
            continue
        parts.append(f"<p>{escape(para)}</p>")
    return "\n".join(parts)


def render_word_box(box: Dict[str, Any]) -> str:
    words = box.get("words", [])
    title = escape(box.get("title", "WORD BOX"))
    word_items = " ".join(f"<span class='word'>{escape(word)}</span>" for word in words)
    return f"<div class='word-box'><div class='word-box-title'>{title}</div><div class='word-box-words'>{word_items}</div></div>"


def render_questions(questions: List[Dict[str, Any]]) -> str:
    rendered = []
    for idx, question in enumerate(questions, start=1):
        prompt = escape(question.get("prompt", ""))
        options = question.get("options", [])
        options_html = "".join(
            f"<div class='option'><span class='option-label'>{chr(64+i)}.</span> {escape(opt)}</div>" for i, opt in enumerate(options, start=1)
        )
        rendered.append(
            "<div class='question'>"
            f"<div class='question-text'><span class='question-number'>{idx}.</span> {prompt}</div>"
            f"<div class='options-grid'>{options_html}</div>"
            "</div>"
        )
    return "\n".join(rendered)


def render_page(page: Dict[str, Any]) -> str:
    title = escape(page.get("title", ""))
    subtitle = escape(page.get("subtitle", ""))
    instructions = escape(page.get("instructions", ""))
    passage = render_paragraphs(page.get("passage", [])) if page.get("passage") else ""
    questions_html = render_questions(page.get("questions", [])) if page.get("questions") else ""
    word_box_html = render_word_box(page["word_box"]) if page.get("word_box") else ""
    return f"""
    <section class="page">
      <div class="page-content">
        {render_header(page)}
        <div class="page-body">
          <div class="titles">
            {f"<div class='subtitle'>{subtitle}</div>" if subtitle else ""}
            {f"<h1>{title}</h1>" if title else ""}
          </div>
          {f"<div class='instructions'>{instructions}</div>" if instructions else ""}
          {word_box_html}
          {f"<div class='passage'>{passage}</div>" if passage else ""}
          {questions_html}
        </div>
        <footer class="page-footer">
          <img src="{FOOTER_LOGO_DATA}" alt="J-US Institute logo" class="footer-logo" />
        </footer>
      </div>
    </section>
    """


def render_document(pages: List[Dict[str, Any]]) -> str:
    body = "\n".join(render_page(page) for page in pages)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Worksheet</title>
  <style>
    @page {{
      size: A4;
      margin: 10mm;
    }}
    :root {{
      --border: #083175;
      --accent: #0066cc;
      --text: #333;
      --muted: #555;
      --background: #f5f5f5;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      padding: 16px;
      background: var(--background);
      font-family: "Helvetica Neue", Arial, sans-serif;
      color: var(--text);
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }}
    .page {{
      width: 210mm;
      height: 297mm;
      background: #fff;
      border: 1px solid #dcdcdc;
      border-radius: 6px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.06);
      padding: 12mm;
      position: relative;
      overflow: hidden;
      page-break-inside: avoid;
    }}
    .page-content {{
      width: 100%;
      height: 100%;
      transform-origin: top left;
    }}
    .page-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 13px;
      font-weight: 600;
      color: var(--muted);
    }}
    .meta {{
      margin-bottom: 6px;
      line-height: 1.4;
    }}
    .day-label {{
      font-weight: 800;
      font-size: 26px;
      letter-spacing: 0.5px;
    }}
    .page-body {{
      margin-top: 8px;
    }}
    .titles {{
      text-align: center;
      margin-bottom: 12px;
    }}
    h1 {{
      margin: 4px 0 8px 0;
      font-size: 20px;
    }}
    .subtitle {{
      font-size: 12px;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.3px;
    }}
    .instructions {{
      font-size: 13px;
      margin: 6px 0 12px 0;
      font-weight: 600;
    }}
    .passage {{
      border: 2px solid var(--accent);
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 16px;
      font-size: 14px;
      line-height: 1.55;
    }}
    .passage p {{
      margin: 0 0 10px 0;
    }}
    .question {{
      margin-bottom: 14px;
      font-size: 14px;
      line-height: 1.5;
    }}
    .question-number {{
      font-weight: 700;
      margin-right: 6px;
    }}
    .options-grid {{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 14px;
      margin-top: 6px;
    }}
    .option-label {{
      font-weight: 700;
      margin-right: 4px;
    }}
    .word-box {{
      border: 2px solid var(--accent);
      border-radius: 10px;
      padding: 12px;
      margin: 10px 0 16px 0;
      text-align: center;
    }}
    .word-box-title {{
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: 0.2px;
    }}
    .word-box-words {{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      font-size: 14px;
    }}
    .word-box .word {{
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }}
    .page-footer {{
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      color: var(--muted);
      letter-spacing: 0.4px;
      display: flex;
      justify-content: center;
      align-items: center;
    }}
    .footer-logo {{
      height: 24px;
      width: auto;
      object-fit: contain;
    }}
    @media print {{
      body {{
        background: #fff;
        padding: 0;
      }}
      .page {{
        box-shadow: none;
        border: none;
      }}
    }}
  </style>
</head>
<body>
  {body}
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      const pages = document.querySelectorAll('.page');
      pages.forEach(page => {{
        const content = page.querySelector('.page-content');
        if (!content) return;
        const availableHeight = page.clientHeight;
        const contentHeight = content.scrollHeight;
        if (contentHeight > availableHeight) {{
          const scale = availableHeight / contentHeight;
          content.style.transform = `scale(${{scale}})`;
          content.style.width = `${{100 / scale}}%`;
        }}
      }});
    }});
  </script>
</body>
</html>
"""


def main() -> None:
    args = build_args()
    data = read_json(args.input)
    pages = data.get("pages", [])
    if not isinstance(pages, list) or not pages:
        raise SystemExit("Input JSON must contain a non-empty 'pages' array.")
    html_content = render_document(pages)
    args.output.write_text(html_content, encoding="utf-8")
    print(f"Wrote {args.output} with {len(pages)} page(s).")


if __name__ == "__main__":
    main()
