// Express Initialisation
const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())

//HEROKU
// const path = require('path')

// Sequelize Initialisation
const Sequelize = require('sequelize')
const {Op} = require('sequelize')

//HEROKU
// app.use(express.static(path.join(__dirname, 'build')))
// const port = process.env.PORT
const port = 8081

// const seq = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// });

const seq = new Sequelize('DB_EXAMEN', 'app', 'somepass', {
    dialect: 'mysql'
});

seq
    .authenticate()
    .then(() => {
        console.log('Connected')
    })
    .catch((e) => console.log(e))

seq.sync({alter: true}).then(() => {
    console.log("All models were syncronized successfully")
})

// Import created models
const FavouriteList = require("./models/favouriteList")(seq, Sequelize)
const Video = require("./models/video")(seq, Sequelize)

// Express middleware
app.use(
    express.urlencoded({
      extended: true,
    })
  )
app.use(express.json())
  
// Define the model relationship.
FavouriteList.hasMany(Video)

// Kickstart the Express aplication
app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port)
  })
  
// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err)
    res.status(500).json({ message: "500 - Server Error" })
  })
  
//GET pentru prima entitate.
//Filtrare, sortare, paginare
 app.get("/favouriteLists", async (req, res, next) => {
    try {
        Paginare
        let pageSize = 2
        if (req.query.pageSize) {
          pageSize = parseInt(req.query.pageSize)
        }
        if (!isNaN(parseInt(req.query.page))) {
          query.limit = pageSize
          query.offset = pageSize * parseInt(req.query.page)
        }

        //Sort,Filter
        const {sortBy, description, date} = req.query;
        let whereClause = {}
        if(description)
            whereClause.description = description;

        if(date)
            whereClause.date = date;

      const favouriteLists = await FavouriteList.findAll({
        order: sortBy ? [[sortBy,"ASC"]] : undefined,
        where: whereClause
    })
      res.status(200).json(favouriteLists)
    } catch (err) {
      next(err)
    }
  })
  
//POST pentru prima entitate
app.post("/favouriteLists", async (req, res, next) => {
    try {
        const favouriteList = req.body
        const createdFavouriteList = await FavouriteList.create(favouriteList)
        res.status(201).json(createdFavouriteList)
    } catch (err) {
        next(err)
    }
})

//PUT pentru prima entitate
app.put('/favouriteLists/:id', async (req, res, next) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.id);
        if(favouriteList){
            const updateFavouriteList = await favouriteList.update(req.body);
            res.status(200).json(updateFavouriteList);
        } else {
            return res.status(404).json({error: `Favourite list with id ${req.params.id} not found`});
        }
    } catch (err) {
        next(err)
    }
})

//DELETE pentru prima entitate
app.delete('/favouriteLists/:id', async (req, res, next) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.id);
        if(favouriteList){
            res.status(200).json(await favouriteList.destroy());
        } else {
            return res.status(404).json({error: `Favourite list with id ${req.params.id} not found`});
        }
    } catch (err) {
        next(err)
    }
})

//POST a doua entitate
 app.post("/favouriteLists/:favouriteListId/videos", async (req, res, next) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId);
      if (favouriteList) {
        const video = new Video(req.body);
        video.favouriteListId = favouriteList.id;
        await video.save();
        res.status(201).json(video);
      } else {
        res.status(404).json({ message: '404 - Favourite list Not Found'});
      }
    } catch (error) {
      next(error);
    }
  });
  
//GET a doua entitate
  app.get("/favouriteLists/:favouriteListId/videos", async (req, res, next) => {
    try {
        Video.findAll( {
            where: {favouriteListId: req.params.favouriteListId}
        }
      )
        .then(videos => res.status(200).json(videos))
        .catch(err => res.status(404).json(err))
    } catch(error) {
      next(error);
    }

  });
    
//PUT a doua entitate
  app.put("/favouriteLists/:favouriteListId/videos/:videoId", async (req, res, next) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId);
        if (favouriteList) {
        const videos = await Video.findAll({ 
            where: {
                [Op.and]: [
                    {
                        id: req.params.videoId 
                    },
                    {
                        favouriteListId: favouriteList.id
                    }
                ]}});
        const video = videos.shift();
        if (video) {
          video.description = req.body.description;
          video.title = req.body.title;
          video.url = req.body.url;
          await video.save();
          res.status(202).json(video);
        } else {
          res.status(404).json({ message: '404 - Video Not Found!'});
        }
      } else {
        res.status(404).json({ message: '404 - Favourite list Not Found!'});
      }
    } catch (error) {
      next(error);
    }
  });

//DELETE a doua entitate
  app.delete("/favouriteLists/:favouriteListId/videos/:videoId", async (req, res, next) => {
    try {
        const favouriteList = await FavouriteList.findByPk(req.params.favouriteListId);
        if (favouriteList) {
            const videos = await Video.findAll({ 
                where: {
                    [Op.and]: [
                        {
                            id: req.params.videoId 
                        },
                        {
                            favouriteListId: favouriteList.id
                        }
                    ]}});
                const video = videos.shift();
            if (video) {
                res.status(200).json(await video.destroy());
            } else {
            res.status(404).json({ message: '404 - Video Not Found!'});
            }
      } else {
        res.status(404).json({ message: '404 - Favourite list Not Found!'});
      }
    } catch (error) {
      next(error);
    }
  });
  
//Import
  app.post('/', async (req, res, next) => {
    try {
      const registry = {};
      for (let f of req.body) {
        let fFavourite = {
          description: f.description,
          date: f.date 
        }
        let favouriteList = await FavouriteList.create(fFavourite);
        favouriteList.videos = []
        for (let v of f.videos) {
          let vVideo = {
            description: v.description,
            title: v.title,
            url: v.url
          }  
          let video = await Video.create(vVideo);
          registry[v.key] = video;
          favouriteList.videos.push(video);
          video.favouriteListId = favouriteList.id;
          await video.save();
        }
        await favouriteList.save();
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

//Export
  app.get('/', async (req, res, next) => {
    try {
      const result = [];
      for (let f of await FavouriteList.findAll()) {
        const favouriteList = {
          description: f.description,
          date: f.date,
          videos: []
        };
        const videos = await Video.findAll({ 
            where: {favouriteListId: f.id}});
        for (let v of videos) {
          favouriteList.videos.push({
            description: v.description,
            title: v.title,
            url: v.url
          });
        }
        result.push(favouriteList);
      }
      if (result.length > 0) {
        res.json(result);
      } else {
        res.sendStatus(204).json({ message: 'Export completed!'});
      }
    } catch (error) {
      next(error);
    }
  });