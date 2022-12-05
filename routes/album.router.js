import express from "express";
import AlbumModel from "../models/album.model.js";

const albumRoute = express.Router();

albumRoute.get("/", async (req, res) => {
    try {
        const albums = await AlbumModel.find();
        return res.status(200).json(albums)
    } catch (e) {
        console.log(e.errors);
        return res.status(500).json({msg: 'Something went wrong'})
    }
})

albumRoute.post("/create", async (req, res) => {
    try {
        const newAlbum = await AlbumModel.create(req.body);
        return res.status(201).json(newAlbum);
    } catch (e) {
        console.log(e.errors);
        return res.status(500).json({msg: 'Something went wrong'})
    }
})

albumRoute.get("/:albumId", async (req, res) => {
    try {
        const {albumId} = req.params
        const album = await AlbumModel.findById(albumId)

        return res.status(200).json(album)

    } catch (e) {
        console.log(e.errors)
        return res.status(500).json({msg: 'Something went wrong'})
    }
})

albumRoute.put('/:albumId', async (req, res) => {
    try {
        const {albumId} = req.params;
        const updatedAlbum = await AlbumModel.findByIdAndUpdate(
            ...req.body,
            albumId,
            {new: true, runValidators: true}
        );
        return res.status(200).json(updatedAlbum);

    } catch (error) {
        console.log(error.errors);
        return res.status(500).json({msg: 'Something went wrong'})
    }
})

albumRoute.delete('/:albumId', async (req, res) => {
    try {
        const {albumId} = req.params;
        await AlbumModel.findByIdAndDelete(albumId);
        return res.status(204).json({msg: 'status 204'})

    } catch (e) {
        console.log(e);
        return res.status(500).json({msg: 'Something went wrong'})
    }
})


export default albumRoute;