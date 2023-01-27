interface Category {
  id: string;
  description: string;
  name: string;
  problem_type: TipoProblema;
}

interface CategoryPayload {
  name: string;
  description: string;
  problem_type_payload: { label: string; value: string };
}
