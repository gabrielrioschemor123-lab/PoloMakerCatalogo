import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily/safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 3D Printing AI Advisor Endpoint
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { userPrompt, category } = req.body;

      if (!userPrompt || typeof userPrompt !== "string") {
        return res.status(400).json({ error: "Por favor proporciona una descripción del proyecto." });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback intelligent response if GEMINI_API_KEY is not configured yet
        return res.json({
          material: "PETG / PLA Pro",
          technology: "FDM (Modelado por Depresión Fundida)",
          infillPercentage: 35,
          layerHeight: "0.20 mm",
          temperatureResistance: "Hasta 75°C",
          recommendation: "Para este tipo de pieza te sugerimos PETG o PLA Pro de alta tenacidad. Ofrece un excelente equilibrio entre resistencia mecánica, durabilidad UV e impacto.",
          postProcessing: "Lijado suave 400-800 grit y capa de primer si deseas acabado automotriz.",
          estimatedCostRange: "$12.000 - $22.000 ARS",
          estimatedTimeHours: "4.5 - 7.0 Horas",
          confidenceScore: 92
        });
      }

      const prompt = `Actúa como un Ingeniero Experto en Impresión 3D y Ciencia de Materiales para un taller de fabricación digital.
El cliente describe la siguiente necesidad para su proyecto:
"${userPrompt}"
Categoría contextual (si aplica): ${category || "General"}.

Proporciona un diagnóstico técnico riguroso y conciso en español estructurado en JSON con los siguientes campos estrictos:
- material: (string) Material recomendado (ej: "PLA Plus", "PETG Carbon Fiber", "Resina SLA 8K Tough", "TPU 95A Flexible", "ABS/ASA").
- technology: (string) Tecnología recomendada ("FDM" o "SLA/Resina LCD").
- infillPercentage: (number) Porcentaje de relleno óptimo recomendado (ej: 20, 40, 80, 100).
- layerHeight: (string) Resolución de capa ideal (ej: "0.12 mm (Alta Definición)", "0.20 mm (Estándar)").
- temperatureResistance: (string) Resistencia térmica aproximada (ej: "Hasta 80°C").
- recommendation: (string) Explicación técnica clara y profesional (máximo 3 oraciones) de por qué ese material y configuración es la mejor opción.
- postProcessing: (string) Recomendaciones de posprocesado o acabado superficial (ej: "Tratamiento de vapor con acetona", "Curado UV + Lijado", "Ninguno necesario").
- estimatedCostRange: (string) Rango de precio estimado referencial en ARS / USD (ej: "$15.000 - $25.000 ARS").
- estimatedTimeHours: (string) Tiempo de impresión aproximado (ej: "5 - 8 Horas").
- confidenceScore: (number) Puntuación de idoneidad entre 80 y 99.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              material: { type: Type.STRING },
              technology: { type: Type.STRING },
              infillPercentage: { type: Type.NUMBER },
              layerHeight: { type: Type.STRING },
              temperatureResistance: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              postProcessing: { type: Type.STRING },
              estimatedCostRange: { type: Type.STRING },
              estimatedTimeHours: { type: Type.STRING },
              confidenceScore: { type: Type.NUMBER },
            },
            required: [
              "material",
              "technology",
              "infillPercentage",
              "layerHeight",
              "temperatureResistance",
              "recommendation",
              "postProcessing",
              "estimatedCostRange",
              "estimatedTimeHours",
              "confidenceScore"
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No se obtuvo respuesta del modelo AI.");
      }

      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (error: any) {
      console.error("Error en endpoint /api/ai-advisor:", error);
      res.status(500).json({
        error: "Error procesando la consulta de IA.",
        details: error?.message || "Ocurrió un error inesperado."
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`>>> Servidor de PRINT3D Showcase ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
