from pydantic import BaseModel

class QueryRequest(BaseModel):
    selected_text: str
    query: str

class QueryResponse(BaseModel):
    answer: str
    source_context: str
    answer: str
    source_context: Optional[List[str]] = None