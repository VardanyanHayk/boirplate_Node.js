import pify from 'pify'
import path from 'path'
import fs from 'file-system'
import multer from 'multer'

// storage options partners
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(`./public/images`, { recursive: true }, (err) => {
      if (err) {
        return err
      }
      cb(null, `./public/images`)
    })
  },
  filename: function (req, file, cd) {
    cd(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// chech file type
function checkFileType (file, cb) {
  const filetypes = /jpeg|jpg|svg|png|apk|video/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimtype = filetypes.test(file.mimetype)
  // console.log('file>>>>>>>>>>>>', file)
    if (extname || mimtype) {
      return cb(null, true)
    } else {
      const err = { code: 400, err: `Only ${filetypes}` }
      return cb(err, true)
    }
}
export const unlink = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.log(err)
  })
}
export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // console.log('file>>>>>>>>>>><<<<<<', file)
    checkFileType(file, cb)
  }
}).any()

export const uploadCompress = (req, res, next) => {
  upload(req, res, async err => {
    const files = []
    if (!err && req.files && req.files.length) {
      const newFiles = Promise.all( 
        req.files.map(async it => {
          if (it.fieldname === 'image') {
            const smallImg = `images/${it.fieldname}-${Date.now()}.jpeg`
            const dest1 = `./public/${smallImg}`;
            await sharp(it.path)
              .toFormat("jpeg")
              .resize(540)
              .toFile(dest1)
            const mediumImg = `images/${it.fieldname}-${Date.now()}.jpeg`
            const dest2 = `./public/${mediumImg}`;
            await sharp(it.path)
              .toFormat("jpeg")
              .resize(720)
              .toFile(dest2)
            files.push( {
              type: it.fieldname,
              path: it.path.split('public/')[1]
            },
            {
              type: 'smallImage',
              path: smallImg
            },
            {
              type: 'mediumImage',
              path: mediumImg
            },
            )
          }
          if (it.fieldname === 'cropImage') {
            files.push({
              type:it.fieldname,
              path: it.path.split('public/')[1]
            })
          }
          if (it.fieldname === 'video') {
            files.push({
              type:it.fieldname,
              path: it.path.split('public/')[1]
            })
          }
        })
      )
      await newFiles
      req.files = files
      next()
    }
    else next();
  });
}