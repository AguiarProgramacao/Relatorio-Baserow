import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadPanel() {
  const [leads, setLeads] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        "https://api.baserow.io/api/database/rows/table/427375/?user_field_names=true",
        {
          headers: {
            Authorization: "Token gXA1An5bvGbi6VdHZDAHfdn0XHQZhGFg",
          },
        }
      );
      setLeads(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar leads", error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (!filterDate) return true;
    return lead["Data do Resumo"]?.startsWith(filterDate);
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Painel de Leads</h1>
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ padding: "8px", flex: 1, border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          onClick={fetchLeads}
          style={{
            padding: "8px 12px",
            background: "#007bff",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Atualizar
        </button>
      </div>
      <div>
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "4px",
                background: "#f9f9f9",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  whiteSpace: "pre-line",
                  color: "black",
                  textAlign: "start"
                }}
              >
                {lead["RESUMO DO LEAD"]}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>{lead["Data do Resumo"]}</p>
            </div>
          ))
        ) : (
          <p>Nenhum lead encontrado.</p>
        )}
      </div>
    </div>
  );
}
