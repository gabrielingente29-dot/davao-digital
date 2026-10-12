#!/usr/bin/env python3
import json, os, sys, urllib.request, urllib.error

ACCOUNT_ID = os.environ.get("CF_ACCOUNT_ID")
TOKEN = os.environ.get("CF_API_TOKEN")
SCRIPT_NAME = os.environ.get("CF_SCRIPT_NAME", "davao-digital")

if not ACCOUNT_ID or not TOKEN:
    print("ERROR: set CF_ACCOUNT_ID and CF_API_TOKEN", file=sys.stderr)
    sys.exit(2)

URL = (
    "https://api.cloudflare.com/client/v4/accounts/"
    + ACCOUNT_ID
    + "/workers/scripts/"
    + SCRIPT_NAME
    + "/versions"
)

FILES = [
    ("worker/index.js", "application/javascript"),
    ("functions/api/enquiry.js", "application/javascript"),
    ("wrangler.jsonc", "application/javascript"),
]

for path, _ct in FILES:
    if not os.path.isfile(path):
        print("ERROR: missing file: " + path, file=sys.stderr)
        sys.exit(2)

BOUNDARY_OUTER = "----CloudflareOuterBoundary"
BOUNDARY_INNER = "----CloudflareInnerBoundary"

CRLF = chr(13) + chr(10)
EMPTY = ""

def file_part(path, ctype):
    return CRLF.join([
        "--" + BOUNDARY_INNER,
        'Content-Disposition: form-data; name="file"; filename="' + path + '"',
        "Content-Type: " + ctype,
        EMPTY,
        "__FILE_CONTENT_PLUH__",
        "--" + BOUNDARY_INNER,
        'Content-Disposition: form-data; name="metadata"',
        "Content-Type: application/json",
        EMPTY,
        json.dumps({"path": path}),
        "--" + BOUNDARY_INNER,
        EMPTY,
    ])

parts = [
    "--" + BOUNDARY_OUTER,
    'Content-Disposition: form-data; name="sources"; filename="source"',
    "Content-Type: multipart/form-data; boundary=" + BOUNDARY_INNER,
    EMPTY,
]

for path, ctype in FILES:
    parts.append(file_part(path, ctype))

parts.append("--" + BOUNDARY_INNER + "--")
parts.append("--" + BOUNDARY_OUTER + "--")
parts.append(EMPTY)

body_text = CRLF.join(parts)

pos = 0
for path, _ct in FILES:
    with open(path, "rb") as fh:
        raw = fh.read()
    needle = b"__FILE_CONTENT_PLUH__"
    idx = body_text.find(needle.encode("utf-8"), pos)
    if idx == -1:
        print("ERROR: body assembly failed", file=sys.stderr)
        sys.exit(2)
    body_bytes = (
        body_text[:body_text.find("__FILE_CONTENT_PLUH__")].encode("utf-8")[:idx].encode("utf-8")
        + raw
        + body_text[body_text.find("__FILE_CONTENT_PLUH__") + len("__FILE_CONTENT_PLUH__"):].encode("utf-8")
    )
    pos = idx + len("__FILE_CONTENT_PLUH__")

req = urllib.request.Request(URL, data=body_bytes, method="POST")
req.add_header("Authorization", "Bearer " + TOKEN)
req.add_header("Content-Type", "multipart/form-data; boundary=" + BOUNDARY_OUTER)

try:
    with urllib.request.urlopen(req, timeout=180) as resp:
        text = resp.read().decode("utf-8", "replace")
        print("HTTP " + str(resp.status))
        print(text)
        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            parsed = None
        if parsed and not parsed.get("success"):
            sys.exit(1)
except urllib.error.HTTPError as exc:
    print("HTTP " + str(exc.code))
    print(exc.read().decode("utf-8", "replace"))
    sys.exit(1)
except Exception as exc:
    print("ERROR: " + str(exc), file=sys.stderr)
    sys.exit(1)