import { Media } from "../models/media.js";

export const uploadMedia = async (req, res) => {
  try {
    const { file } = req;
    console.log(file);
    const { path, mimetype, size } = file;
    const dimensions = `${req.body.width}x${req.body.height}`;
    // const media = await Media.create({
    //   fileName: path,
    //   mediaUrl: path,
    //   mediaType: mimetype.split('/')[0],
    //   mediaSize: size,
    //   dimensions,
    // });
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}