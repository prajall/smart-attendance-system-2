import { FaceEmbedding } from "@/models/faceEmbeddingModel";
import { Request, Response } from "express";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";

export const createFaceEmbedding = async (req: Request, res: Response) => {
  const { studentId, faceEmbedding } = req.body;
  try {
    const newFaceEmbedding = await FaceEmbedding.create({
      studentId,
      faceEmbedding,
    });
    if (!newFaceEmbedding) {
      return res.status(500).json("Error creating face embedding");
    }
    res.status(201).json(newFaceEmbedding);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const exportFaceEmbeddingsToCSV = async (
  req: Request,
  res: Response
) => {
  try {
    // Step 1: Fetch all the face embeddings from the database
    const faceEmbeddings = await FaceEmbedding.find().populate(
      "studentId",
      "faceEmbedding"
    );

    const csvFilePath = path.join(
      __dirname,
      "../../exports/face_embeddings.csv"
    );

    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: "studentId", title: "Student ID" },
        { id: "faceEmbedding", title: "Face Embedding" },
      ],
    });

    //Format the data for CSV
    const records = faceEmbeddings.map((embedding) => ({
      studentId: embedding.studentId,
      faceEmbedding: embedding.faceEmbedding.join(" "),
    }));

    //Write data to the CSV file
    await csvWriter.writeRecords(records);

    //Stream the file as a response
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=face_embeddings.csv"
    );

    const fileStream = fs.createReadStream(csvFilePath);
    fileStream.pipe(res);

    // Delete after streaming
    fileStream.on("end", () => {
      fs.unlinkSync(csvFilePath);
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
