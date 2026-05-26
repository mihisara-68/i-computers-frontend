import { createClient } from "@supabase/supabase-js";

let url = "https://bijsrdncjtqrtwswitas.supabase.co";
let key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpanNyZG5janRxcnR3c3dpdGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDkyNjQsImV4cCI6MjA5NDQyNTI2NH0.wOh2MOtKxAaRRCtU1ltDLjbZmmnDvAdwoWiQfHAM6no";
const supabase = createClient(url, key);

export default function uploadMedia(file) {
  return new Promise((resolve, reject) => {
    if (file === null) {
      reject("No file selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + "_" + file.name;

      supabase.storage
        .from("images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then((response) => {
          const publicUrl = supabase.storage
            .from("images")
            .getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
