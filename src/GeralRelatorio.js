import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GeralRelatorio() {
  const [leads, setLeads] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        "https://api.baserow.io/api/database/rows/table/473205/?user_field_names=true",
        {
          headers: {
            Authorization: "Token gXA1An5bvGbi6VdHZDAHfdn0XHQZhGFg",
          },
        }
      );
      setLeads(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar Relatório", error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (!filterDate) return true;
    return lead["Data do Relatório"]?.startsWith(filterDate);
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Painel de Relatório</h1>
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ padding: "8px", flex: 1, border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 25px",
            background: "#2B612D",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Resumo do Lead
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
                {lead["Relatório Geral"]}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>{lead["Data do Resumo"]}</p>
            </div>
          ))
        ) : (
          <p>Nenhum Relatório Encontrado.</p>
        )}
      </div>
    </div>
  );
}
