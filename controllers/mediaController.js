import { Media } from "../models/media.js";

export const uploadMedia = async (req, res) => {
  try {
    const { file } = req;
    console.log(file);
    const { filename, mimetype, size, path } = file;
    const media = await Media.create({
      fileName: filename,
      mediaUrl: path,
      mediaType: mimetype.split('/')[0],
      mediaSize: size,
      dimensions: ""
    });
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getMedia = async (req, res) => {
  try {
    const media = await Media.findAll();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
