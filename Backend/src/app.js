/**
 * server ko create karna
 */

const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors()) // server accepts origin requests and browser doesn't create a problem over there.
app.use(express.json())

// public folder ke ander 3 files- css, js and html ko publically available bana deti hai. Inhe koi bhi access kar sakta hai.
app.use(express.static("./public")) // use this middleware backend ki url frontend dikhane lagti hai. Pura frontend backend par deploy ho chuka hai.

/**
 * - POST /api/notes
 * - create a new note and save data in mongodb
 * - req.body - {title, description}
 */
app.post("/api/notes", async (req, res) => {
    const {title, description} = req.body;

    const note = await noteModel.create ({
        title, description
    })
    
    res.status(201).json({
        message: "note created successfully.",
        note
    })

})

/**
 * - GET /api/notes
 * - Fetch all the notes data from mongodb and send them in the response
 */
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    
    res.status(200).json({
        message: "Notes fetched successfully.",
        notes
    })

})

/**
 * - DELETE /api/notes/:id
 * - Delete note with the id from req.params
 */
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id)
    
    res.status(200).json({
        message: "Note deleted successfully."
    })

})

/**
 * - PATCH /api/notes/:id
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, {description})
    
    res.status(200).json({
        message: "Note updated successfully."
    })

})

console.log(__dirname)

app.use('*name', (req, res) => {  // ye astrick ka matlab ye un apis ko handle karegi jo aapne create nhi kare hai.
   // res.send("This is wild card") // jo api aap create nhi karte ho lekin user unpar galti se request kar de toh karna ky hai.
   res.sendFile(path.join(__dirname, "..", "/public/index.html"))
    //  Like server wahan par response ky dega wo app is wild card ki help se dete ho.
})
module.exports = app 