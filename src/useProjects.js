import { useState, useEffect } from "react";
import axios from "axios";

const useProjects = (dataFilter) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let url =
          "https://api.baserow.io/api/database/rows/table/427375/?user_field_names=true";

        // Se o usuário selecionar uma data, adiciona o filtro na URL
        if (dataFilter) {
          url += `&filter__field_3399060__date_equals=${dataFilter}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: "Token gXA1An5bvGbi6VdHZDAHfdn0XHQZhGFg",
          },
        });

        const resumoLeads = response.data.results.map(
          (row) => row["RESUMO DO LEAD"]
        );
        setProjects(resumoLeads);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [dataFilter]);

  return { projects, loading, error };
};

export default useProjects;

