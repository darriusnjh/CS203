"""
Tariff MCP Server
- Tools:
  1) find_hts8(query): Search vector DB to suggest HTS-8 codes from NL queries
  2) calculate_tariff(...): Validate required inputs and call your tariff API
"""
import os
import logging
from typing import Any, Dict, List, Optional
import requests
from fastmcp import FastMCP
from openai import OpenAI
from loadvectordb import vectordb
import dotenv

dotenv.load_dotenv()

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("tariff-mcp")
# --- Config (env vars) ---
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
# VECTOR_STORE_ID = os.environ.get("VECTOR_STORE_ID")          # your HTS vector store
TARIFF_API_URL = os.environ.get("TARIFF_API_URL")            # e.g. https://api.example.com/tariff/calc
# --- Clients ---
openai_client = OpenAI()  # picks up OPENAI_API_KEY
vectordb_client = vectordb()


SERVER_INSTRUCTIONS = """
You are an MCP server exposing two tools to help with customs tariff computations.
Workflow:
1) If the user has only a natural-language description of goods, call `find_hts8(query)`
   to propose likely HTS-8 codes with titles/snippets. Confirm the HTS-8 code with the user before calling the calculate_tariff tool.
2) When (and only when) you have: hts8, itemValue, itemQuantity, originCountry,
   countryOfArrival, and modeOfTransport, entryDate, and loadingDate, call `calculate_tariff(...)`.
Constraints:
- Countries must be ISO 3166-1 alpha-2 codes (e.g., US, CN, SG).
- modeOfTransport ∈ {air, sea, land}.
Return concise, helpful summaries after calculations, including duty/tax totals and any notes.
"""
def require_env(name: str) -> str:
    val = os.environ.get(name)
    if not val:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return val
def call_tariff_api(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Call your external tariff API with validated inputs."""
    url = require_env("TARIFF_API_URL")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    resp = requests.post(url, json=payload, headers=headers, timeout=60)
    resp.raise_for_status()
    return resp.json()
def create_server() -> FastMCP:
    mcp = FastMCP(name="Tariff MCP Server", instructions=SERVER_INSTRUCTIONS)
    @mcp.tool(
        name="find_hts8",
        description="Search HTS codes from natural language (e.g., 'men leather shoes'). Returns concatenated page content as a string along with the HTS-8 code and the description."
    )
    async def find_hts8(query: str) -> str:
        """
        Args:
          query: Natural language description of the product.
        Returns:
          A single string containing the concatenated page contents of the top matches along with the HTS-8 code and the description.
        """
        if not query or not query.strip():
            return ""
        content = vectordb_client.query_vectordb(query)
        return content
    @mcp.tool(
        name="calculate_tariff",
        description="Validate inputs and call the tariff calculation API."
    )
    async def calculate_tariff(
        hts8: str,
        itemValue: float,
        itemQuantity: int,
        originCountry: str,
        countryOfArrival: str,
        modeOfTransport: str,
        entryDate: str,
        loadingDate: str
    ) -> Dict[str, Any]:
        """
        Args:
          hts8: 8-digit HTS code (digits only).
          itemValue: Customs value in destination currency.
          itemQuantity: Integer quantity ≥ 1.
          originCountry: ISO 3166-1 alpha-2 (e.g., CN).
          countryOfArrival: ISO 3166-1 alpha-2 (e.g., US).
          modeOfTransport: one of [air, sea, land].
          entryDate: Date in YYYY-MM-DD format.
          loadingDate: Date in YYYY-MM-DD format.
        Returns:
          Tariff API JSON response (duty/tax breakdown) plus normalized inputs.
        """
        if itemQuantity < 1:
            raise ValueError("itemQuantity must be ≥ 1")
        if modeOfTransport not in {"air", "sea", "land"}:
            raise ValueError("modeOfTransport must be one of: air, sea, land")
        payload = {
            "hts8": hts8,
            "itemValue": float(itemValue),
            "itemQuantity": int(itemQuantity),
            "originCountry": originCountry,
            "countryOfArrival": countryOfArrival,
            "modeOfTransport": modeOfTransport,
            "entryDate": entryDate,
            "loadingDate": loadingDate
        }
        log.info(f"[calculate_tariff] Calling tariff API with: {payload}")
        result = call_tariff_api(payload)
        return {
            "inputs": payload,
            "result": result
        }
    return mcp
def main():
    # Validate critical env vars up front (clearer errors)
    require_env("OPENAI_API_KEY")
    require_env("TARIFF_API_URL")
    server = create_server()
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "5000"))
    logging.info(f"Starting MCP server on {host}:{port} (SSE transport)")
    server.run(transport="sse", host=host, port=port)
if __name__ == "__main__":
    main()